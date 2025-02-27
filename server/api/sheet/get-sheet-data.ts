import { google } from 'googleapis';

let sheetRange = "Genegal!A2:E15";

export default defineEventHandler(async (event) => {
    const CLIENT_ID = process.env.GG_CLIENT_ID;
    const SECRET_ID = process.env.GG_SECRET_ID;
    
    const body = await readBody(event);
    const credentials = JSON.parse(body.credentials);
    const sheetId = body.sheetId;
    const range = `${body.range.title}!${body.range.start}:${body.range.end}`;

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      SECRET_ID,
    )

    oauth2Client.setCredentials({ ...credentials });

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    })
    
    return {
      response
    }
  })