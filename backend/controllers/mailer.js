import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { EMAIL, PASSWORD } from "../utils/env.js";

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let messages = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "User Account created successfully.",
    html: "<b>User Account created successfully.</b>",
  };

  transporter
    .sendMail(messages)
    .then((info) => {
      return res.status(201).json({
        message: "You have received an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const emailOTP = async (email, otp) => {
  if (!email) {
    throw new Error("Email is required");
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      name: "Abhishek Here!!",
      intro: "Your OTP code ",
      table: {
        data: [
          {
            item: " OTP code send successfully",
            description: "Sending OTP Code through backend application",
          },
        ],
      },
      outro: `Use this OTP code : ${otp}`,
    },
  };

  let mail = MailGenerator.generate(response);

  let messages = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Code",
    html: mail,
  };

  try {
    await transporter.sendMail(messages);
    return "successfully OTP send on mail";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

// const emailOTPLogin = async (email, otp) => {
//   // Create a Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: EMAIL,
//       pass: PASSWORD,
//     },
//   });

//   // Create a Mailgen instance
//   const mailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Your App Name",
//       link: "https://yourapp.com",
//       // Add any other product details as needed
//     },
//   });

//   // Generate the email body using Mailgen
//   const emailContent = {
//     body: {
//       name: "User", // Change as needed
//       intro: "Your OTP code:",
//       outro: `Use this OTP code: ${otp}`,
//     },
//   };

//   // Generate the HTML email
//   const emailTemplate = mailGenerator.generate(emailContent);

//   // Define email options
//   const mailOptions = {
//     from: EMAIL,
//     to: email,
//     subject: "OTP Verification",
//     html: emailTemplate,
//   };

//   // Send the email
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("OTP email sent successfully");
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//     throw new Error("Failed to send OTP email");
//   }
// };

// const emailOTPLogin = async (email, otp) => {
//   if (!email) {
//     throw new Error("Email is required");
//   }

//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: EMAIL,
//       pass: PASSWORD,
//     },
//   });

//   let MailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Mailgen",
//       link: "https://mailgen.js",
//     },
//   });

//   let response = {
//     body: {
//       name: "Abhishek Sah Here!!",
//       intro: "Your Login OTP code",
//       table: {
//         data: [
//           {
//             item: "Login OTP code send successfully",
//             description: "Sending OTP Code through backend application",
//           },
//         ],
//       },
//       outro: `Use this OTP code for Login: ${otp}`,
//     },
//   };

//   let mail = MailGenerator.generate(response);

//   let messages = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: "Login OTP Code",
//     html: mail,
//   };

//   try {
//     await transporter.sendMail(messages);
//     return "successfully Login OTP send on mail";
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to send email");
//   }
// };

export { sendEmail, emailOTP };
