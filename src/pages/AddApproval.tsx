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
import { BookOpenCheck, CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

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
    status: string;
    rejectBy?: { name: string; role: string; comment: string };
}

export function AddApproval() {
    const [allRequisitionForms, setAllRequisitionForms] = useState<RequisitionForm[]>([]);
    const { name, role } = useSelector((state: any) => state.user);
    const [open, setOpen] = useState<boolean>(false);
    const [requisitionLoad, setRequisitionLoad] = useState<boolean>(true);

    const form = useForm<TRejectionRequisitionValidator>({
        resolver: zodResolver(RejectionRequisitionValidator),
        defaultValues: {
            comment: ''
        }
    });

    useEffect(() => {
        const fetchApprovals = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/allRequisitionForms`);
                if (res.data) {
                    const sortedData = res.data.sort((a: RequisitionForm, b: RequisitionForm) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                    setAllRequisitionForms(sortedData);
                }
            } catch (err) {
                throw err;
            }
        };

        fetchApprovals();
    }, [requisitionLoad]);

    const handleReject = async (requisitionId: string, comment: string) => {
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
            setOpen(false);
            toast.success("Rejected requisition successfully");
        } catch (err) {
            console.error("Error rejecting requisition:", err);
        }
    };

    const handleApprove = async (requisitionId: string) => {
        const requisition = allRequisitionForms.find((req: any) => req.id === requisitionId);

        if (!requisition) {
            console.error("Requisition not found");
            return;
        }

        if (role !== 'Admin') {
            console.error("Only admin can approve requisitions");
            return;
        }

        const approver = {
            name: name,
            role: role,
            date: new Date(),
            digitalSignature: true
        };

        try {
            const updatedApprovers = [...requisition.approvers, approver];
            await axios.patch(`${API_BASE_URL}/allRequisitionForms/${requisitionId}`, {
                id: requisitionId,
                approvers: updatedApprovers,
                status: 'Approved' // Only Admin can set the status to 'Approved'
            });

            setRequisitionLoad(!requisitionLoad);

            setAllRequisitionForms((prevForms: any) =>
                prevForms.map((form: any) =>
                    form.id === requisitionId
                        ? { ...form, approvers: updatedApprovers, status: 'Approved' }
                        : form
                )
            );
            toast.success("Approved the requisition");
        } catch (err) {
            console.error("Error approving requisition:", err);
        }
    };

    return (
        <DashboardPageWrapper>
            {
                allRequisitionForms.length > 0 ?
                    allRequisitionForms.map((requisition: any) => {
                        const isApproved = requisition.approvers.some((approver: { name: string }) => approver.name === name) || requisition.status === "Approved" && role === 'Admin';
                        const isRejected = requisition.status === "Rejected";

                        return (
                            <CardContent className="my-4" key={requisition.id}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="font-semibold">{requisition.formType}</h1>
                                        <p className="text-customTheme-muted text-sm">{requisition.division}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleApprove(requisition.id)}
                                            disabled={isApproved || requisition.status === "Approved" || requisition.status === "Rejected"}
                                            variant='outline'>
                                            <CircleCheck className="text-green-400" />
                                            {isApproved ? 'Approved' : 'Approve'}
                                        </Button>

                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    disabled={isRejected || requisition.status === "Approved"}
                                                    variant='outline'>
                                                    <CircleX className="text-red-400" />
                                                    Reject
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-white">
                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit((data) => {
                                                        handleReject(requisition.id, data.comment);
                                                    })}>
                                                        <Label htmlFor="comment">Rejection Comment</Label>
                                                        <FormField
                                                            control={form.control}
                                                            name="comment"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Textarea {...field} />
                                                                    </FormControl>
                                                                    <FormMessage className="text-red-400" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <Button className="my-3" type="submit">Reject</Button>
                                                    </form>
                                                </Form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>

                                <Separator className="bg-customTheme-muted my-1" />

                                <div className="grid grid-cols-4 p-6 gap-4">
                                    {approvalDetails(requisition).map((approval) => (
                                        <ApprovalDetailSection keys={approval.key} value={approval.value} />
                                    ))}
                                </div>
                            </CardContent>
                        );
                    })
                    :
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border p-8 text-center animate-in fade-in-50">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-customTheme-primary/10">
                            <BookOpenCheck className="w-10 h-10 text-customTheme-primary" />
                        </div>
                        <h2 className="mt-6">There are currently no requisitions available yet.</h2>
                    </div>
            }

        </DashboardPageWrapper>
    );
}
