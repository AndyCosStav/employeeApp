import express from 'express'
import { authenticateToken } from '../middleware/authenticateToken.js'
import { authorizeRoles } from '../middleware/authorizeRoles.js'

import {
  createEmployeeController,
  deleteEmployeeByIdController,
  getAllEmployeesController,
  getEmployeeByIdController,
  updateEmployeeByIdController
} from '../controllers/employeeController.js'

const router = express.Router()


router.use(authenticateToken)

// Read routes 
router.get('/employees', authorizeRoles('admin'),  getAllEmployeesController)
router.get('/employee/:id', authorizeRoles('admin'),  getEmployeeByIdController)

// Write routes 
router.post('/employee', authorizeRoles('admin'), createEmployeeController)
router.patch('/employee/:id', authorizeRoles('admin'), updateEmployeeByIdController)
router.delete('/employee/:id', authorizeRoles('admin'), deleteEmployeeByIdController)

export default router