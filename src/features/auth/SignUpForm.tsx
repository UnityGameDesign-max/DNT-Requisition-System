import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function SignUpForm() {


  return (
    <Card className="w-[450px] p-7">
        <CardHeader>
            <CardTitle className="font-bold text-3xl">Create a new account</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Create a user to the DNT Requistion System</CardDescription>
        </CardHeader>
        <form>
        <div className="grid w-full items-center gap-4">
           <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">email</Label>
                <Input id="email" placeholder="Email" />
           </div>
        </div>
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">name</Label>
                <Input id="name" placeholder="name"/>
            </div>
        </div>
        
        <Button
            type="submit"
            className="bg-primary text-white p-2 mt-4 w-full"
        >

        </Button>
        </form>
    </Card>
    
  );
}
