export const systemRoles = {
  User: "user",
  Company_HR: "humanResources",
};

const { User, Company_HR } = systemRoles;

export const roles = {
  USER_ONLY: [User],
  HR_ONLY: [Company_HR],
  USER_HR: [User, Company_HR]
}