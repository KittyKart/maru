const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
  let commands = Array.from(client.help.entries());
  let currentPage = 0;

  if (args[0]) {
    let command = client.commands.get(args[0].toLowerCase());
    if (!command) {
      let noCommand = new MessageEmbed()
        .setTitle(
          `Sorry, but I could not find the command ${args[0].toLowerCase()}!`
        )
        .setDescription(
          "For a full list of commands type `//help`"
        )
        .setTimestamp()
        .setFooter(`${message.guild.name}`, message.guild.iconURL());

      return message.channel.send(noCommand);
    }

    let helpMessageEmbed = new MessageEmbed()
      .setTitle(`Help for command: ${command.help.name}`)
      .setDescription(
        `${command.help.description} \n Usage: \`${command.help.name} ${command.help.useage}\``
      )
    
      .setTimestamp()
      .setFooter(`${message.guild.name}`, message.guild.iconURL());

    return message.channel.send(helpMessageEmbed);
  }

  let embedPages = [];

  let startPage = new MessageEmbed()

    .setTitle("Maru's Help!")
    .setDescription(
      `Hey and thank you for inviting Maru`
    )
    .setTimestamp()
  embedPages.push(startPage);

  for (var i = 0; commands.length >= i; i++) {
    if (!commands[i]) continue;
    let helpEmbed = new MessageEmbed()
      .setDescription(
        "React with the arrows below to step forward or backward. For help on a specific command type `//help command`"
      )
      .setTitle(`Help menu page ${i + 1}: ${commands[i][0]} `)
      .setTimestamp()
      .setFooter(`${message.guild.name}`, message.guild.iconURL());

    commands[i][1].forEach((command) => {
      let parsedCommand = JSON.parse(command);
      helpEmbed.addField(
        `\`//${parsedCommand.name}\``,
        `${
          parsedCommand.help.description
            ? parsedCommand.help.description
            : "No description for this command..."
        }`,
        true
      );
    });

    embedPages.push(helpEmbed);
  }

  message.channel.send(embedPages[0]).then((msg) => {
    msg.react("◀️");
    msg.react("▶️");
    msg.react("⏹️");

    const filter = (reaction, user) => {
      return (
        (reaction.emoji.name === "◀️" ||
          reaction.emoji.name === "▶️" ||
          reaction.emoji.name === "⏹️") &&
        !user.bot
      );
    };

    let collector = msg.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === "▶️") {
        if (currentPage == commands.length - 1) {
          currentPage = 0;
          reaction.users.remove(user);
          msg.edit(embedPages[currentPage]);
        } else {
          currentPage++;
          reaction.users.remove(user);
          msg.edit(embedPages[currentPage]);
        }
      }

      if (reaction.emoji.name === "◀️") {
        if (currentPage == 0) {
          currentPage = commands.length - 1;
          reaction.users.remove(user);
          msg.edit(embedPages[currentPage]);
        } else {
          currentPage--;
          reaction.users.remove(user);
          msg.edit(embedPages[currentPage]);
        }
      }

      if (reaction.emoji.name === "⏹️") {
        collector.stop("owo");
      }
    });

    collector.on("end", () => {
      msg.delete({ timeout: 0 });
    });
  });
};

exports.help = {
  name: "help",
  allias: [],
  description: "This command",
  useage: "",
};