import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";


vi.mock("../../../services/employeeService", () => ({
  getAllEmployees: vi.fn(),
  getEmployeeById: vi.fn(),
}));


import { getAllEmployees, getEmployeeById } from "../../../services/employeeService"
import { getAllEmployeesController, getEmployeeByIdController} from "../../../controllers/employeeController"

function createRes() {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
  } as unknown as Response;


  (res.status as any).mockReturnValue(res);

  return res;
}

describe("getAllEmployeesController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns employees with success=true", async () => {
    const fakeEmployees = [
      { firstname: "Andy", lastname: "Stav", employeeNumber: 1, department: "IT" },
    ];

    (getAllEmployees as any).mockResolvedValue(fakeEmployees);

    const req = {} as Request;
    const res = createRes();

    await getAllEmployeesController(req, res);

    expect(getAllEmployees).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: fakeEmployees,
    });
  });

  it("returns 500 + error message when service throws", async () => {
    (getAllEmployees as any).mockRejectedValue(new Error("DB down"));

    const req = {} as Request;
    const res = createRes();

    await getAllEmployeesController(req, res);

    expect(getAllEmployees).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Failed to get employees",
    });
  });
});

describe("getEmployeeByIdController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a specific employee by its ID", async () => {
    const fakeEmployee = 
      { firstname: "Andy", lastname: "Stav", employeeNumber: 1, department: "IT" }
    ;

    (getEmployeeById as any).mockResolvedValue(fakeEmployee);

    const id = "507f1f77bcf86cd799439011"
    const req = {
    params: { id: id }
    } as Request<{ id: string }>

    const res = createRes();

    await getEmployeeByIdController(req, res);

    expect(getEmployeeById).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: fakeEmployee,
    });
  });


  it("returns a 400 when the id is invalid", async () => {
    const fakeEmployee = 
      { firstname: "Andy", lastname: "Stav", employeeNumber: 1, department: "IT" }
    ;

    (getEmployeeById as any).mockResolvedValue(fakeEmployee);

    const id = "222"
    const req = {
    params: { id: id }
    } as Request<{ id: string }>

    const res = createRes();

    await getEmployeeByIdController(req, res);

    expect(getEmployeeById).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenLastCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid employee id",
    });
  });

  it("returns a 404 when the employee is not found", async () => {

    (getEmployeeById as any).mockResolvedValue(null);

    const id = "507f1f77bcf86cd799439011"
    const req = {
    params: { id: id }
    } as Request<{ id: string }>

    const res = createRes();

    await getEmployeeByIdController(req, res);

    expect(getEmployeeById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Employee not found",
    });
  });

});
  