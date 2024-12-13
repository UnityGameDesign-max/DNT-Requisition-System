import { CardContent } from "@/components/common/card-dashboard";
import DashboardPageWrapper from "@/components/common/dashboardPageWrapper";
import { FormPageTitle } from "@/components/common/form-title";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import SalaryInput from "@/components/ui/currency-input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-inline";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EmployeeRequisitionValidator, ExpenseRequestRequisitionValidator, SalaryAdjustmentRequisitionValidator, TEmployeeRequisitionValidator, TExpenseRequestRequisitionValidator, TSalaryAdjustmentRequisitionValidator } from "@/utils/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export function RequisitionCreation(){

    const navigate = useNavigate();
    const name = localStorage.getItem("name");

    const employeeRequisitionForm = useForm<TEmployeeRequisitionValidator>({
        resolver: zodResolver(EmployeeRequisitionValidator),
        defaultValues: {
            division: '',
            resourcesRequired: '',
            employmentType: '',
            executiveHead: '',
            motivation: ''
        }
    });

    const salaryAdjustmentRequisitionForm = useForm<TSalaryAdjustmentRequisitionValidator>({
        resolver: zodResolver(SalaryAdjustmentRequisitionValidator),
        defaultValues: {
            division: '',
            executiveHead: '',
            salaryAdjustmentReason: '',
            executiveManager: '',
            currentSalary: 0,
            recommendedSalary: 0
        }
    });


    const expenseRequestRequisitionForm = useForm<TExpenseRequestRequisitionValidator>({
        resolver: zodResolver(ExpenseRequestRequisitionValidator),
        defaultValues: {
            serviceRequested: '',
            estimatedCost: 0,
            budgetAvailability: true,
            reasonRequest: '',
            division: ''
        }
    })

    const employeeRequisitionSubmit = async (employeeRequisitionData: TEmployeeRequisitionValidator) => {
        
        const formType = "Employee Requisition";

        (employeeRequisitionData as TEmployeeRequisitionValidator & { approvers: any[] }).approvers = [];
        (employeeRequisitionData as TEmployeeRequisitionValidator & { approvers: any[]; date: Date }).date = new Date();
        (employeeRequisitionData as TEmployeeRequisitionValidator & { approvers: any[]; date: Date; requesterName: string | null}).requesterName = name;
        (employeeRequisitionData as TEmployeeRequisitionValidator & { approvers: any[]; date: Date; requesterName: string | null; formType: string}).formType = formType

        try{
            const res = await axios.post(`${API_BASE_URL}/allRequisitionForms`, employeeRequisitionData);
        
            if(res.data){
                navigate("/dashboard");
            }
        }catch(err){
            throw err;
        }
    }; 

    const salaryAdjustmentRequisitionSubmit = async (salaryAjustmentData: TSalaryAdjustmentRequisitionValidator) => {

        const formType = "Salary Adjustment Requisition";

        (salaryAjustmentData as TSalaryAdjustmentRequisitionValidator & { approvers: any[] }).approvers = [];
        (salaryAjustmentData as TSalaryAdjustmentRequisitionValidator & { approvers: any[]; date: Date }).date = new Date();
        (salaryAjustmentData as TSalaryAdjustmentRequisitionValidator & { approvers: any[]; date: Date; requesterName: string | null }).requesterName = name;
        (salaryAjustmentData as TSalaryAdjustmentRequisitionValidator & { approvers: any[]; date: Date; requesterName: string | null; formType: string}).formType = formType;

        try{
            const res = await axios.post(`${API_BASE_URL}/allRequisitionForms`, salaryAjustmentData);
            if(res.data){
                navigate("/dashboard")
            }
        }catch(err){
            throw err;
        }
    }

    const expenseRequestRequisitionSubmit = async (expenseRequestData: TExpenseRequestRequisitionValidator) => {

        const formType = "Expense Request Requisition";
        (expenseRequestData as TExpenseRequestRequisitionValidator & { approvers: any[] }).approvers = [];
        (expenseRequestData as TExpenseRequestRequisitionValidator & { approvers: any[]; date: Date }).date = new Date();
        (expenseRequestData as TExpenseRequestRequisitionValidator & { approvers: any[]; date: Date; requesterName: string | null}).requesterName = name;
        (expenseRequestData as TExpenseRequestRequisitionValidator & { approvers: any[]; date: Date; requesterName: string | null; formType: string}).formType = formType;

        try{
            const res = await axios.post(`${API_BASE_URL}/allRequisitionForms`, expenseRequestData);
            if(res.data){
                navigate("/dashboard");
            }
        }catch(err){
            throw err;
        }
    }

    const employmentType = ["Permanent", "Temporary"];

    const salaryAdjustmentReason = ["Promotion", "Performance", "Retention", "Normal Annual Adjustment"]

    return (
        <DashboardPageWrapper>
            <Tabs defaultValue="employee" className="w-full">
                <TabsList className="w-full ">
                    <TabsTrigger value="employee">Employee Requisition</TabsTrigger>
                    <TabsTrigger value="salary">Salary Adjustment Requisition</TabsTrigger>
                    <TabsTrigger value="expense">Expense Request</TabsTrigger>
                </TabsList>
                <TabsContent value="employee">

                    <FormPageTitle 
                        title="Employee Requisition"
                        description="Submit and manage requests for employee-related resources"
                    />

                    <CardContent>
                        <Form {...employeeRequisitionForm}>
                            <MaxWidthWrapper className="px-20">
                                <form onSubmit={employeeRequisitionForm.handleSubmit(employeeRequisitionSubmit)}>
                                    <div className="grid grid-cols-2 gap-6 mb-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="division">Division</Label>
                                            <FormField 
                                                control={employeeRequisitionForm.control}
                                                name="division"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                id="division"
                                                                className="w-full"
                                                                { ...field }
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-400"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="resources">Resources Required</Label>
                                            <FormField 
                                                control={employeeRequisitionForm.control}
                                                name="resourcesRequired"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                id="resources"
                                                                className="w-full"
                                                                { ...field }
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-400"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 mb-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="employmentType">Employment Type</Label>
                                            <FormField 
                                                control={employeeRequisitionForm.control}
                                                name="employmentType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                       <Select
                                                        onValueChange={(value: any) => {
                                                            field.onChange(value);
                                                        }}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <FormMessage className="text-red-400"/>
                                                            <SelectContent className="bg-white">
                                                                {employmentType?.map((item : string, i:number) => {
                                                                    return (
                                                                        <SelectItem value={item} key={i}>
                                                                            {item}
                                                                        </SelectItem>
                                                                    )
                                                                })}
                                                        
                                                            </SelectContent>
                                                        </Select>
                                                        
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="executiveHead">Executive Head</Label>
                                            <FormField 
                                                control={employeeRequisitionForm.control}
                                                name="executiveHead"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                id="executiveHead"
                                                                className="w-full"
                                                                { ...field }
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-400"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="proposed start date">Proposed Start Date</Label>
                                            <FormField
                                                control={employeeRequisitionForm.control}
                                                name="proposedStartDate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                            >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span></span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            className="bg-white"
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage className="text-red-400"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="proposed end date">Proposed End Date</Label>
                                            <FormField
                                                control={employeeRequisitionForm.control}
                                                name="proposedEndDate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                            >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span></span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            className="bg-white"
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage className="text-red-400"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 space-y-2">
                                        <Label htmlFor="motivation">Motivation</Label>
                                        <FormField 
                                            control={employeeRequisitionForm.control}
                                            name="motivation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            id="motivation"
                                                            className="w-full"
                                                            placeholder="Type your motivativation here."
                                                            { ...field }
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400"/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button type="submit">Save</Button>
                                    
                                </form>
                            </MaxWidthWrapper>
                           
                        </Form>
                    </CardContent>
                </TabsContent>

                <TabsContent value="salary">

                    <FormPageTitle 
                        title="Salary Adjustment Requisition"
                        description="Request and track salary adjustments with detailed justifications for review and approval."
                    />


                    <CardContent>
                        <Form {...salaryAdjustmentRequisitionForm}>
                            <MaxWidthWrapper className="px-20">
                                <form onSubmit={salaryAdjustmentRequisitionForm.handleSubmit(salaryAdjustmentRequisitionSubmit)}>
                                    <div className="grid grid-cols-2 gap-6 mb-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="division">Division</Label>
                                                <FormField 
                                                    control={salaryAdjustmentRequisitionForm.control}
                                                    name="division"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    id="division"
                                                                    className="w-full"
                                                                    { ...field }
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400"/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="executiveHead">Executive Head</Label>
                                                <FormField 
                                                    control={employeeRequisitionForm.control}
                                                    name="executiveHead"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    id="executiveHead"
                                                                    className="w-full"
                                                                    { ...field }
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400"/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="salaryAdjustment">Reason for Salary Adjustment</Label>
                                                <FormField 
                                                    control={salaryAdjustmentRequisitionForm.control}
                                                    name="salaryAdjustmentReason"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                        <Select
                                                            onValueChange={(value: any) => {
                                                                field.onChange(value);
                                                            }}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <FormMessage className="text-red-400"/>
                                                                <SelectContent className="bg-white">
                                                                    {salaryAdjustmentReason?.map((item : string, i:number) => {
                                                                        return (
                                                                            <SelectItem value={item} key={i}>
                                                                                {item}
                                                                            </SelectItem>
                                                                        )
                                                                    })}
                                                            
                                                                </SelectContent>
                                                            </Select>
                                                            
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="executive Manager">Executive Manager</Label>
                                                <FormField 
                                                    control={salaryAdjustmentRequisitionForm.control}
                                                    name="executiveManager"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    id="executiveManager"
                                                                    className="w-full"
                                                                    { ...field }
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400"/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-3">
                                            <div className="space-y-2">
                                                <SalaryInput
                                                    form={salaryAdjustmentRequisitionForm}
                                                    className="w-full"
                                                    label="Current Salary"
                                                    name="currentSalary"
                                                />
                                            </div>

                                            <div className="space-y-2 mb-3">
                                                <SalaryInput
                                                    form={salaryAdjustmentRequisitionForm}
                                                    className="w-full"
                                                    label="Recommended Salary"
                                                    name="recommendedSalary"
                                                />
                                            </div>
                                    </div>

                                    <Button type="submit">Save</Button>
                                </form>
                            </MaxWidthWrapper>
                        </Form>
                    </CardContent>
                </TabsContent>

                <TabsContent value="expense">

                    <FormPageTitle 
                        title="Expense Request"
                        description="Provide the required information for your expense request submission."
                    />

                    <CardContent>
                        <Form {...expenseRequestRequisitionForm}>
                            <MaxWidthWrapper className="px-20">
                                <form onSubmit={expenseRequestRequisitionForm.handleSubmit(expenseRequestRequisitionSubmit)}>
                                    <div className="grid grid-cols-2 gap-6 mb-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="serviceRequested">Service Requested</Label>
                                                <FormField 
                                                    control={expenseRequestRequisitionForm.control}
                                                    name="serviceRequested"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    id="serviceRequested"
                                                                    className="w-full"
                                                                    { ...field }
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-400"/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <SalaryInput
                                                    form={salaryAdjustmentRequisitionForm}
                                                    className="w-full"
                                                    label="Estimated Cost"
                                                    name="estimatedCost"
                                                />
                                            </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-3">
                                        <div className="space-y-2 flex flex-col ">

                                            <Label htmlFor="budgetAvailibility">Budget Availibility</Label>
                                            <FormField 
                                                control={expenseRequestRequisitionForm.control}
                                                name="budgetAvailability"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value ?? false}
                                                                onCheckedChange={field.onChange}
                                                                id="budgetAvailability"
                                                                className="mt-2"
                                                                {...(field && { onBlur: field.onBlur })} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-400"/>
                                                    </FormItem>
                                                )}
                                            />
                                           
                                        </div>

                                        <div className="space-y-2  ">
                                            <Label htmlFor="division">Division</Label>

                                            <FormField 
                                                control={expenseRequestRequisitionForm.control}
                                                name="division"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                id="division"
                                                                className="w-full"
                                                                { ...field }
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-400"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 mb-3">
                                         

                                            <div className="space-y-2">
                                                <Label htmlFor="reasonRequest">Reason for Request</Label>
                                                <FormField 
                                                    control={expenseRequestRequisitionForm.control}
                                                    name="reasonRequest"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Textarea { ...field } id="reasonRequest"/>
                                                            </FormControl>
                                                            <FormMessage className="text-red-400"/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                    </div>

                                    <Button type="submit">Save</Button>
                                </form>
                            </MaxWidthWrapper>
                        </Form>
                    </CardContent>
                </TabsContent>
            </Tabs>
        </DashboardPageWrapper>
    )
}