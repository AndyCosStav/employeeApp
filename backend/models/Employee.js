import mongoose from 'mongoose';

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

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;