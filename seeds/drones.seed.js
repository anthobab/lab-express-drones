// Iteration #1
require("./../db/index");
const { default: mongoose } = require("mongoose");
const Drone = require("./../models/Drone.model.js");

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

seed();

async function seed() {
  try {
    await cleanDatabase();
    const amountOfDrones = await createDrones();
    console.log(`Created ${amountOfDrones} drones`);
    // process.exit(); //to kill the execution of node js
    // await mongoose.connection.close();
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

async function cleanDatabase() {
  await Drone.deleteMany();
}

async function createDrones() {
  const allDrones = await Drone.create(drones);
  return allDrones.length;
}
