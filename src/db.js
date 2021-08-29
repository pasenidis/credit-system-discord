const { Deta } = require("deta");
require("dotenv").config();

const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("citizens");

async function registerCitizen(key) {
  await db.put({
    key,
    credits: 0,
  });
}

async function appendPoints(id, points) {
  const citizen = await db.get(id);
  if (citizen) {
    await db.update(
      {
        credits: citizen.credits + points,
      },
      id
    );
  } else {
    await registerCitizen(id);
  }
}

async function getPoints(id) {
  const citizen = await db.get(id);
  if (citizen) {
    return citizen.credits;
  } else {
    return 0;
  }
}

module.exports = { appendPoints, getPoints };
