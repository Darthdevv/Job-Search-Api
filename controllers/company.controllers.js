import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import appError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";



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

export const updateCompanyData = catchAsync(async (req, res, next) => { });


export const deleteCompanyData = catchAsync(async (req, res, next) => { });


export const getCompanyData = catchAsync(async (req, res, next) => { });


export const searchCompanyByBame = catchAsync(async (req, res, next) => { });


export const GetApplicationsForSpecificJobs = catchAsync(async (req, res, next) => {});