const robotsModule = require('./robots');

async function getInputs(robots) {
  for (robot of robots) {
    await robot.input();
  }
}

async function initRobots(robots) {
  for (robot of robots) {
    await robot.init();
  }
}

async function init() {
  const robots = Object.values(robotsModule);

  // await getInputs(robots);
  await initRobots(robots);
}

init();
