import nodemailer from 'nodemailer';
import 'colors'
export const sendMail = async (otp, email) => {
    try {
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD 
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL, 
            to: email, 
            subject: 'Reset Password OTP',
            html:  `<div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333;">Reset Password</h2>
            <p>Your OTP is:</p>
            <div style="font-size: 20px; font-weight: bold; color: #ff5722; background-color: #e0f7fa; padding: 10px; border-radius: 5px; display: inline-block;">
              ${otp}
            </div>
          </div>` 
        };

        
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email} by ${process.env.EMAIL} ${info.response}`.bgMagenta.white);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};
