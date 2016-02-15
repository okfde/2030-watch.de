/**
 * Created by knutator on 15.02.16.
 */
var fs = require('fs');
var jsonfile = require('jsonfile');
var csv = require('csv-write-stream');
var util  = require('util');
var json2csv = require('json2csv');

var path = '../../_data/datasets/online/';


var result = [];


fs.readdir(path, function(err, files) {
    if (err) {
        console.log('Caanot Read Directory');
        console.log(err.message);
    } else {
        files.forEach(function(filename, index, array) {
            jsonfile.readFile(path + filename, function(err, obj) {
                if (err) {
                    console.error('Couldn\'t read ' + filename);
                    console.error(err.message);
                } else {
                    //console.dir(obj);
                    delete obj.country;
                    result.push(obj);
                    if (index == array.length - 1) {
                        console.log('finished');
                        console.log(result);
                        jsonfile.writeFile('meta.json', result, {spaces: 4}, function(err) {
                            if (err) {
                                console.log(err.message);
                            }
                        });


                        var fields = [];
                        for(var k in result[0]) fields.push(k);
                        console.log(fields);
                        json2csv({ data: result, fields: fields }, function(err, csv) {
                            if (err) console.log(err);
                            console.log(csv);
                            fs.writeFile('meta.csv', csv, 'utf8', function(err) {
                                if (err) {
                                    console.log(err.message);
                                }
                            });
                        });
                    }

                }
            });
        });
    }
});
