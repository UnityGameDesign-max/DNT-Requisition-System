import { ApprovalDetailSection } from "@/components/common/approval-section";
import { CardContent } from "@/components/common/card-dashboard";
import DashboardPageWrapper from "@/components/common/dashboardPageWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { approvalDetails } from "@/lib/utils";
import { RejectionRequisitionValidator, TRejectionRequisitionValidator } from "@/utils/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";


import axios from "axios";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RequisitionForm {
    id: string;
    division: string;
    resourcesRequired?: string;
    employmentType?: string;
    executiveHead?: string;
    proposedStartDate?: string;
    proposedEndDate?: string;
    motivation?: string;
    approvers: string[];
    date: string;
    requesterName: string;
    formType: string;
    salaryAdjustmentReason?: string;
    executiveManager?: string; 
    currentSalary?: number; 
    recommendedSalary?: number;
    serviceRequested?: string;
    estimatedCost?: number;
    budgetAvailability?: boolean;
    reasonRequest?: string;
    rejectionComment?: string;
  }
  
  

export function AddApproval(){

    const [allRequisitionForms, setAllRequisitionForms] = useState<RequisitionForm[]>([]);

    const { name, role } = useSelector((state: any) => state.user);

    console.log("name", name);
    console.log("role", role);

    const form = useForm<TRejectionRequisitionValidator>({
        resolver: zodResolver(RejectionRequisitionValidator),
        defaultValues: {
            comment: ''
        }
    })


    useEffect(() => {
        const fetchApprovals = async () => {
            try{
                const res = await axios.get(`${API_BASE_URL}/allRequisitionForms`)
                if(res.data) {
                    setAllRequisitionForms(res.data)
                }
            }catch(err){
                throw err;
            }
        }

        fetchApprovals();
    },[]);

    const handleReject = async (requisitionId:string, comment:string) => {
        const requisition = allRequisitionForms.find((req: any) => req.id === requisitionId);

        if (!requisition) {
            console.error("Requisition not found");
            return;
        }

        const rejection = {
            name: name,
            role: role,
            comment: comment
        };

        const updatedRequisition = {
            ...requisition,
            status: 'Rejected', 
            rejectionComment: comment,
            rejectBy: rejection
        };


        try {


            await axios.patch(`${API_BASE_URL}/allRequisitionForms/${requisitionId}`, updatedRequisition);

            setAllRequisitionForms((prevForms: any) =>
                prevForms.map((form: any) =>
                    form.id === requisitionId ? { ...form, status: 'Rejected', rejectionComment: comment } : form
                )
            );
        } catch (err) {
            console.error("Error rejecting requisition:", err);
        }
    }

    const handleApprove = async (requisitionId:string) => {

        const requisition = allRequisitionForms.find((req:any) => req.id === requisitionId);

        console.log("requisition", requisition)

        if (!requisition) {
            console.error("Requisition not found");
            return;
        }

        const approver = {
            name: name,
            role: role
        }
        try{
            const updatedApprovers = [...requisition.approvers, approver];
            const res = await axios.patch(`${API_BASE_URL}/allRequisitionForms/${requisitionId}`, {
                id: requisitionId,
                approvers: updatedApprovers,
                status: approver.role === 'Admin' ? 'Approved' : 'Pending'
            });

            console.log("res", res);

            setAllRequisitionForms((prevForms : any) => 
                prevForms.map((form : any) => 
                    form.id === requisitionId
                    ? { ...form, approvers: updatedApprovers }
                    : form
                )
            )
            
        } catch(err) {
            throw err;
        }
    }

    return (
        <DashboardPageWrapper>
            {allRequisitionForms.map((requisition: any) => {
                
                const isApproved = requisition.approvers.some((approver: { name: string }) => approver.name === name) || requisition.status === "Approved" && role === 'Admin';

                return (
                    <CardContent className="my-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-semibold">{requisition.formType}</h1>
                                <p className="text-customTheme-muted text-sm">{requisition.division}</p>
                            </div>
                        
                            <div className="flex gap-2">
                                <Button 
                                    onClick={() => handleApprove(requisition.id)} 
                                    disabled={isApproved}
                                    variant='outline'>
                                    <CircleCheck className="text-green-400" />
                                    {isApproved ? 'Approved' : 'Approve'}
                                </Button>

                                <Dialog>
                                    <DialogTrigger>
                                        <Button disabled={requisition.status === 'Rejected'} variant='outline'>
                                            <CircleX className="text-red-400"/>
                                            Reject
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit((data) => handleReject(requisition.id, data.comment))}>
                                                <Label htmlFor="comment">Rejection Comment</Label>
                                                <FormField
                                                    control={form.control}
                                                    name="comment"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Textarea {...field}/>
                                                            </FormControl>
                                                            <FormMessage className="text-red-400"/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button type="submit">Reject</Button>
                                            </form>

                                            
                                            
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                               
                            </div>

                        
                        </div>

                        <Separator className="bg-customTheme-muted my-1"/>
                        
                        <div className="grid grid-cols-4 p-6 gap-4">
                            {approvalDetails(requisition).map((approval) => (
                                <ApprovalDetailSection keys={approval.key} value={approval.value}/>
                            ))}

                        </div>
                    </CardContent>
                )
            })}
          
        </DashboardPageWrapper>
    )
}