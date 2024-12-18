import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

type ProfileCredentials = {
    name: string;
    role: string;
}


export function Profile({name, role}: ProfileCredentials){

    return (
        <div className="flex gap-3">
            <Avatar className="bg-gray-100 text-customTheme-primary">
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-medium text-black">{name}</p>
                <p className="text-xs text-customTheme-secondary">{role}</p>
            </div>
        </div>
       
    )
}