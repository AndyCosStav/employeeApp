import mongoose from 'mongoose'
import { Request, Response } from 'express'
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById
} from '../services/employeeService'

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


type MongoDuplicateKeyError = Error & {
  code?: number
}

// POST /employee
export async function createEmployeeController(req :Request<{}, {}, CreateEmployeeData>, res: Response): Promise<Response> {
  try {
    const { firstname, lastname, department } = req.body

    if (!firstname || !lastname || !department) {
      return res.status(400).json({
        success: false,
        message: 'employee firstname and lastname and department required'
      })
    }

    const employeeNumber = Math.floor(Math.random() * 1000) + 1

    const createdEmployee = await createEmployee({ firstname, lastname, employeeNumber, department})

    return res.status(201).json({
      success: true,
      data: createdEmployee
    })
  } catch (error) {

    const err = error as MongoDuplicateKeyError
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'employeeNumber already exists'
      })
    }

    console.error('Create employee error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to create employee',
      error: err.message
    })
  }
}

// GET /employees
export async function getAllEmployeesController(req :Request,res: Response): Promise<Response> {
  try {
    const employees = await getAllEmployees()

    return res.json({
      success: true,
      data: employees
    })
  } catch (error) {
    console.error('Get employees error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to get employees'
    })
  }
}

// GET /employee/:id
export async function getEmployeeByIdController(req: Request<{id:string}>, res: Response) {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee id'
      })
    }

    const employee = await getEmployeeById(id)

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      })
    }

    return res.json({
      success: true,
      data: employee
    })
  } catch (error) {
    console.error('Get employee error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to get employee'
    })
  }
}

// DELETE /employee/:id
export async function deleteEmployeeByIdController(req: Request<{id:string}>, res: Response) {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee id'
      })
    }

    const employee = await getEmployeeById(id)
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      })
    }

    await deleteEmployeeById(id)
    return res.status(204).send()
  } catch (error) {
    console.error('Delete employee error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to delete employee'
    })
  }
}

// PATCH /employee/:id
export async function updateEmployeeByIdController(req: Request<{id:string}, {}, UpdateEmployeeData>, res: Response) {
  try {
    const { id } = req.params

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required'
      })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee id'
      })
    }

    const employee = await getEmployeeById(id)
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      })
    }

    const updatedEmployee = await updateEmployeeById(id, req.body)

    return res.status(200).json({
      success: true,
      data: updatedEmployee
    })
  } catch (error) {
    console.error('Update employee error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to update employee'
    })
  }
}