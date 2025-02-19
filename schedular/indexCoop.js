const cron = require("node-cron");
const axios = require("axios");

let cronRun = 0;

const runCronJobs = () => {
  cron.schedule("*/10 * * * *", async () => {
    cronRun++;
    const indexCoopDetail = await axios.get(
      "https://api.indexcoop.com/data/tokens/0xc884646e6c88d9b172a23051b38b0732cc3e35a6?metrics=supply&metrics=nav"
    );
    console.log("indexCoopDetail", indexCoopDetail.data, "cronRun", cronRun);
  });
};

module.exports = runCronJobs;
