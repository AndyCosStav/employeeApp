import mongoose from 'mongoose';


export interface EmployeeDocument {
  firstname: string
  lastname: string
  employeeNumber: number
  department: string
  createdAt: Date
  updatedAt: Date
}

const employeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true
    },
     lastname: {
      type: String,
      required: true,
      trim: true
    },
    employeeNumber: {
      type: Number,
      required: true,
      unique: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Employee = mongoose.model<EmployeeDocument>('Employee', employeeSchema)

export default Employee;