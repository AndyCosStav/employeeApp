import Employee from '../models/Employee.js';

export async function createEmployee(employeeData) {
  const employee = new Employee(employeeData);
  return await employee.save();
}

export async function getAllEmployees() {
  return await Employee.find().sort({ createdAt: -1 });
}

export async function getEmployeeById(id) {
  return await Employee.findById(id);
}

export async function deleteEmployeeById(id) {
  return await Employee.findByIdAndDelete(id);
}

export async function updateEmployeeById(id, employeeData) {
  return await Employee.findByIdAndUpdate(
    id,
    { $set: employeeData },
    { new: true, runValidators: true }
  );
}
