import { ID, Models, Query } from "node-appwrite"
import { users } from "../appwrite.config"

export const createUser=async (user:CreateUserParams) =>{
    try{
        const newUser=await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        return newUser;
    }
    catch (error:any){
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email',[user.email])
            ])

            return documents?.users[0]
        }
        console.error("Error creating user:", error);
        return null;

    }

};

export const getUser = async (userId:string) => {
    try{
        const user=await users.get(userId);

        //return parseStringify(user);
        return JSON.parse(JSON.stringify(user));

    }
    catch (error){
        console.log(error)
    }
}


