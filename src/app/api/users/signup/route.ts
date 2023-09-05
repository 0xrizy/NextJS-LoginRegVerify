import {connect} from "@/dbConfig/dbCondig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword =  await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
         

        ///send EMAIL/////////////////////////////////////////////

        await sendEmail({email, emailType:"VERIFY", userId:savedUser._id})
        console.log("singup/route.ts -> Email sent Successfully");
        

        return NextResponse.json({message: "User Created Successfully!",status:201, savedUser})
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:500})
        
    }
    
}


connect()