const {Client} = require('discord.js'),
config = require('./config.json');
const client = new Client();

start = async () => {
    // include handlers
   /** Commands */ require('./handlers/Commands')(client);
   /** Events */ require('./handlers/Events')(client);
  // Start your bot
  client.login(config.token);
};

(async() => {
    await start();
})();