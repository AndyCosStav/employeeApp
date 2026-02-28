import express from 'express'
import { authenticateToken } from '../middleware/authenticateToken'
import { authorizeRoles } from '../middleware/authorizeRoles'

import {
  createEmployeeController,
  deleteEmployeeByIdController,
  getAllEmployeesController,
  getEmployeeByIdController,
  updateEmployeeByIdController
} from '../controllers/employeeController'

const router = express.Router()


router.use(authenticateToken)

// Read routes  
router.get('/employees', authorizeRoles('admin'),  getAllEmployeesController)
router.get('/employee/:id', authorizeRoles('admin'),  getEmployeeByIdController)

// Write routes (todo make admin and manager only apis)    
router.post('/employee', authorizeRoles('admin'), createEmployeeController)
router.patch('/employee/:id', authorizeRoles('admin'), updateEmployeeByIdController)
router.delete('/employee/:id', authorizeRoles('admin'), deleteEmployeeByIdController)

export default router