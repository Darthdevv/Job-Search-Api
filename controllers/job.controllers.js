import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import Job from "../models/job.model.js";
import appError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";



export const addJob = catchAsync(async (req, res, next) => {
  const {
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills
  } = req.body;

  if (
    !jobTitle ||
    !jobLocation ||
    !workingTime ||
    !seniorityLevel ||
    !jobDescription ||
    !technicalSkills ||
    !softSkills
  ) {
    return next(new appError("Please fill in all fields.", 400));
  }

  const company = await Company.findOne({ companyHR: req.user.id });

  const job = await Job.create({
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
    addedBy: req.user.id,
    companyId: company.id
  });

  if (!job) {
      return next(new appError("Failed to add Job", 422));
  }

  res
    .status(201)
    .json({
      message: "Job has been added successfully.",
      data: job,
    });
});


export const getAllJobs = catchAsync(async (req, res, next) => {

  const features = new APIFeatures(Job.find().populate('addedBy').populate('companyId'), req.query)
    .filter()
    .sort()
    .paginate();
  const jobs = await features.query;

  if (!jobs) {
    return next(new appError("No Jobs were Found", 404));
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: jobs.length,
    data: { jobs },
  });
});


export const getJobsForSpecificCompany = catchAsync(async (req, res, next) => {
  const { companyName } = req.query;
  const company = await Company.findOne({ companyName });

  if (company) {
    const jobs = await Job.find({ addedBy: company.companyHR });

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: jobs.length,
      data: { jobs },
    });

  } else {
    return next(new appError("Company Not Found", 404));
  }
})