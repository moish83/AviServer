var express = require('express');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var router = express.Router();
//var EmployeeProvider = require('../employeeprovider.js').EmployeeProvider;
//var employeeProvider= new EmployeeProvider('localhost', 27017);
var Employee = require('../employee.js');
var names = require('../names.json');
var cars = require('../cars.json');

/* GET home page. */
router.get('/', function(req, res) {
    //employeeProvider.findAll(function(error, emps){
      Employee.getFiltered(function(error, emps){  
        console.log(emps);
        res.render('index', {
            title: 'ז.כ כניסות ויציאות',
            employees:emps
        });
    });
    //res.render('index', { title: 'Express' });
});

router.get('/new', function(req, res) {
    res.render('employee_new', {
        title: 'הוסף יציאה', names: names.names, cars: cars.cars
    });
});

router.get('/del', function(req, res) {
    res.render('delete_employee', {
        title: 'מחק יציאה', names: names.names
    });
});

router.post('/del', function(req,res){
    console.log("delete");
    Employee.deleteOne(req.param('name'));
    res.redirect('/');
    
});

router.get('/history', function(req, res) {
    Employee.getAll(function(temp,results){
        var file = __dirname + '/../history.csv';

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
    });
});

router.post('/new', function(req, res){
    //employeeProvider.save({
    Employee.saveOne(req.param('name'),req.param('left'),req.param('comeback'),req.param('where'),req.param('camera'),req.param('laser'),req.param('car'));
    res.redirect('/');
     /*   title: req.param('title'),
        name: req.param('name')
    }, function( error, docs) {
        res.redirect('/')
    });*/
});

module.exports = router;
