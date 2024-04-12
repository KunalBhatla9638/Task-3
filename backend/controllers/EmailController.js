const nodemailer = require("nodemailer");
const path = require("path");

// const transporter = nodemailer.createTransport({
//   //   host: process.env.SMTP_HOST,
//   //   port: process.env.SMTP_PORT,
//   //   secure: false,
//   service: "gmail",
//   auth: {
//     user: process.env.SMTP_MAIL,
//     pass: process.env.SMTP_PASS,
//   },
// });

// const emailHandler = async (req, res) => {
//   try {
// const { email, title } = req.body;
// const uploadedFile = req.file;
//     let mailOption = {
//       from: process.env.SMTP_MAIL,
//       to: email,
//       subject: title,
//       attachments: [
//         {
//           filename: uploadedFile.originalname, // Name of the attached file
//           path: path.join(__dirname, "../../", uploadedFile.path),
//         },
//       ],
//     };

//     console.log(
//       path.join(
//         `C:\Users\Asus\Desktop\SEQUEL\Task-3\backend\public\assets`,
//         uploadedFile.path
//       )
//     );

//     // console.log(path.join(path.resolve(), "public/assets"));

//     transporter.sendMail(mailOption, (error, info) => {
//       if (error) {
//         return res.status(500).json({
//           error: "Error while creating the email",
//           msg: error.message,
//         });
//       }
//       return res.status(200).json({ status: "successfully send" });
//     });
//   } catch (error) {
//     res.status(500).json({ message: "error", error });
//   }
// };

const emailHandler = (req, res) => {
  const { email, title } = req.body;
  const uploadedFile = req.file;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  let mailDetails = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: title,
    attachments: [
      {
        filename: uploadedFile.originalname,
        // path: path.join(__dirname, "../../", uploadedFile.path),
        path: uploadedFile.path,
        // content: uploadedFile.buffer,
      },
    ],
  };

  transporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs:", err);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ status: "Email Send successfully" });
    }
  });
};

module.exports = {
  emailHandler,
};
