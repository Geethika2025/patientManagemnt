import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image'
import Link from "next/link";


const Register = async({params:{userId}}: SearchParamProps) => {
    const user =await getUser(userId);
  return (
    
    <div className="flex h-screen max-h-screen">
  
   
      <div className="w-full h-full my-auto flex flex-col items-center justify-center gap-10 ">
        <Image
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit" 
        
        />

        <RegisterForm user={user}/>
    
        <div className="flex w-[50%]  justify-around ">
        <p className=" text-sm ">
        All rights reserved &#xA9; 2024 MyCompany.
        </p>
        <Link
        href="/?admin=true" className="text-green-500"
        >
        
        Admin</Link>
        </div>
      </div>
    
    <Image
    src="/assets/images/register-img.png"
    height={1000}
        width={1000}
        alt="patient"
        className="max-w-[50%] hidden h-full object-cover md:block"
    />
  </div>
  )
}

export default Register