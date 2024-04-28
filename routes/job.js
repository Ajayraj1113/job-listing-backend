const express = require("express");
const router = express.Router();
const verifyToken = require("../midlleware/authMiddleware");
const jobController = require("../controllers/job");

router.post("/create", verifyToken, jobController.createJobPost);

router.get("/details/:id", jobController.getJobDetailsById);

router.put("/update/:jobId", verifyToken, jobController.updateJobDetailsById);

router.get("/all-jobs", jobController.getAllJobs);

module.exports = router;