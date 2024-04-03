import bcryptjs  from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from  'jsonwebtoken';
connect();

export async function POST(request: NextRequest) {
  try {
    const reBody = await request.json();
    const { email, password } = reBody;

    console.log(reBody);
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 401 });
    }
    console.log("user exist");

    const validPassword = await bcryptjs.compare(password, user.password);
    // compare password
    if (!validPassword) {
      return new Response("Invalid Password", { status: 400 });
    }
    // create token and set it to cookie
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{ expiresIn: "1d"});

console.log("token nii a rha h ",token);

    const response = NextResponse.json({
        message:"Login Successfully!",
        success:true

    })

    response.cookies.set("token", token , {
        httpOnly : true,
      
    })
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error and  Please Try Again Later! unable to login" + error,
      },
      { status: 500 }
    );
  }
}
