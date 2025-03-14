'use-client'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from "next/image"

import 'react-phone-number-input/style.css'

 import PhoneInput, { Value } from 'react-phone-number-input'
 import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"


interface CustomProps{
    control:Control<any>,
    fieldType:FormFieldType,
    name:string,
    label?:string,
    placeholder?:string,
    iconSrc?:string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?:(field:any) => React.ReactNode,
}

const RenderField=(
  {field,props} : {field:any; props:CustomProps}
)=>{
  const {fieldType,iconSrc,iconAlt,placeholder,showTimeSelect,
    dateFormat,renderSkeleton} = props;
  
  
        switch(fieldType) {
          case FormFieldType.INPUT:
            return(
              <div className=" flex rounded-md border border-blue-950 bg-black
              ">
                {
                  iconSrc && (
                    <Image
                    src = {iconSrc}
                    height={24}
                    width={24}
                    alt={iconAlt || 'icon' }
                    className="ml-2"
                    />
                  )
                }
                <FormControl>
                  <Input
                  placeholder={placeholder}
                  {...field}
                  className="border-0 bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 !important"
                  />
                  </FormControl>

              </div>
            )
          
            case FormFieldType.TEXTAREA:
              return (
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    {...field}
                    className="bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
                    disabled={props.disabled}
                  />
                </FormControl>
              );
          
          case FormFieldType.PHONE_INPUT:
            return(
              <FormControl>
                 <PhoneInput
                  placeholder={placeholder }
                  international
                  withCountryCallingCode
                  value={field.value as E164Number
                     | undefined}
                  onChange ={field.onChange}
                  className=" mt-2 h-11 rounded-md px-3 text-sm border bg-dark-400 placeholder:text-dark-600 border-dark-500 !important
                    "
                 
                  defaultCountry="US"             />
              
              </FormControl>
            )
            case FormFieldType.DATE_PICKER:
              return(
                <div className="flex rounded-md borde border-black">
                  <Image
                  src="/assets/icons/calender.svg"
                  height={24}
                  width={24}
                  alt="calender"
                  className="ml-2"
                  />
                  <FormControl>
                  <DatePicker
                    selected={field.value}
                  
                    onChange={(date) => field.onChange(date)} //only when value has changed
                    dateFormat={dateFormat ?? 'MM/dd/yyyy'}    
                    showTimeSelect={showTimeSelect ?? false}
                    timeInputLabel="Time"
                    wrapperClassName="overflow-hidden border-transparent w-full placeholder:text-dark-600  h-11 text-14-medium rounded-md px-3 outline-none "             
                  
                  />
               </FormControl>
                </div>
              )
            case FormFieldType.SELECT:
              return(
                <FormControl >
                  <Select onValueChange={field.onChange}
                  defaultValue={field.value} >
                  <FormControl>
                         <SelectValue placeholder={placeholder} />
                   </FormControl>
                <SelectTrigger  className="bg-dark-400  placeholder:text-dark-600 border-dark-500 h-11 focus:ring-0 focus:ring-offset-0">
                    <SelectContent className="bg-dark-400 border-dark-500 ">
                        {props.children}
                      </SelectContent>
                </SelectTrigger>
                
                    </Select>
              </FormControl>
              )

              
              
              case FormFieldType.SKELETON:
                return renderSkeleton ? renderSkeleton(field) : null
           
               default:
              break;
        }
  
    
    
}

const CustomFormField = (props:CustomProps) => {
  const {control,fieldType,name,label} = props;
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
    
      <FormItem className="flex-1">
      {fieldType !== FormFieldType.CHECKBOX && label &&(
        <FormLabel>{label}</FormLabel>
      )}

      <RenderField  field={field}
      props={props}
      />
      <FormMessage className="text-red-400 !important " />
      </FormItem>
    )}
  />
  )
}

export default CustomFormField