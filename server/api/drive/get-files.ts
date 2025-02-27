import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
    const CLIENT_ID = process.env.GG_CLIENT_ID;
    const SECRET_ID = process.env.GG_SECRET_ID;
    const body = await readBody(event);
    
    const credentials = JSON.parse(body.credentials);
    const params = body.params;

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      SECRET_ID,
    )
    oauth2Client.setCredentials({ ...credentials });

    const drive = google.drive({ version: 'v3', auth: oauth2Client })
    
    const response = await drive.files.list({
      ...params
    })

    return response
  })