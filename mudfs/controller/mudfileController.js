let MudFile = require("../models/mudFileModel") //required in order to access to the data
let db = require("./connect")
let forge = require('node-forge');
let fs = require('fs');


exports.mudFileByName = function(req, res, next){
    let file_name = req.params.name;
    if(file_name.endsWith('.p7s')){
      MudFile.findOne({'file_name': file_name.substring(0, file_name.length-4)}, 'source_file')
      .exec(function (err, result) {
        if (err) { return next(err); }
        if (result === null) {return next(err);}
        
        // create PKCS#7 signed data with authenticatedAttributes
        // attributes include: PKCS#9 content-type, message-digest, and signing-time
        var p7 = forge.pkcs7.createSignedData();
        p7.content = forge.util.createBuffer(JSON.parse(result.source_file), 'json');
        var cert = forge.pki.certificateFromPem(fs.readFileSync('certs/cert.pem'));
        p7.addCertificate(cert);
        
        p7.addSigner({
          key: forge.pki.privateKeyFromPem(fs.readFileSync('certs/key.pem')),
          certificate: cert,
          digestAlgorithm: forge.pki.oids.sha256,
          authenticatedAttributes: [{
            type: forge.pki.oids.contentType,
            value: forge.pki.oids.data
          }, {
            type: forge.pki.oids.messageDigest
            // value will be auto-populated at signing time
          }, {
            type: forge.pki.oids.signingTime,
            // will be encoded as generalized time because it's before 1950
            value: new Date()
          }]
        });
        p7.sign();
        var pem = forge.pkcs7.messageToPem(p7);

        console.log(result)
        res.setHeader('Content-Type', 'application/pkcs7-signature')
        res.send(pem)
      });
    }else{
      //Display the json of the MudFile requested
      MudFile.findOne({'file_name': file_name.substring(0, file_name.length-5)}, 'source_file')
      .exec(function (err, result) {
        if (err) { return next(err); }
        if (result === null) {return next(err);}
        //Successful, so render
        console.log(result)
        res
        //res.render('mud_file', {mud_file: JSON.parse(result.source_file)})
        res.send(JSON.parse(result.source_file))
      });
    }
};

exports.mudFileList = function(req, res, next){
    MudFile.find({}, 'file_name source_file')
    .exec(function (err, list) {
      if (err) { return next(err); }
      //Successful, so render
        console.log(list)
        res.render('mud_file_list', {title: 'Mud File List', mud_file_list: list})
    });
}