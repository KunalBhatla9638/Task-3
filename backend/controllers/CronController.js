const { QueryTypes } = require("sequelize");
const nodemailer = require("nodemailer");
const sequelize = require("../utiles/database");
const cron = require("node-cron");

// const cronMail = async () => {
//   try {
//     // cron.schedule("* */1 * * *", async () => {
//     cron.schedule("*/10 * * * *", async () => {
//       const update = await sequelize.query(
//         "update email set countemail = countemail + 1",
//         {
//           type: QueryTypes.UPDATE,
//         }
//       );

//       if (!update) {
//         console.log("Error updating count in the database:");
//       }

//       try {
//         const [rows] = await sequelize.query("SELECT * FROM email", {
//           type: QueryTypes.SELECT,
//         });
//         console.log("Rows from the database:", rows);
//         if (rows) {
//           const count = rows.countemail;
//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: process.env.GMAIL_ID,
//               pass: process.env.GMAIL_PASSWORD,
//             },
//           });

//           const mailOptions = {
//             from: process.env.GMAIL_ID,
//             to: "kunallaptop72@gmail.com",
//             //   to: "gohob33265@kravify.com",
//             subject: `Kunal here`,
//             text: `You got ${count} time this email`,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error("Error sending email:", error);
//             } else {
//               console.log("Email sent:", info.response);
//             }
//           });
//         } else {
//           console.log("No rows returned from the database");
//         }
//       } catch (error) {
//         console.error("Error fetching count from the database:", error);
//       }
//     });
//     console.log("Cron job scheduled successfully");
//   } catch (error) {
//     console.error("Error scheduling cron job:", error);
//   }
// };

//2nd way
// const cronMail = async () => {
//   console.log("Entered");
//   try {
//     cron.schedule("* */10 * * *", async () => {
//       try {
//         const [updateResult] = await sequelize.query(
//           "UPDATE email SET countemail = countemail + 1",
//           {
//             type: QueryTypes.UPDATE,
//           }
//         );

//         if (!updateResult) {
//           console.log("Error updating count in the database");
//           return;
//         }

//         const rows = await sequelize.query("SELECT * FROM email", {
//           type: QueryTypes.SELECT,
//         });

//         if (!rows || rows.length === 0) {
//           console.log("No rows returned from the database");
//           return;
//         }

//         const count = rows[0].countemail;

//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.GMAIL_ID,
//             pass: process.env.GMAIL_PASSWORD,
//           },
//         });

//         const mailOptions = {
//           from: process.env.GMAIL_ID,
//           to: "kunallaptop72@gmail.com",
//           subject: `Kunal here`,
//           text: `You got ${count} time this email`,
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.error("Error sending email:", error);
//           } else {
//             console.log("Email sent:", info.response);
//           }
//         });
//       } catch (error) {
//         console.error("Error in cron job:", error);
//       }
//     });

//     console.log("Cron job scheduled successfully");
//   } catch (error) {
//     console.error("Error scheduling cron job:", error);
//   }
// };

// 3rdWay
cron.schedule("*/1 * * * *", function () {
  sendMail();
});

const sendMail = async () => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });
  let count;
  try {
    count = await sequelize.query("select countemail from email", {
      type: QueryTypes.SELECT,
    });

    console.log(count);
  } catch (err) {
    console.log(err.message);
  }

  let mailDetails = {
    from: process.env.SMTP_MAIL,
    to: "kunallaptop72@gmail.com",
    subject: "Email from cron",
    text: `You got ${count[0].countemail} time this email`,
  };

  mailTransporter.sendMail(mailDetails, async function (err, data) {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Email sent");

      try {
        await updateEmailCount();
      } catch (error) {
        console.log("Error while updating the count in table :", error.message);
      }
    }
  });
};

async function updateEmailCount() {
  try {
    await sequelize.query("UPDATE email SET countemail = countemail + 1", {
      type: QueryTypes.UPDATE,
    });
    console.log("Email count updated successfully");
  } catch (error) {
    throw error;
  }
}

// module.exports = cronMail;
