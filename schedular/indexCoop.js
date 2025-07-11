const cron = require("node-cron");
const storeIndexCoopData = require("../helpers/storeIndexCoopData");

const indexCoopStart = async () => {
  try {
    cron.schedule("0 * * * *", async () => {
      console.log("Running Index Coop job...");
      await storeIndexCoopData();
    });

    console.log("Index Coop CRON job started successfully!");
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = indexCoopStart;
