import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/utils/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/state/userSlice";
import { toast } from "sonner";


type SignInForm = {
    email: string;
}


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SignInForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

            if(res.data.length){
                const user = res.data[0];
                dispatch(setUser({ role: user.role, name: user.name }));
                navigate("/dashboard");
                
            }else{
                toast.error("invalid user credentials")
            }
        }catch(err){
            throw err;
        }
    }

    return (
        <Card className="w-[450px] p-7">
        <CardHeader>
            <CardTitle className="font-bold text-3xl">Sign in to your account</CardTitle>
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
                            <FormMessage className="text-red-400"/>
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