const MudFile = require("../models/mudFileModel") //required in order to access to the data
const db = require("./connect")
const shell = require('shelljs')
let createError = require('http-errors');
//let forge = require('node-forge');
//forge.options.usePureJavaScript = true;
const fs = require('fs');


exports.mudFileByName = function(req, res, next){
    let file_name = req.params.name;
    if(file_name.endsWith('.p7s')){
      MudFile.findOne({'file_name': file_name.substring(0, file_name.length-4)}, 'source_file')
      .then(function (result) {
        if (result === null) {return next(createError(404, 'Not found'));}

      
        var temp = "script/" + file_name.substring(0, file_name.length-4) + ".json" //we do this each time, because is possible that the mudfile is changed!
        var temp_out = "script/" + file_name.substring(0, file_name.length-4) + ".p7s"
        
        fs.writeFileSync(temp, result.source_file, (err) => {
          if (err) throw err;
          console.log('File is created successfully.');
        })
        // shell.exec('script/sign_json.sh' + " " + temp); //insert here your script!
        shell.exec('openssl cms -sign -signer certs/server.pem -inkey certs/server.key -in ' + temp +' -outform DER -out ' + temp_out) 
        var p7sFile = fs.readFileSync("script/" + file_name)
        // console.log(result)
        res.setHeader('Content-Type', 'application/pkcs7-signature')
        res.send(p7sFile)
      }).catch(function(err)
      {
        return next(err); 
      }) ;
    }else{
      //Display the json of the MudFile requested
      MudFile.findOne({'file_name': file_name.substring(0, file_name.length-5)}, 'source_file')
      .then(function (result) {
        if (result === null) {return next(createError(404, 'Not found'));}
        //Successful, so render
        res.setHeader('Content-Type', 'application/json')
        res.send(result.source_file.toString())
      })
      .catch(function(err)
      {
        return next(err)
      })
    }
};

exports.mudFileList = function(req, res, next){
    MudFile.find({}, 'user_name file_name source_file')
    .exec().then(function (list) {
      //Successful, so render
      res.render('mud_file_list', {title: 'Mud File List', mud_file_list: list})
    })
    .catch(function(err)
    {
      return next(err);
    })
}