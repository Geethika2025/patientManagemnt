
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import CustomFormField from "../CustomFormField"

import {
  Form,} from  "@/components/ui/form"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"

import {useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType{
  INPUT ='input',
  TEXTAREA ='textarea',
  PHONE_INPUT='phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON='skeleton',


}

const PatientForm =() => {
  const router= useRouter();
  const [isLoading,setIsLoading] = useState(false)


  // 1. Define your form.
  const form = useForm<z.infer<typeof  UserFormValidation
  
  >>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })

  // 2. Define a submit handler.
  type UserFormValues = z.infer<typeof UserFormValidation>;
  async function onSubmit({ name, email, phone }: UserFormValues) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
  
      const user = await createUser(userData);
  
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      } else {
        console.log("User creation failed:", user);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  //   console.log(values)
  // }

  return (
    
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-1">
          <h1 className="text-32-bold md:text-36-bold">Hi there</h1>
          <p className="text-white"> Schedule your first appoinment</p>
        </section>
        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />

      <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="email"
        placeholder="johndoe@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />
        <CustomFormField 
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="phone"
        placeholder="(555) 123-4567"
       
        />
        
       
        {/* <Button type="submit">Submit</Button> */}
        <SubmitButton
         isLoading={isLoading}
        >
          Get Started
          </SubmitButton>
      </form>
    </Form>
    
  )
}

export default PatientForm
