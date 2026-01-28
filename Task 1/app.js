const { log } = require("console");
const fs = require("fs");
fs.readFile("data.json", "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file : ", err);
    return;
  }
  const users = JSON.parse(data);
  const totalUsers = users.length;
  const names = users.map((user) => user.name);

  const summary = {
    totalUsers,
    names,
  };
  fs.writeFile("summary.json", JSON.stringify(summary, null, 2), (err) => {
    if (err) {
      console.log("Error writing file : ", err);
      return;
    }
    console.log("Summary saved to summary.json.");
  });
  console.log("Total no. of users are :", totalUsers);
  console.log("Names : ", names.join(", "));
});
