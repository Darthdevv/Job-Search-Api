import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import Job from "../models/job.model.js";
import appError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response {message, data}
 * @description add new job
 **/

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


/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response {status, requestedAt, results, data}
 * @description retreive (read) all jobs from database
 **/

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

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response {status, requestedAt, results, data}
 * @description retreive (read) specific job by companyName
 **/

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

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response {message, data}
 * @description update specific job by id
 **/

export const updateJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const {
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
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

  const job = await Job.findById(id);

  if (job) {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Job updated successfully.",
      data: updatedJob,
    });
  } else {
    return next(new appError("Failed to update Job.", 403));
  }
});


/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void} returns nothing as the status code is 204 No Content
 * @description delete specific job by id
 **/

export const deleteJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return next(new appError("Job Not Found.", 404));
  }

  if (job) {
    await Job.findByIdAndDelete(id);

    res.status(204).json({ message: "Job deleted successfully." });
  } else {
    return next(new appError("Failed to delete Job.", 403));
  }
});