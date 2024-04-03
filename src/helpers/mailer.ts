import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // configaration email
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpire: Date.now() + 3600000, // expire  after one hour
        },
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c0f8663bbab573", // not correct
        pass: "7aeb690e9f70b6", // not correct
      },
    });

    const mailOption = {
      from: "arun",
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "verify Your Email" : "Reset Your  Password",
      text: `Hello world?`, // plain text body
      html: `<p> Click <a> href="${
        process.env.DOMAIN
      }verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy paste the link below in your browser.<br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`, // HTML body
    };

    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error) {
    console.log("Error creating the Transporter");
    return error;
  }
};
