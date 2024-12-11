import { Button, buttonVariants } from "@/components/ui/button";
import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


export default function SignUpForm() {


  return (
    <Card className="w-[450px] p-7">
        <CardHeader>
            <CardTitle className="font-bold text-3xl">Create a new account</CardTitle>
            <Link
              className={buttonVariants({ 
                variant: "link",
                size: 'lg',
                className: 'text-customTheme-primary gap-1.5',
            })}
              to="/signin"
            >
                Already have an account? Sign-in
                <ArrowRight className="h-4 w-4"/>
            </Link>
        </CardHeader>
        <form>
            <div className="flex items-center gap-4 mb-4">
                <div className="flex text-left flex-col">
                    <Input id="name" placeholder="name"/>
                </div>
                <div className="flex flex-col">
                    <Input id="surname" placeholder="surname"/>
                </div>
            </div>
            <div className="grid items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Input id="email" placeholder="Email" />
                </div>
            </div>
        <Button
            type="submit"
            className="bg-customTheme-secondary text-white p-2 mt-4 w-full"
        >
            Sign Up
        </Button>
        </form>
    </Card>
  );
}
