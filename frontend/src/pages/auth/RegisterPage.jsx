import React from 'react'
import { RegisterForm } from '../../components/auth/RegisterForm'

export const RegisterPage = () => {
  return (
    <>
         <div className="min-h-screen flex flex-col items-center justify-center">
           <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20" />
             <div className="z-10 w-full max-w-md px-4">
               <div className="mb-8 text-center">
                 <h1 className="text-3xl font-bold text-foreground">Join us today</h1>
                 <p>Craete an account in just a few steps</p>
               </div>
               {/* Registeration form */}
               <RegisterForm />
             </div>
         </div>
       </>
  )
}
