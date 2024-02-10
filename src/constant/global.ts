const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthsOptions = months.map((month) => ({
  value: month,
  label: month,
}));

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const bloodGroupsOptions = bloodGroups?.map((element) => ({
  label: element,
  value: element,
}));

const genders = ["Male", "Female", "Other"];
export const gendersOptions = genders?.map((element) => ({
  label: element,
  value: element,
}));

export const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
export const dayOptions = days?.map((day) => ({
  label: day,
  value: day,
}));
