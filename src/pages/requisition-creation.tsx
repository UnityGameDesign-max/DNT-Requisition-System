import { CardContent } from "@/components/common/card-dashboard";
import DashboardPageWrapper from "@/components/common/dashboardPageWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-inline";

export function RequisitionCreation(){

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
                </TabsContent>
            </Tabs>
        </DashboardPageWrapper>
    )
}