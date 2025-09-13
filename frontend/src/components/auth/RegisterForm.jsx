import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'
import { useNavigate } from "react-router";
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' className='w-full cursor-pointer'>
      {pending ? ( <span className="flex items-center gap-2"><LoaderCircle /> Creating account....</span>) : ("Create Account")}
    </Button>
  )
}
export const RegisterForm = () => {
  const navigate = useNavigate();
  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className='text-xl text-center'>Create an account</CardTitle>
        <CardDescription className='text-md text-center' >Enter your details to register!</CardDescription>
      
      <form className="">
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">Full Name</div>
            <Input name="name" placeholder='John Doe' required />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">Email</div>
            <Input name="email" placeholder='johndoe@email.com' required />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">Password</div>
            <Input name="password" placeholder='********' required />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-left">Confirm Password</div>
            <Input name="confirmPassword" placeholder='********' required />
          </div>
        <div className="pb-6">
          <SubmitButton />
        </div>
        </CardContent>
        <CardFooter className='flex justify-center pt-0'>
          <div className="text-center text-sm">
            Already have an account? <a onClick={() => navigate('/login')} className="text-primary hover:underline cursor-pointer">Sign in</a>
          </div>
        </CardFooter>
      </form>
      </CardHeader>
    </Card>
  );
};
