// DEPENDENCIES
const express = require("express");
const router = express.Router();

// bring in our controller
const animalController = require("../controllers/animals");

/**
 * Routes INDUCESS
 */
router.get("/", animalController.index);
router.get("/new", animalController.newForm);
router.delete("/:id", animalController.destroy);
router.put("/:id", animalController.update);
router.post("/", animalController.create);
router.get("/edit/:id", animalController.edit);
router.get("/seed", animalController.seed);
router.get("/:id", animalController.show);

// Export our router
module.exports = router;
