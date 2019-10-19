let fs = require('fs')
let MudFile = require("../models/mudFileModel")


exports.mudFileInsert = function(req,res){
    var path = req.file.path
    var fileName = req.file.originalname
    var re = new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$") 
    /* The file inserted must be a json file and must have a particulare name format:
    MACADDRESS.json */
    if(fileName.endsWith('.json') && re.test(fileName.substring(0, fileName.length-5))){
        
        let json_data = fs.readFileSync(path)
        mudFileDetail = {file_name: fileName.substring(0, fileName.length-5), source_file: json_data}
        let toInsert = new MudFile(mudFileDetail)
        // Before to save the file we have to verify if 
        // already exists a file with that name in the db
        // if exists we do not insert it
        MudFile.findOne({'file_name': fileName.substring(0, fileName.length-5)}, 'source_file')
        .exec(function (err, result) {
            if (err) { return next(err); }
            if (result === null) {
                toInsert.save(function(err, toInsert){
                    if(err) throw err;
                    console.log('saved file to mongo')
                    res.send("File successfully updated!")
                });
            }else
                res.render('myerror',{message: 'File already in the db'})
        });

    }
    else{
        res.render('myerror',{message: 'Incorrect file name format!'})
    }
}

