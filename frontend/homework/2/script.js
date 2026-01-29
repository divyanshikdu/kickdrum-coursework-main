//employee 1
let employee1={
    id: 1,
       name: "Alia",
    age: 30,
    salary: 85000,
    department: "Engineering",
    skills: ["javascript","react"],
    experience: 5
};



//employee2
let employee2 = {
  id: 2,
  name: "Bob",
  age: 28,
  salary: 65000,
  department: "Marketing",
  skills: ["SEO", "Content Writing"],
  experience: 3
};

//employee3
let employee3 = {
  id: 3,
  name: "Charles",
  age: 35,
  salary: 95000,
  department: "Engineering",
  skills: ["Python", "Django"],
  experience: 8
};
// Employee 4
let employee4 = {
  id: 4,
  name: "Dia",
  age: 26,
  salary: 55000,
  department: "HR",
  skills: ["Recruitment", "Communication"],
  experience: 2
};

// Employee 5
let employee5 = {
  id: 5,
  name: "Eth",
  age: 32,
  salary: 75000,
  department: "Sales",
  skills: ["Negotiation", "CRM"],
  experience: 6
};

console.log("All 5 Employees Created Successfully:");

console.log(employee1);
console.log(employee2);
console.log(employee3);
console.log(employee4);
console.log(employee5);

console.log("Step 1.2: Accessing Employee Information");

// Function to get employee info
function getEmployeeInfo(emp) {
  return `${emp.name} works in ${emp.department} and earns ${emp.salary}`;
}

// Test the function
console.log("Employee Info Output:");
console.log(getEmployeeInfo(employee1));
console.log(getEmployeeInfo(employee2));
console.log(getEmployeeInfo(employee3));
console.log(getEmployeeInfo(employee4));


console.log("Step 1.3: Adding Skill to Employee");

//  add a new skill
function addSkill(emp, newSkill) {
  emp.skills.push(newSkill);
}

// Add skill to employee1
addSkill(employee1, "Node.js");

// Print updated skills
console.log("Updated Skills of Employee1:");
console.log(employee1.skills);



// Function to add method to any employee
function addFullInfoMethod(emp) {
  emp.getFullInfo = function () {
    return `${this.name} works in ${this.department} and earns ${this.salary}`;
  };
}

// Add method to all employees
addFullInfoMethod(employee1);
addFullInfoMethod(employee2);
addFullInfoMethod(employee3);
addFullInfoMethod(employee4);
addFullInfoMethod(employee5);

// Testing method for all employees
console.log("Full Info of All Employees:");

console.log(employee1.getFullInfo());
console.log(employee2.getFullInfo());
console.log(employee3.getFullInfo());
console.log(employee4.getFullInfo());
console.log(employee5.getFullInfo());

console.log("--> Comparing Employees Based on Skills");

//  compare employees skills count
function compareEmployees(emp1, emp2) {
  if (emp1.skills.length > emp2.skills.length) {
    return `${emp1.name} has more skills than ${emp2.name}`;
  } 
  else if (emp2.skills.length > emp1.skills.length) {
    return `${emp2.name} has more skills than ${emp1.name}`;
  } 
  else {
    return `${emp1.name} and ${emp2.name} have equal skills`;
  }
}

// Testing comparisons
console.log(compareEmployees(employee1, employee3));
console.log(compareEmployees(employee2, employee4));
console.log(compareEmployees(employee2, employee1));

// Array of all employees
let employees = [employee1, employee2, employee3, employee4, employee5];

// Print array
console.log("All Employees Stored in Array:");
console.log(employees);



// Filter employees with experience >= 5 years
let experiencedEmployees = employees.filter(function (emp) {
  return emp.experience >= 4;
});

// Print filtered result
console.log("Employees with 4+ Years Experience:");
console.log(experiencedEmployees);



// Map employees into summary strings
let employeeSummaries = employees.map(function (emp) {
  return `${emp.name} (${emp.department}) - $${emp.salary}`;
});

// Print summaries
console.log("Employee Summaries:");
console.log(employeeSummaries);



// Reduce to calculate total salary
let totalSalary = employees.reduce(function (sum, emp) {
  return sum + emp.salary;
}, 0);

// Average salary
let averageSalary = totalSalary / employees.length;

console.log("Total Salary of All Employees:", totalSalary);
console.log("Average Salary:", averageSalary);



// Reduce to find employee with max salary
let highestPaidEmployee = employees.reduce(function (maxEmp, emp) {
  if (emp.salary > maxEmp.salary) {
    return emp;
  } else {
    return maxEmp;
  }
});

console.log("Highest Paid Employee:");
console.log(highestPaidEmployee);



// Sort employees by experience (High → Low)
let sortedByExperience = employees.slice().sort(function (a, b) {
  return b.experience - a.experience;
});

console.log("Employees Sorted by Experience:");
console.log(sortedByExperience);


console.log(" Object Destructuring");

// Destructuring employee1 object
let { name, department, salary } = employee1;

// Print extracted values
console.log("Destructured Values:");
console.log("Name:", name);
console.log("Department:", department);
console.log("Salary:", salary);




// Sort employees by salary
let sortedBySalary = employees.slice().sort(function (a, b) {
  return a.salary - b.salary;
});

let lowestPaid = sortedBySalary[0];
let highestPaid = sortedBySalary[sortedBySalary.length - 1];

console.log("Lowest Paid Employee:", lowestPaid.name, lowestPaid.salary);
console.log("Highest Paid Employee:", highestPaid.name, highestPaid.salary);


let mergedSkills = [...employee1.skills, ...employee3.skills];

console.log("Merged Skills:");
console.log(mergedSkills);



// removing duplicate using set
let uniqueSkills = [...new Set(mergedSkills)];

console.log("Unique Skills:");
console.log(uniqueSkills);

function calculateTotalSalary(...emps) {
  let total = emps.reduce(function (sum, emp) {
    return sum + emp.salary;
  }, 0);

  return total;
}

// Testing with different employees
console.log("Total Salary of Employee1 + Employee2:");
console.log(calculateTotalSalary(employee1, employee2));

console.log("Total Salary of Employee3 + Employee4 + Employee5:");
console.log(calculateTotalSalary(employee3, employee4, employee5));



// Function to generate skill frequency report
function getSkillFrequency(empList) {
  let skillCount = {};

  empList.forEach(function (emp) {
    emp.skills.forEach(function (skill) {
      if (skillCount[skill]) {
        skillCount[skill] += 1;
      } else {
        skillCount[skill] = 1;
      }
    });
  });

  return skillCount;
}

// Testing skill frequency
let skillReport = getSkillFrequency(employees);

console.log("Skill Frequency Report:");
console.log(skillReport);
