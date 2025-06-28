require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const quotes = require('./data/quotes');
const lore = require('./data/lore');
const songs = require('./data/songs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`🟢 Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const [cmd, ...args] = message.content.slice(1).split(' ');

  switch (cmd.toLowerCase()) {
    case 'cvpquote':
      message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]);
      break;

    case 'cvpfight':
      const fighters = ['Cooler', 'Porridge', 'Mr11', 'Bail'];
      const f1 = fighters[Math.floor(Math.random() * fighters.length)];
      let f2 = fighters[Math.floor(Math.random() * fighters.length)];
      while (f2 === f1) f2 = fighters[Math.floor(Math.random() * fighters.length)];

      const winner = Math.random() < 0.5 ? f1 : f2;
      message.channel.send(`⚔️ ${f1} vs. ${f2}...\n💥 Winner: **${winner}**`);
      break;

    case 'transform':
      const name = args[0]?.toLowerCase();
      if (name === 'cooler') {
        message.channel.send('Porridge takes over Cooler... oh fuck...');
      } else if (name === 'porridge') {
        message.channel.send('Porridge vanishes. Cooler regains control.');
      } else if (name === 'mr11') {
        message.channel.send('Mr Cockington takes over Mr11... lwk scary.');
		else if (name === 'mrcockington') {
		message.channel.send('Mr11 is free from the takeover.');
	  } else if (name === 'bail') {
		message.channel.send('Jail, Veil or Rail take over, idfk bru');
	  }	else if (name === 'jail') {
        message.channel.send('bail is free from the takeover!!!');
	  }	else if (name === 'rail') {
        message.channel.send('bail is free from the takeover!!!');		
      }	else if (name === 'veil') {
        message.channel.send('bail is free from the takeover!!!');
      }
	  break;

    case 'cvplot':
      message.channel.send(lore[Math.floor(Math.random() * lore.length)]);
      break;

    case 'cvpsong':
      message.channel.send(songs[Math.floor(Math.random() * songs.length)]);
      break;

    default:
      message.channel.send('❓ Unknown CvP command.');
  }
});

client.login(process.env.TOKEN);
