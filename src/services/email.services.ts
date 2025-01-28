import { resend } from "@/utils/resend"

import { UserServices } from "./user.services"

export const EmailServices = {
    sendVerificationCode: async(userId: string, code: string) => {
    
        const user = await UserServices.findUser(userId);

        if(user){
            const {data, error} = await resend.emails.send({
                from: "Bitlearn <onboarding@resend.dev>",
                to: "mulya.mydev@gmail.com",
                subject: "Verify your account at Bitlearn LMS!",
                html: `<p>Click following link to verify <a href="http://localhost:3000/verify?user=${userId}&code=${code}">Verify My Account</a><p>`
            });

            console.log({data, error})
        }
        
    }
}