import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from  'bcryptjs';
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // validation of user detail
    console.log(reqBody);

    const user = await User.findOne({ email }); // check if the user already exists or not
    if (user) {
      return new Response("User Already Exists", { status: 409 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword })
    const savedUser = await newUser.save()
    console.log(savedUser);

    // send verification  mail to the registered user id
await sendEmail({email,emailTyp:"VERIFY", userId:savedUser._id})
return NextResponse.json({
    message: `A Verification Mail has been sent to your Email Address and User Registerd  Successfully`,

    success: true,
    savedUser
})

    return new Response("User Created Successfully", { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
