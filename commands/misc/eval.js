const { config } = require("process");

module.exports = {
	name: 'eval',
	description: 'eval code',
	async execute(message, args, client) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        const { runInNewContext } = require("vm");
        const Discord = require("discord.js");
        const chalk = require("chalk");
        const { inspect } = require("util");
        const fetch = require("node-fetch");
        if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;

        const options = {
            callback: false,
            stdout: true,
            stderr: true
        };
        
        if (!args[0]) return await message.channel.send(":x: You must provide code to execute!");
        
        const script = parseCodeblock(args.join(" "));
        
        if (!(
          await confirmation(
            message,
            new Discord.MessageEmbed()
              .setTitle(":warning: Are you sure you would like to execute the following code:")
              .setDescription("```js\n" + script + "```"),
            {
              deleteAfterReaction: true
            }
          )
        )) return;
        
        const context = {
          client,
          message,
          args,
          Discord,
          console,
          require,
          process,
          global
        };
        
        const scriptOptions = {
          filename: `${message.author.id}@${message.guild.id}`,
          timeout: 60000,
          displayErrors: true
        };
        
        let start = Date.now();
        let result = execute(`"use strict"; (async () => { ${script} })()`, context, scriptOptions);
        let end = Date.now();
        
        if (((await result) && !(await result).stdout) && ((await result) && !(await result).callbackOutput) && ((await result) && !(await result).stderr)) {
          if (!(
            await confirmation(
              message,
              ":warning: Nothing was returned. Would you like to run the code again with implicit return?",
              {
                deleteAfterReaction: true
              }
            )
          )) return;
          else {
            start = Date.now();
            result = execute(`"use strict"; (async () => ${script} )()`, context, scriptOptions);
            end = Date.now();
          }
        }
        
        result
          .then(async (res) => {
            if (
              (options.stdout && res && res.stdout) ||
            (options.stderr && res && res.stderr) ||
            (options.callback && res && res.callbackOutput)
            ) {
              console.log(chalk`{red {strikethrough -}[ {bold Eval Output} ]{strikethrough ---------}}`);
              if (options.callback && res.callbackOutput) console.log(res.callbackOutput);
        
              if (options.stdout && res.stdout) {
                console.log(chalk`{red {strikethrough -}[ {bold stdout} ]{strikethrough --------------}}`);
                console.log(res.stdout);
              }
              if (options.stderr && res.stderr) {
                console.log(chalk`{red {strikethrough -}[ {bold stderr} ]{strikethrough --------------}}`);
                console.error(res.stderr);
              }
              console.log(chalk`{red {strikethrough -}[ {bold End} ]{strikethrough -----------------}}`);
            }
        
            const embed = await generateEmbed(script, res, { start, end });
            const msg = await message.channel.send({ embed: embed });
        
            if (!(
              await confirmation(
                message,
                ":information_source: Would you like to post the output of this command on hastebin?",
                {
                  deleteAfterReaction: true
                }
              )
            )) return;
        
            const evalOutput = [];
        
            if (res.callbackOutput) {
              evalOutput.push(
                "-[ Eval Output ]---------",
                typeof res.callbackOutput === "string" ? res.callbackOutput : inspect(res.callbackOutput)
              );
            }
        
            if (res.stdout) {
              evalOutput.push(
                "-[ stdout ]--------------",
                typeof res.stdout === "string" ? res.stdout : inspect(res.stdout)
              );
            }
        
            if (res.stderr) {
              evalOutput.push(
                "-[ stderr ]--------------",
                typeof res.stderr === "string" ? res.stderr : inspect(res.stderr)
              );
            }
        
            const body = await fetch("https://hastebin.com/documents", {
              method: "post",
              body: evalOutput.join("\n")
            })
              .then(async (res) => await res.json());
        
            await msg.edit({ embed: embed.addField(":notepad_spiral: Hastebin", `https://hastebin.com/${body.key}`) });
          });
        
        
        async function execute (code, context, options) {
            return await new Promise((resolve) => {
                try {
                    captureOutput(() => runInNewContext(code, context, options))
                        .then(resolve)
                        .catch(resolve);
                } catch (err) {
                    resolve(err);
                }
            });
        }
        
        async function generateEmbed (code, outs, { start, end }) {
            const output = typeof outs && outs.callbackOutput && outs.callbackOutput.then === "function" ? await outs && outs.callbackOutput : outs && outs.callbackOutput;
            const stdout = outs && outs.stdout;
            const stderr = outs && outs.stderr;
        
            const embed = new Discord.MessageEmbed()
                .setFooter(`Execution time: ${end - start}ms`)
                .setTimestamp();
        
            if (output) {
                embed
                    .setTitle(":outbox_tray: Output:")
                    .setDescription("```js\n" + ((typeof output === "string" ? output : inspect(output)) || "undefined").substring(0, 2000) + "```");
            }
        
            if (stdout) embed.addField(":desktop: stdout", "```js\n" + ((typeof stdout === "string" ? stdout : inspect(stdout)) || "undefined").substring(0, 1000) + "```");
        
            if (stderr) embed.addField(":warning: stderr", "```js\n" + ((typeof stderr === "string" ? stderr : inspect(stderr)) || "undefined").substring(0, 1000) + "```");
        
            if (!embed.fields.length && !embed.description) embed.setTitle("Nothing was returned.");
        
            if ((stdout && !isError(outs && outs.callbackOutput)) || (stdout && !output) || (!stdout && !output && !stderr)) embed.setColor("GREEN");
            else if (!stdout && !output && stderr) embed.setColor("YELLOW");
            else embed.setColor(isError(output) ? "RED" : "GREEN");
        
            embed.addField(":inbox_tray: Input", "```js\n" + code.substring(0, 1000) + "```");
        
            return embed;
        }
        
        function isError (object) {
            const name = object && object.constructor && object.constructor.name;
            if (!name) return true;
            return /.*Error$/.test(name);
        }
        
        function parseCodeblock (script) {
            const cbr = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
            const result = cbr.exec(script);
            if (result) {
                return result[4];
            }
            return script;
        }
        
        /**
         *
         * @param {Message} message 
         * @param {string} confirmationMessage 
         * @param {ConfirmationOptions} [options] 
         * @param {string} [options.confirmMessage] 
         * @param {string | MessageEmbed} [options.denyMessage] 
         * @param {number} options.time Timeout
         * @param {boolean} [options.keepReactions] 
         * @param {boolean} [options.deleteAfterReaction] 
         * @example
        
         */
        async function confirmation (message, confirmationMessage = {}, options = {}) {
            const yesReaction = "✔️";
            const noReaction = "✖️";
        
            const filter = ({ emoji: { name } }, { id }) => (name === yesReaction || name === noReaction) && id === message.author.id;
        
            const msg = await message.channel.send(confirmationMessage);
        
            await msg.react(yesReaction);
            await msg.react(noReaction);
        
            const e = (await msg.awaitReactions(filter, { max: 1, time: options && options.time || 300000 })).first();
        
            if (options && options.deleteAfterReaction) msg.delete();
            else if (!options && options.keepReactions) msg.reactions.removeAll();
        
            if (e && e.emoji && e.emoji.name === yesReaction) {
                if (options && options.confirmMessage && !options.deleteAfterReaction) await msg.edit(options && options.confirmMessage instanceof Discord.MessageEmbed ? { embed: options && options.confirmMessage, content: null } : { embed: null, content: options && options.confirmMessage });
                return true;
            } else {
                if (options && options.denyMessage && !options.deleteAfterReaction) await msg.edit(options && options.denyMessage instanceof Discord.MessageEmbed ? { embed: options && options.denyMessage, content: null } : { embed: null, content: options && options.denyMessage });
                return false;
            }
        }
        
        /**
         * 
         * @param {Function} callback The callback function to execute
         * @returns {Promise<CapturedOutput>} stdout, stderr and callback outputs
         */
        async function captureOutput (callback) {
            return await new Promise((resolve, reject) => {
                const oldProcess = { ...process };
                let stdout = "";
                let stderr = "";
        
                process.stdout.write = (str) => {
                    stdout += str;
                    return true;
                };
        
                process.stderr.write = (str) => {
                    stderr += str;
                    return true;
                };
        
                try {
                    const c = callback();
        
                    delete process.stdout.write;
                    process.stdout.write = oldProcess.stdout.write;
        
                    delete process.stderr.write;
                    process.stderr.write = oldProcess.stderr.write;
        
                    return c
                        .catch((c) => reject({ stdout, stderr, callbackOutput: c })) 
                        .then((callbackOutput) => resolve({ stdout, stderr, callbackOutput }));
                } catch (error) {
                    delete process.stdout.write;
                    process.stdout.write = oldProcess.stdout.write;
        
                    delete process.stderr.write;
                    process.stderr.write = oldProcess.stderr.write;
                    return reject({ stdout, stderr, callbackOutput: error }); 
                }
            });
        }
        
	}};