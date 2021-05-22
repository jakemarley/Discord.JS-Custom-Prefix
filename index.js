c const Discord = require("discord.js"); // Defining the Discord.JS
  const client = new Discord.Client(); // Defining Client
  const { token } = require("./config.json"); // Defining the Token
  const { readdirSync } = require("fs"); //  Defining the Sync
  const { join } = require("path"); // Defining the Join
  const {prefix} = require ('./config.json');
  const fetch = require('node-fetch');
  // End of Const's 



const activities_list = [
  "Version 2.0.0",
  "Watching Servers",
  "PREFIX *",
  
];


setInterval(() => {
  const index = Math.floor(Math.random() * (activities_list.length - 0) + 0); // generates a random number between 1 and the length of the activities array list (in this case 5).
  client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
}, 10000); // Runs this every 10 seconds.

  client.commands = new Discord.Collection();

      const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => // Defining the Commands folder.
      file.endsWith(".js") // This means only .js files will work with this bot
  );

  for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`)); // The "Commands" name, can be changed to anything, all it means is the folder name with the .js files can be different.

    client.commands.set(command.name, command);
  }

  client.on("error", console.error);

  client.on("ready", () => {
   console.log("Bot is online")
   return
  });

    // Command Handeler
  client.on("message", async (message) => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return
    if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return
    try {
    client.commands.get(command).run(client, message, args);
    } catch (error) {
    console.error(error);
    }
  }
