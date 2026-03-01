const fs= require("fs");
const { findPackageJSON } = require("module");
const path= require("path");
function writeReport(filePath,content){
    const dir=path.dirname(filePath);
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir,{recursive:true});
    }
    fs.writeFileSync(filePath,content,"utf-8");

}
module.exports = { writeReport };
