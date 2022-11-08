const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("./../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  try {
    const allDrones = await Drone.find();
    res.render("drones/list.hbs", { allDrones });
  } catch (error) {
    console.error(error);
  }
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  try {
    await Drone.create(req.body);
    res.redirect("/drones");
  } catch (error) {
    res.render("drones/create-form.hbs");
    console.error(error);
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    // res.send(await Drone.findById(req.params.id));
    res.render("drones/update-form.hbs", {
      drone: await Drone.findById(req.params.id),
    });
  } catch (error) {
    console.error(error);
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const updateDrone = await Drone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(updateDrone);
    res.redirect("/drones");
  } catch (error) {
    res.render("drones/update-form.hbs", {
      drone: await Drone.findById(req.params.id),
    });
    console.error(error);
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect("/drones");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
