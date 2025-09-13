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
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router'
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' className='w-full cursor-pointer'>
      {pending ? ( <span className="flex items-center gap-2"><LoaderCircle /> L</span>) : ("Login")}
    </Button>
  )
}
export const LoginForm = () => {
    const navigate = useNavigate()
  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className='text-xl text-center'>Sign in</CardTitle>
        <CardDescription className='text-md text-center text-wrap' >Enter your credentials to sign in to your account</CardDescription>
      
      <form className="">
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">Email</div>
            <Input name="email" placeholder='johndoe@email.com' required />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-left">Password</div>
            <Input name="password" placeholder='********' required />
          </div>

        <div className="pb-6">
          <SubmitButton />
        </div>
        </CardContent>
        <CardFooter className='flex justify-center pt-0'>
          <div className="text-center text-sm">
            I don't have an account? <a onClick={() => navigate('/register')} className="text-primary hover:underline cursor-pointer">Create an account</a>
          </div>
        </CardFooter>
      </form>
      </CardHeader>
    </Card>
  );
};
