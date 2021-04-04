// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
import { google } from 'googleapis';

export const sendEmail = async (
  receiverEmail: string,
  subject: string,
  text: string,
  html: string,
) => {
  try {
    const {
      oAuth2Client,
      CLIENT_ID,
      CLIENT_SECRET,
      REFRESH_TOKEN,
      SENDER_EMAIL,
    } = setupEmailConfig();
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOption = {
      from: SENDER_EMAIL,
      to: receiverEmail,
      subject: subject,
      text: text,
      html: html,
    };
    const result = await transporter.sendMail(mailOption);
    return result;
  } catch (error) {
    return error;
  }
};
function setupEmailConfig() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  const SENDER_EMAIL = process.env.SENDER_EMAIL;

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
  );
  oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  return {
    oAuth2Client,
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    SENDER_EMAIL,
  };
}
