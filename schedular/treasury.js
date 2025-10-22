const cron = require("node-cron");
const { fetchTreasuryToken } = require("../helpers/fetchTreasuryToken");
const { fetchTreasuryChart } = require("../helpers/fetchTreasuryChart");

const treasury = async () => {
  try {
    cron.schedule("*/5 * * * *", async () => {
      console.log("Fetching Treasury Token...");
      await fetchTreasuryToken();
      await fetchTreasuryChart();
    });

    console.log("Treasury cron job started successfully!");
  } catch (err) {
    console.error("error:", err);
  }
};

module.exports = treasury;
