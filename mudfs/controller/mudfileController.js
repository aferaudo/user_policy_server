let MudFile = require("../models/mudFileModel") //required in order to access to the data
let db = require("./connect")


//Display the json of the MudFile requested
exports.mudFileByName = function(req, res, next){
    MudFile.findOne({'file_name': req.params.name}, 'source')
    .exec(function (err, result) {
      if (err) { return next(err); }
      if (result === null) {return next(err);}
        //Successful, so render
        console.log(result)
        res.render('mud_file', {mud_file: result})
    });
};

exports.mudFileList = function(req, res, next){
    MudFile.find({}, 'file_name source')
    .exec(function (err, list) {
      if (err) { return next(err); }
      //Successful, so render
        console.log(list)
        res.render('mud_file_list', {title: 'Mud File List', mud_file_list: list})
    });
}