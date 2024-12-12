import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import DashboardPageWrapper from "./dashboardPageWrapper";

type ProfileDetails = {
    name: string;
    initials: string;
    role: string;
}

export const Header = ({ name, initials, role }: ProfileDetails) => {
    const location = useLocation();
  
    const titles: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/signup": "Sign Up",
      "/signin": "Sign In",
    };
  
    const title = titles[location.pathname] || "New Dawn Requisition";
  
    return (
    <DashboardPageWrapper>
        <header className="p-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex">
                <Avatar className="bg-white">
                    <AvatarFallback 
                        className="text-customTheme-primary font-bold"
                    >{initials}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                    <p className="text-lg font-semibold text-customTheme-primary">{name}</p>
                    <p className="text-sm text-customTheme-secondary">{role}</p>
                </div>
            </div>
      </header>

    </DashboardPageWrapper>
    
    );
  };