const axios = require("axios");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter GitHub username: ", async (username) => {
  try {
    // Fetch the repositories from GitHub
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repoNames = response.data.map((repo) => repo.name);

    // Save the repository names to a file
    fs.writeFileSync(`${username}.txt`, repoNames.join("\n"));
    console.log(`Repositories for user ${username} have been saved to ${username}.txt`);
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
  } finally {
    rl.close();
  }
});
