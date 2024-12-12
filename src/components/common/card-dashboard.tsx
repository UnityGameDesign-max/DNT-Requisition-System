import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export type CardProps = {
    label: string;
    icon: LucideIcon;
    amount: string;
    description: string;

}

export default function CardDashboard(props: CardProps){
    return(
        <CardContent>
            <section className="flex justify-between gap-2">
                <p className="text-sm">{props.label}</p>

                
            </section>

            <section className="flex items-center justify-between gap-1">
                <h2 className="text-2xl font-semibold">{props.amount}</h2>

                <div className="flex h-10 w-10 items-center justify-center rounded-[50px] bg-customTheme-primary/10">
                    <props.icon className="h-5 w-5 text-customTheme-primary" />
                </div>
            </section>
        </CardContent>
    )
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        {...props}
        className={cn(
          "flex w-full flex-col gap-3 rounded-xl border p-5 shadow bg-white",
          props.className
        )}
      />
    );
  }