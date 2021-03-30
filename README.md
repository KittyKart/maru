# Maru
Maru is an open source Discord bot with a full moderation system and image commands 
### Note this bot is a work in progress
# Running the bot
Create a file called ```config.json``` <br/>
Populate it like so <br/>
```
{
"TOKEN": "Discord bot token here"
"MONGOSTRING": "Mongo DB URI string here"
}
```
### Method 1 of running the bot (Docker, recommended way)
Install Docker and Docker-compose <br/>
Once done follow instructions for your OS below <br/>
Windows: ```docker-compose up```<br/>
Linux: ```sudo docker-compose up```<br/>
And your set!
### Method 2 of running the bot (Not recommended) 
Run ```npm i``` (Make sure nodejs is installed if it says command not found) <br/>
Then run ```node index.js```
And your set!


