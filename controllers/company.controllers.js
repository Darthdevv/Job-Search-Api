import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import appError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response {message, data}
 * @description add new company
 **/

export const addCompanyData = catchAsync(async (req, res, next) => {
    const {
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
    } = req.body;

    if(
      !companyName ||
      !description ||
      !industry ||
      !address ||
      !numberOfEmployees ||
      !companyEmail
    ){
      return next(new appError("Please fill in all fields.", 400));
    }

    const lowerCaseCompanyEmail = companyEmail.toLowerCase();

    const companyExists = await Company.findOne({ companyEmail: lowerCaseCompanyEmail });

    if (companyExists) {
      return next(new appError("Company's email already exists", 409));;
    }

    const company = await Company.create({
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
      companyHR: req.user.id,
    });

    if (!company) {
      return next(new appError("Failed to add Company's data", 422));
    }

    res
      .status(201)
      .json({ message: "Company's data has been added successfully.", data: company });
});

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response {message, data}
 * @description update specific company data by id
 **/

export const updateCompanyData = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const {
    companyName,
    description,
    industry,
    address,
    numberOfEmployees,
    companyEmail,
  } = req.body;

  if (
    !companyName ||
    !description ||
    !industry ||
    !address ||
    !numberOfEmployees ||
    !companyEmail
  ) {
    return next(new appError("Please fill in all fields.", 400));
  }

  const lowerCaseCompanyEmail = companyEmail.toLowerCase();

  const companyExists = await Company.findOne({
    companyEmail: lowerCaseCompanyEmail,
  });

  if (companyExists) {
    return next(new appError("Company's email already exists", 409));
  }

  const company = await Company.findById(id);

  if (!company) {
    return next(new appError("Company Not Found.", 404));
  }


  if (company.companyHR == req.user.id) {
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      {
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        companyHR: req.user.id,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Company's Data updated successfully.",
      data: updatedCompany,
    });
  } else {
    return next(new appError("Failed to update Company's Data.", 403));
  }
});

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void} returns nothing as the status code is 204 No Content
 * @description delete specific company data by id
 **/

export const deleteCompanyData = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const company = await Company.findById(id);

  if (!company) {
    return next(new appError("Company Not Found.", 404));
  }

  if (company.companyHR == req.user.id) {
    await Company.findByIdAndDelete(id);

    res.status(204).json({ message: "Company's Data deleted successfully." });
  } else {
    return next(new appError("Failed to delete Company's Data.", 403));
  }
});

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response { status, requestedAt, results, data}
 * @description retreive (read) company data from database
 **/

export const getCompanyData = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Company.find(), req.query)
    .sort()
    .paginate();
  const companies = await features.query;

  if (!companies) {
    return next(new appError("No Companies Found", 404));
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: companies.length,
    data: { companies },
  });
});

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response { status, requestedAt, results, data}
 * @description filters company data by Name from database
 **/

export const searchCompanyByName = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Company.find(), req.query)
    .filter();
  const companies = await features.query;

  if (!companies) {
    return next(new appError("No Companies Found", 404));
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: companies.length,
    data: { companies },
  });
});