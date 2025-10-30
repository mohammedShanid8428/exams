const Employee = require('../model/employeeModel');

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully", newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create employee", error: err.message });
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ message: "Employees fetched successfully", employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch employees", error: err.message });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee updated successfully", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating employee", error: err.message });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully", deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting employee", error: err.message });
  }
};
