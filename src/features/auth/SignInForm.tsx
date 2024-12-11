import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignInForm() {

    return (
        <Card className="w-[450px] p-7">
        <CardHeader>
            <CardTitle className="font-bold text-3xl">Sign in to your account</CardTitle>
            <Link
              className={buttonVariants({ 
                variant: "link",
                size: 'lg',
                className: 'text-customTheme-primary gap-1.5',
            })}
              to="/signup"
            >
                Don't have any account?
                <ArrowRight className="h-4 w-4"/>
            </Link>
        </CardHeader>
        <form>
            <div className="grid items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Input id="email" placeholder="Email" />
                </div>
            </div>
        <Button
            type="submit"
            className="bg-customTheme-secondary text-white p-2 mt-4 w-full"
        >
            Sign In
        </Button>
        </form>
    </Card>
    )
}