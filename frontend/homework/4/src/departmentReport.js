const { writeReport } = require("./reportGenerator");

function generateDepartmentReport(employees, department, outputPath) {
  const deptEmployees = employees.filter(
    (emp) => emp.department === department
  );

  const count = deptEmployees.length;

  if (count === 0) {
    writeReport(outputPath, `No employees found in ${department} department.`);
    return;
  }

  const totalSalary = deptEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageSalary = totalSalary / count;

  let report = "";
  report += `Department Report: ${department} \n\n`;
  report += `Number of Employees: ${count}\n`;
  report += `Total Salary: ${totalSalary}\n`;
  report += `Average Salary: ${averageSalary.toFixed(2)}\n\n`;

  report += "Employees List:\n";

  deptEmployees.forEach((emp) => {
    report += `- ${emp.name} : ${emp.salary}\n`;
  });

  writeReport(outputPath, report);
}

module.exports = { generateDepartmentReport };
