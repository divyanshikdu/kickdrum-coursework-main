const fs= require("fs");
function readEmployeeData(filePath){
    const data=fs.readFileSync(filePath,"utf-8");
    const employees = JSON.parse(data);
    return employees;
}
module.exports={readEmployeeData};