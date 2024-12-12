import CardDashboard from "@/components/common/card-dashboard";
import axios from "axios";
import { BookOpenCheck, ClockArrowDown, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const DashboardHome = () => {

    const [dashboardSummaryInfo, setDashboardSummaryInfo] = useState({
        users: "0",
        approvedForms: "0",
        totalForms: "0",
        pendingForms: "0"
    })

    const cardData = [
        {
            label: "Total users",
            amount: dashboardSummaryInfo.users,
            icon: UsersRound
        },
        {
            label: "Total Forms",
            amount: dashboardSummaryInfo.totalForms,
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
        }

    ]

    useEffect(() => {
        const fetchDashboardData = async () => {
            try{
                const res = await axios.get(`${API_BASE_URL}/dashboardSummary`);
                if(res.data.length){
                    setDashboardSummaryInfo({
                        users: res.data[0].users,
                        totalForms: res.data[0].totalForms,
                        pendingForms: res.data[0].pendingForms,
                        approvedForms: res.data[0].approvedForms
                    })
                }
                console.log("res", res)
            }catch(err){
                throw err;
            }
        }

        fetchDashboardData();
    },[])

    return (
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
    );
}