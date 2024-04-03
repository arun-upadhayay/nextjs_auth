import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";


export const getDataFromToken  = (request:NextRequest) =>{

    try {
        
        // Get token from cookie.
        let token = request?.cookies?.get("token")?.value || "";
       const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET! )
        return decodedToken.id
    } catch (error:any) {
        throw new Error(error.massage);
    }
}
