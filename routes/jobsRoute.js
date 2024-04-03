import express  from "express";
import userAuth from "../middelwares/authMiddleware.js";
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from "../controllers/jobsController.js";

const router = express.Router()

//routes
//create job || post
router.post("/create-job", userAuth, createJobController);

//get jobs ||GET
router.get('/get-job' , userAuth , getAllJobsController);

//update jobs || PATCH
router.patch("/update-job/:id" , userAuth , updateJobController);

//delect jobs || DELETE
router.delete("/delete-job/:id" , userAuth , deleteJobController);

//jobs STATS FILTER|| GET
router.get("/job-stats" , userAuth , jobStatsController);

export default router