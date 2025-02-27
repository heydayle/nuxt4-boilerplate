import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
    const CLIENT_ID = process.env.GG_CLIENT_ID;
    const SECRET_ID = process.env.GG_SECRET_ID;
    const SPREAD_SHEET_ID = process.env.SPREAD_SHEET_ID;
    const body = await readBody(event);
    const credentials = JSON.parse(body.credentials);
    const sheetId = body.sheetId;

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      SECRET_ID,
    )

    oauth2Client.setCredentials(credentials);

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client })
    // const drive = google.drive({ version: 'v3', auth: oauth2Client })

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: SPREAD_SHEET_ID,
      ranges: ['!A2:E15'],
    })

    const getActiveSheet = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    })
    
    // const responseList = await drive.files.list({
    //   q: "mimeType='application/vnd.google-apps.spreadsheet'",
    //   fields: 'files(id, name)',
    //   corpus: 'user',
    // })
    // console.log(responseList.data.files);
    
    // const response = await drive.files.export({
    //   fileId: FILE_ID,
    //   mimeType: 'application/vnd.google-apps.spreadsheet',
    // })
    // console.log(getActiveSheet.data);
    

    return {
      response: getActiveSheet
    }
  })