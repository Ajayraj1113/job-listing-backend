const Job = require("../models/job");

const createJobPost = async (req, res, next) => {
  try {
    const {
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
      skills,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !skills
    ) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    const jobDetails = new Job({
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
      skills,
    });

    await jobDetails.save();
    res.status(200).json({
      message: "Job created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getJobDetailsById = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Bad request!",
      });
    }

    const jobDetails = await Job.findById(jobId, { title: 1 });
    res.status(200).json({ data: jobDetails });
  } catch (error) {
    next(error);
  }
};

const updateJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
        res.status(400).json({
            message: "Bad request!",
        });
        }

        const {
        companyName,
        title,
        description,
        logoUrl,
        salary,
        location,
        duration,
        locationType,
        skills,
        } = req.body;

        if (
        !companyName ||
        !logoUrl ||
        !title ||
        !description ||
        !salary ||
        !location ||
        !duration ||
        !locationType ||
        !skills
        ) {
        return res.status(400).json({
            errorMessage: "Bad request",
        });
        }

        await Job.updateOne(
            { _id: jobId },
            {
                $set: {
                companyName,
                logoUrl,
                title,
                description,
                salary,
                location,
                duration,
                locationType,
                },
            }
        );

        res.status(200).json({ message: "Job details updated succesfully" });
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req, res, next) => {
    try {
        const title = req.query.title || "";
        const skills = req.query.skills;

        let formattedSkills;
        if (skills) {
            formattedSkills = skills.split(",");
        }

        const jobList = await Job.find(
            { 
                title: { $regex: title, $options: "i" },
                // skills: { $in : formattedSkills },
            }, 
            {
                title: 1,
                salary: 1,
                logoUrl: 1,
                location: 1,
                skills: 1,
                companyName: 1,
            });

        res.status(200).json({ data: jobList });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createJobPost, 
    getJobDetailsById, 
    updateJobDetailsById, 
    getAllJobs, 
};
