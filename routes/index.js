var express = require('express');
var router = express.Router();
//var EmployeeProvider = require('../employeeprovider.js').EmployeeProvider;
//var employeeProvider= new EmployeeProvider('localhost', 27017);
var Employee = require('../employee.js');

/* GET home page. */
router.get('/', function(req, res) {
    //employeeProvider.findAll(function(error, emps){
      Employee.getFiltered(function(error, emps){  
        console.log(emps);
        res.render('index', {
            title: 'נוכחות',
            employees:emps
        });
    });
    //res.render('index', { title: 'Express' });
});

router.get('/new', function(req, res) {
    res.render('employee_new', {
        title: 'הוסף יציאה'
    });
});

router.get('/del', function(req, res) {
    res.render('delete_employee', {
        title: 'מחק יציאה'
    });
});

router.post('/del', function(req,res){
    console.log("delete");
    Employee.deleteOne(req.param('name'));
    res.redirect('/');
    
})

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