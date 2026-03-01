const { readEmployeeData } = require("./src/fileReader");

const { generateSummaryReport } = require("./src/summaryReport");
const { generateDepartmentReport } = require("./src/departmentReport");
const { generateTopEarnersReport } = require("./src/topEarnersReport");

const employees = readEmployeeData("./data/employees.json");

const args = process.argv.slice(2);

if (args.length === 0) {
  generateSummaryReport(employees, "./reports/summary.txt");
  generateDepartmentReport(employees, "Engineering", "./reports/department.txt");
  generateTopEarnersReport(employees, 3, "./reports/topEarners.txt");

  console.log("All reports generated.");
  process.exit(0);
}

if (args[0] === "summary") {
  generateSummaryReport(employees, "./reports/summary.txt");
  console.log("Summary report generated.");
  process.exit(0);
}

if (args[0] === "department") {
  const dept = args[1];

  if (!dept) {
    console.log("Please provide a department name.");
    process.exit(0);
  }

  generateDepartmentReport(employees, dept, "./reports/department.txt");
  console.log(`Department report generated for ${dept}.`);
  process.exit(0);
}

if (args[0] === "top") {
  const count = parseInt(args[1], 10);

  if (!count) {
    console.log("Please provide how many top earners you want.");
    process.exit(0);
  }

  generateTopEarnersReport(employees, count, "./reports/topEarners.txt");
  console.log(`Top ${count} earners report generated.`);
  process.exit(0);
}

console.log("Invalid command.");