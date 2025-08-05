const { execSync } = require('child_process');

module.exports = async () => {
    console.log("Tearing down test DB...");

    execSync("docker compose -f ./docker-compose.test.yml down -v", { stdio: "inherit" });
};