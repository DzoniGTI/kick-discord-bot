const axios = require("axios");

const KICK_USER = process.env.KICK_USER;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

let wasLive = false;

async function checkKick() {
  try {
    // koristi promenljivu KICK_USER, ne $DacaS1
    const res = await axios.get(`https://kick.com/api/v2/channels/${KICK_USER}`);
    const isLive = res.data.livestream !== null;

    if (isLive && !wasLive) {
      await axios.post(DISCORD_WEBHOOK, {
        content: `🔴 LIVE SAM!\nhttps://kick.com/${KICK_USER}`
      });
    }

    wasLive = isLive;
  } catch (e) {
    console.log("error", e.message);
  }
}

setInterval(checkKick, 60000);
