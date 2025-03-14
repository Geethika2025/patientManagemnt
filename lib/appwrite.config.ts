import * as sdk from 'node-appwrite';
export const {
    NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_DATABASE_ID,
    NEXT_PUBLIC_PATIENT_COLLECTION_ID, NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID:NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT:NEXT_PUBLIC_ENDPOINT
} = process.env;

// console.log("Project ID:",process.env.NEXT_PUBLIC_PROJECT_ID);
// console.log("API Key:", process.env.NEXT_PUBLIC_API_KEY ? "Exists" : "Not Set");
// console.log("Database ID:", process.env.NEXT_PUBLIC_DATABASE_ID);
// console.log("Patient Collection ID:", process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID);
// console.log("Endpoint:", process.env.NEXT_PUBLIC_ENDPOINT);


const client = new sdk.Client();

client
    .setEndpoint( process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject( process.env.NEXT_PUBLIC_PROJECT_ID!)
    .setKey( process.env.NEXT_PUBLIC_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage=new sdk.Storage(client);
export const message =new sdk.Storage(client);

export const users = new sdk.Users(client);

  console.log("Project ID:", process.env.NEXT_PUBLIC_PROJECT_ID);
 