const { writeReport } = require("./reportGenerator");
function generateSummaryReport(employees, outputPath) {
  const totalEmployees = employees.length;

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

  const averageSalary = totalSalary / totalEmployees;

  const departmentStats = {};

  employees.forEach((emp) => {
    if (!departmentStats[emp.department]) {
      departmentStats[emp.department] = { count: 0, totalSalary: 0 };
    }

    departmentStats[emp.department].count += 1;
    departmentStats[emp.department].totalSalary += emp.salary;
  });

  let report = "";
  report += "Summary Report \n\n";
  report += `Total Employees: ${totalEmployees}\n`;
  report += `Total Salary: ${totalSalary}\n`;
  report += `Average Salary: ${averageSalary.toFixed(2)}\n\n`;

  report += "Department\n";

  for (let dept in departmentStats) {
    const count = departmentStats[dept].count;
    const deptTotal = departmentStats[dept].totalSalary;
    const deptAvg = deptTotal / count;

    report += `\nDepartment: ${dept}\n`;
    report += `Employees: ${count}\n`;
    report += `Total Salary: ${deptTotal}\n`;
    report += `Average Salary: ${deptAvg.toFixed(2)}\n`;
  }

  writeReport(outputPath, report);
}

module.exports = { generateSummaryReport };
