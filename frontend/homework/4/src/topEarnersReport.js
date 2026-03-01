const { writeReport } = require("./reportGenerator");

function generateTopEarnersReport(employees, count, outputPath) {
  const sortedEmployees = [...employees].sort(
    (a, b) => b.salary - a.salary
  );

  const topEmployees = sortedEmployees.slice(0, count);

  let report = "";
  report += `Top ${count} Earners Report \n\n`;

  topEmployees.forEach((emp, index) => {
    report += `${index + 1}. ${emp.name} | ${emp.department} | Salary: ${emp.salary}\n`;
  });

  writeReport(outputPath, report);
}

module.exports = { generateTopEarnersReport };
