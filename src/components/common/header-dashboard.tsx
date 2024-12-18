import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import DashboardPageWrapper from "./dashboardPageWrapper";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel,
    DropdownMenuTrigger 
} from "../ui/dropdown-menu";

import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/state/userSlice";
import { Separator } from "../ui/separator";

type ProfileDetails = {
    name: string;
    initials: string;
    role: string;
}

export const Header = ({ name, initials, role }: ProfileDetails) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const titles: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/dashboard/requisition-creation": "Requisition Form",
      "/dashboard/add-approval": "Approvals"
    };

    const descriptions: Record<string, string> = {
        "/dashboard": "Overall summary of requisition forms",
        "/dashboard/requisition-creation": "Section for creating and managing requisition forms.",
        "/dashboard/add-approval": "Approve and reject requisition forms"
    }
  
    const title = titles[location.pathname] || "New Dawn Requisition";
    const description = descriptions[location.pathname]

    const signOut = () => {
        dispatch(logoutUser());
        navigate("/");
    }
  
    return (
    <DashboardPageWrapper>
        <header className="p-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-customTheme-muted text-sm">{description}</p>
            </div>
           
            <div className="flex">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="bg-white">
                            <AvatarFallback 
                                className="text-customTheme-primary font-bold"
                            >{initials}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                        <DropdownMenuLabel className="flex items-center gap-2">
                        <Avatar className="bg-gray-100 text-customTheme-primary">
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-base">{name}</h2>
                            <p className="text-xs text-customTheme-secondary">{role}</p>
                        </div>
                    </DropdownMenuLabel>

                    <Separator className="text-customTheme-muted my-2"/>

                    <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                        <LogOut className="w-4 h-4 mr-2 hover:bg-gray-100 text-customTheme-primary" />
                        Sign Out
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              
                <div className="ml-3">
                    <p className="text-lg font-semibold text-customTheme-primary">{name}</p>
                    <p className="text-sm text-customTheme-secondary">{role}</p>
                </div>
            </div>
      </header>

    </DashboardPageWrapper>
    
    );
  };