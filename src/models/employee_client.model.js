'use strict';
var dbConn = require('../../config/db.config');

//Employee object create
var Employee = function (employee) {
    this.employee_name = employee.employee_name;
    this.manager_name = employee.manager_name;
    this.path_level = employee.path_level;
    this.employee_format = employee.employee_format;
    this.path_hierarchy = employee.path_hierarchy;
   
};
Employee.create = function (newEmp, result) {
    dbConn.query("INSERT INTO tbl_employee_client set ?", newEmp, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Employee.findById = function (employe_id, result) {
  dbConn.query(
    "Select * from tbl_employee_client where employe_id = ? ",
    employe_id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Employee.findAll = function (result) {
    dbConn.query("Select * from tbl_employee_client", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("tbl_employee : ", res);
        result(null, res);
      }
    });
};
Employee.findLevel = function (result) {
  dbConn.query(
    "SELECT employee_id, employee_name, manager_name, path_level, CONCAT(LPAD('', (path_level - 1) * 4, '_'), employee_name) AS path_level FROM tbl_employee_client;",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("tbl_employee : ", res);
        result(null, res);
      }
    }
  );
};

Employee.update = function (employe_id, employee, result) {
  dbConn.query(
    "UPDATE tbl_employee_client SET employee_name=?,manager_name=?,path_level=?,path_hierarchy=?,employee_format=? WHERE employe_id = ?",
    [
      employee.employee_name,
      employee.manager_name,
      employee.path_level,
      employee.employee_format,
      employee.path_hierarchy,
      employe_id,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Employee.delete = function (employe_id, result) {
  dbConn.query(
    "DELETE FROM tbl_employee_client WHERE employe_id = ?",
    [employe_id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = Employee;