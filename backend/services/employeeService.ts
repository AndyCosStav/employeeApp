import Employee from '../models/Employee';

type CreateEmployeeData = {
  firstname: string
  lastname: string
  employeeNumber: number
  department: string
}

type UpdateEmployeeData = {
  firstname?: string
  lastname?: string
  employeeNumber?: number
  department?: string
}


export async function createEmployee(employeeData: CreateEmployeeData) {
  const employee = new Employee(employeeData);
  return await employee.save();
}

export async function getAllEmployees() {
  return await Employee.find().sort({ createdAt: -1 });
}

export async function getEmployeeById(id: string) {
  return await Employee.findById(id);
}

export async function deleteEmployeeById(id: string) {
  return await Employee.findByIdAndDelete(id);
}

export async function updateEmployeeById(id : string , employeeData: UpdateEmployeeData) {
  return await Employee.findByIdAndUpdate(
    id,
    { $set: employeeData },
    { new: true, runValidators: true }
  );
}
