import CardDashboard, { CardContent } from "@/components/common/card-dashboard";
import DashboardPageWrapper from "@/components/common/dashboard-page-wrapper";
import axios from "axios";
import { 
    BookOpenCheck, 
    CircleX, 
    ClockArrowDown, 
    NotepadText, 
    UsersRound 
} from "lucide-react";

import { useEffect, useState } from "react";
import { RequisitionSummary } from "./components/RequisitionSummary";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const DashboardHome = () => {

    const [dashboardSummaryInfo, setDashboardSummaryInfo] = useState({
        users: "0",
        approvedForms: "0",
        rejectedForms: "0",
        pendingForms: "0"
    })

    const cardData = [
        {
            label: "Total users",
            amount: dashboardSummaryInfo.users,
            icon: UsersRound
        },
        {
            label: "Approved Forms",
            amount: dashboardSummaryInfo.approvedForms,
            icon: BookOpenCheck
        },
        {
            label: "Pending Forms",
            amount: dashboardSummaryInfo.pendingForms,
            icon: ClockArrowDown
        },
        {
            label: "Rejected Forms",
            amount: dashboardSummaryInfo.rejectedForms,
            icon: CircleX
        },

    ]

    useEffect(() => {
        const fetchDashboardData = async () => {
            try{
                const res = await axios.get(`${API_BASE_URL}/allRequisitionForms`)
                if(res.data.length){

                    const approvedForms = res.data.filter((form: any) => form.status === "Approved").length;
                    const pendingForms = res.data.filter((form: any)=> form.status === "Pending").length;
                    const rejectedForms = res.data.filter((form: any) => form.status === "Rejected").length;
                    setDashboardSummaryInfo(prevState => ({
                        ...prevState,
                        approvedForms,
                        pendingForms,
                        rejectedForms
                    }));
                }
            }catch(err){
                throw err;
            }
        }

        const fetchUsers = async () => {
            try{
                const res = await axios.get(`${API_BASE_URL}/users`);
                if(res.data.length){
                  
                    const users = res.data.length;

                    setDashboardSummaryInfo(prevState => ({
                        ...prevState,
                        users: users
                    }))
                }
            }catch(err){
                throw err;
            }
        }

        fetchUsers();
        fetchDashboardData();
    },[])

    return (
        <DashboardPageWrapper className="flex flex-col gap-5">
            <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
                {cardData.map((d, i) => 
                    <CardDashboard 
                        key={i}
                        label={d.label}
                        amount={d.amount}
                        icon={d.icon}
                        description=""
                    />
                )}
            </section>

            <section className="grid grid-cols-1 gap-4 transition-all">
                <CardContent>
                    <div className="flex items-center gap-2">
                        <div className="bg-customTheme-primary/10 flex h-10 w-10 items-center justify-center rounded-[50px]">
                            <NotepadText className="h-5 w-5 text-customTheme-primary" />
                        </div>
                        
                        <h1 className="font-medium">Recent requisitions forms</h1>
                    </div>
                    <RequisitionSummary />
                </CardContent>
            </section>

        </DashboardPageWrapper>
     
    );
}