let fs = require('fs')
let MudFile = require("../models/mudFileModel")

/* Initialization */
exports.initial = function(req, res, next){
    MudFile.find({user_name: req.session.username}, 'file_name source_file')
    .then(function (list) {
        res.render('user_page', {title: req.session.username, mud_file_list: list})
    })
    .catch(function(err)
    {
        return next(err)
    })
}

/* Insertion of a mud file */
exports.mudFileInsert = function(req,res){
    var path = req.file.path
    var fileName = req.file.originalname
    var re = new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$") 
    /* The file inserted must be a json file and must have a particulare name format:
    MACADDRESS.json */
    if(fileName.endsWith('.json') && re.test(fileName.substring(0, fileName.length-5))){
        
        let json_data = fs.readFileSync(path)
        mudFileDetail = {user_name: req.session.username, file_name: fileName.substring(0, fileName.length-5), source_file: json_data}
        let toInsert = new MudFile(mudFileDetail)
        // Before to save the file we have to verify if 
        // already exists a file with that name in the db
        // if exists we do not insert it
        MudFile.findOne({'file_name': fileName.substring(0, fileName.length-5)}, 'source_file')
        .then(function (result) {
            if (result === null) {
                toInsert.save(function(err, toInsert){
                    if(err) throw err;
                    console.log('saved file to mongo')
                    res.redirect('back')
                });
            }else
                res.render('myerror',{message: 'File already in the db'})
        })
        .catch(function(err)
        {
            return next(err);
        })

    }
    else{
        res.render('myerror',{message: 'Incorrect file name format!'})
    }
}


/* Delete a mud file by name */
exports.deleteByName =  function(req,res){

    var filename = req.body.filename
    var query = {file_name: filename}

    MudFile.deleteOne(query)
    .then(function( obj) {       
        res.redirect('back')
    })
    .catch(function(err)
    {
        throw err
    })
}

