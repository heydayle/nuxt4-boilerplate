import { google } from 'googleapis';

let sheetRange = "Genegal!A2:E15";

export default defineEventHandler(async (event) => {
    const CLIENT_ID = process.env.GG_CLIENT_ID;
    const SECRET_ID = process.env.GG_SECRET_ID;
    const SPREAD_SHEET_ID = process.env.SPREAD_SHEET_ID;
    const body = await readBody(event);
    const credentials = JSON.parse(body.credentials);

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      SECRET_ID,
    )
    const scpopes = <string[]>[
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.appfolder',
      'https://www.googleapis.com/auth/drive.file',]

    oauth2Client.setCredentials({ ...credentials, scope: credentials.scope + ' ' + scpopes.join(' ') });

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREAD_SHEET_ID,
      range: sheetRange,
    })
    
    return {
      response: response
    }
  })