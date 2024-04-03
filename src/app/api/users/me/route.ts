import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  // exract data  from the request body
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  
  //    check if  there is a user with this id or not
  return NextResponse.json({
    status: "success",
    message: "User Found",
    data: user,
  });
}
