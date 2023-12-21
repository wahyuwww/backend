const express = require('express')
const router = express.Router()
const { protect } = require("../middlewares/auth");
const employeeController = require('../controllers/employee_client.controller');

router.get("/", protect, employeeController.findAll);
router.post("/", protect, employeeController.create);
router.get('/:id', employeeController.findById);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);

module.exports = router