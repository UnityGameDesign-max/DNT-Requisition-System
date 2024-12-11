import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/utils/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


type SignInForm = {
    email: string;
}

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function SignInForm() {

    const form = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
        defaultValues: {
            email: ''
        }
    });
   
    const onSubmit = async (userData: TAuthCredentialsValidator) => {
        try{
            const res = await axios.get(`${API_BASE_URL}/users`, {
                params: {
                    email: userData.email
                }
            })

            console.log("res", res);
            if(res.data.length){
                const user = res.data[0];

                
            }else{
                
            }
            // if(res.data.length){
            //     const user = res.data[0];

            //     const token = jwt.sign(
            //         {
            //             id: user.id,
            //             email: user.email,
            //             role: user.role
            //         },
            //         SECRET_KEY,
            //         { expiresIn: "1h" }
            //     );

            //     localStorage.setItem("access_token", token)
            // }
        }catch(err){
            console.log("dddd")
        }
    }

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    id="email" 
                                    placeholder="Email"
                                    { ...field }
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="grid items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                       
                    </div>
                </div>
                <Button
                    type="submit"
                    className="bg-customTheme-secondary text-white p-2 mt-4 w-full"
                >
                    Sign In
                </Button>
            </form>
        </Form>
        
    </Card>
    )
}