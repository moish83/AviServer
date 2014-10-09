var db = require("mongoskin").db('mongodb://localhost:27017/office');
var halfHourInMilis = 30*60*1000;
var employees = [];

/*function getAll(callback){
    callback(null, employees);
}*/

function dateForFilter(inputTime){
    var hours = inputTime.split(":")[0];
    var minutes = inputTime.split(":")[1];
    var currentDate = new Date();
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setMilliseconds(0);
    currentDate.setSeconds(0);
    return currentDate.toISOString();
}

function Employee(name, left,comeback,where,camera,laser,car){
    this.name = name;
    this.left = left;
    this.comeback = comeback;
    this.where = where;
    this.camera = camera !== undefined ? "לקח" : "לא לקח";
    this.laser = laser !== undefined ? "לקח" : "לא לקח";
    this.car = car;
    this.filtering_date = dateForFilter(comeback);
}

function getFiltered(callback){
    console.log("getFiltered");
    var currentDate = new Date();
    currentDate.setTime(currentDate.getTime()-halfHourInMilis);
    var isoDate = currentDate.toISOString();
    console.log(isoDate);
    var office = db.collection('office').find({filtering_date:{$gte:isoDate}}).toArray(function(error, results) {
        if( error ) callback(error)
        else callback(null, results)
            });
}

function getAll(callback){
    console.log("getAll");
    var office = db.collection('office').find({}).toArray(function(error, results) {
        if( error ) callback(error)
        else callback(null, results)
            });
}

function saveOne(name, left,comeback,where,camera,laser,car){
    var employee = new Employee(name, left,comeback,where,camera,laser,car);
    db.collection('office').insert(employee, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
    });
    //employees.push(employee);
}

function deleteOne(name) {
    for (var i=0;i<employees.length;i++){
        if (employees[i].name === name){
            employees.splice(i,1);
            return;
        }
    }
}

exports.deleteOne = deleteOne;
exports.saveOne = saveOne;
exports.getAll = getAll;
exports.getFiltered = getFiltered;