"use strict";
var dbConn = require("./../../config/db.config");

//Employee object create
var Employee = function (employee) {
  this.employe_name = employee.employe_name;
  this.employe_manager_id = employee.employe_manager_id;
};
Employee.create = function (newEmp, result) {
  dbConn.query("INSERT INTO tbl_employee set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Employee.findById = function (employe_id, result) {
  dbConn.query(
    "Select * from tbl_employee where employe_id = ? ",
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
  dbConn.query(
    "Select tbl_employee.employe_name,tbl_employee_client.manager_name, tbl_employee_client.path_level, tbl_employee_client.employee_format,tbl_employee_client.path_hierarchy from tbl_employee inner join tbl_employee_client on tbl_employee.employe_manager_id =tbl_employee_client.employee_id ",
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
    "UPDATE tbl_employee SET employe_name=?,employe_manager_id=? WHERE employe_id = ?",
    [employee.employe_name, employee.employe_manager_id, employe_id],
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
    "DELETE FROM tbl_employee WHERE employe_id = ?",
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
