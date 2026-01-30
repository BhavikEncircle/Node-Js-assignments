const cron = require("node-cron");
const Post = require("./models/post");

cron.schedule("* * * * *", async () => {
  const count = await Post.countDocuments();
  console.log("CRON JOB RUNNING");
  console.log("Total posts:", count);
});
