import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const DashboardPageWrapper = ({
    className,
    children
}: {
    className?: string
    children: ReactNode
}) => {
    return(
        <div className={cn("max-w-[1280px] mx-auto", className)}>
            {children}
        </div>
    )
    
}

export default DashboardPageWrapper;