import { CardContent } from "@/components/common/card-dashboard";
import DashboardPageWrapper from "@/components/common/dashboardPageWrapper";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SalaryInput from "@/components/ui/currency-input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-inline";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EmployeeRequisitionValidator, SalaryAdjustmentRequisitionValidator, TEmployeeRequisitionValidator, TSalaryAdjustmentRequisitionValidator } from "@/utils/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export function RequisitionCreation(){

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
    })

    const employeeRequisitionSubmit = async (employeeRequisitionData: TEmployeeRequisitionValidator) => {
        console.log("employeeRequisitionData", employeeRequisitionData)
    }; 

    const salaryAdjustmentRequisitionSubmit = async (salaryAjustmentData: TSalaryAdjustmentRequisitionValidator) => {
        console.log("salaryAdjustment", salaryAjustmentData)
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
                    <div className="pt-10 pb-10">
                        <h1 className="text-2xl font-semibold">Employee Requisition</h1>
                        <p className="text-sm text-customTheme-muted mt-2">Submit and manage requests for employee-related resources</p>
                    </div>

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

                    <div className="pt-10 pb-10">
                        <h1 className="text-2xl font-semibold">Salary Adjustment Requisition</h1>
                        <p className="text-sm text-customTheme-muted mt-2">Request and track salary adjustments with detailed justifications for review and approval.</p>
                    </div>


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
            </Tabs>
        </DashboardPageWrapper>
    )
}