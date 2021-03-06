const MudFile = require("../models/mudFileModel") //required in order to access to the data
const db = require("./connect")
const shell = require('shelljs')
//let forge = require('node-forge');
//forge.options.usePureJavaScript = true;
const fs = require('fs');


exports.mudFileByName = function(req, res, next){
    let file_name = req.params.name;
    if(file_name.endsWith('.p7s')){
      MudFile.findOne({'file_name': file_name.substring(0, file_name.length-4)}, 'source_file')
      .exec(function (err, result) {
        if (err) { return next(err); }
        if (result === null) {return next(err);}
      
        var temp = "script/" + file_name.substring(0, file_name.length-4) + ".json" //we do this each time, because is possible that the mudfile is changed!
       
        fs.writeFileSync(temp, result.source_file, (err) => {
          if (err) throw err;
          console.log('File is created successfully.');
        }); 
        shell.exec('script/sign_json.sh' + " " + temp); //insert here your script!
        var p7sFile = fs.readFileSync("script/" + file_name)
        console.log(result)
        res.setHeader('Content-Type', 'application/pkcs7-signature')
        res.send(p7sFile)
      });
    }else{
      //Display the json of the MudFile requested
      MudFile.findOne({'file_name': file_name.substring(0, file_name.length-5)}, 'source_file')
      .exec(function (err, result) {
        if (err) { return next(err); }
        if (result === null) {return next(err);}
        //Successful, so render
        console.log(result)
        res.setHeader('Content-Type', 'application/json')
        res.send(result.source_file.toString())
      });
    }
};

exports.mudFileList = function(req, res, next){
    MudFile.find({}, 'user_name file_name source_file')
    .exec(function (err, list) {
      if (err) { return next(err); }
      //Successful, so render
        console.log(list)
        res.render('mud_file_list', {title: 'Mud File List', mud_file_list: list})
    });
}