import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  // Get the request body data from json
  const { email, name, message } = await request.json();

  // Create a transport object using gmail as the service
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  // Create the email options from my email to my email
  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  // Promise the sendMail function, if sent, return success message. If not, return error message.
  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    // Await the promise and return the success message
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    // Catch any error
    return NextResponse.json({ error: err }, { status: 500 });
  }
}