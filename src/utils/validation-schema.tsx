import { z } from 'zod';


export const AuthCredentialsValidator = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
});


export const EmployeeRequisitionValidator = z.object({
  division: z.string().nonempty("Division is required"),
  resourcesRequired: z.string().nonempty("Resources required is required"),
  employmentType: z.string().nonempty("Employment type is required"),
  executiveHead: z.string().optional(),
  proposedStartDate: z.date({ required_error: "Proposed start date is required" }),
  proposedEndDate: z.date({ required_error: "Proposed end date is required" }),
  motivation: z.string().nonempty("Motivation is required")
});


export const SalaryAdjustmentRequisitionValidator = z.object({
  division: z.string().nonempty("Division is required"),
  executiveHead: z.string().optional(),
  salaryAdjustmentReason: z.string().nonempty("Salary adjustment is required."),
  executiveManager: z.string().optional(),
  currentSalary: z.number({ required_error: 'Current Salary is required' }),
  recommendedSalary: z.number({ required_error: "Recommended salary is required" })
});


export const ExpenseRequestRequisitionValidator = z.object({
  serviceRequested: z.string().nonempty("Service requested is required."),
  estimatedCost: z.number({ required_error: 'Estimated cost is required' }),
  budgetAvailability: z.boolean().default(false).optional(),
  reasonRequest: z.string().nonempty("Reason for Reqest is required."),
  division: z.string().nonempty("Division is required.")
})

export type TExpenseRequestRequisitionValidator = z.infer<typeof ExpenseRequestRequisitionValidator>
export type TSalaryAdjustmentRequisitionValidator = z.infer<typeof SalaryAdjustmentRequisitionValidator>
export type TEmployeeRequisitionValidator = z.infer<typeof EmployeeRequisitionValidator>
export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>