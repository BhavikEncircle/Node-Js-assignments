const cron = require("node-cron");
const { posts } = require("./data/posts");

cron.schedule("* * * * *", () => {
  console.log("CRON JOB RUNNING");
  console.log("Total posts:", posts.length);
});
