import { google } from 'googleapis';
const sheets = google.sheets('v4');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  '1079224192474-5abukf06vslq01reevm3g8uuo0f14h69.apps.googleusercontent.com',
  'kmcMPjz6f5FYwwh9bPGfMiI5',
);
oauth2Client.setCredentials({
  refresh_token: '1/2gG_Dtbx3yE9Ct4dNVvOLGdzGc9dEUQ-6GuCTmsraTE',
});

export const uploadToSheets = (req, res) => {
  if (req.method === 'OPTIONS') {
    res
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .sendStatus(200);
    return;
  }
  const request = {
    auth: oauth2Client,
    spreadsheetId: '1i_p3UkMb09BcgOdmyILyWcgoHZ5sJhx4sJlMdJrHLzI',
    resource: {
      requests: [
        {
          insertDimension: {
            range: {
              sheetId: 177152709,
              dimension: 'ROWS',
              startIndex: 0,
              endIndex: 1,
            },
            inheritFromBefore: true,
          },
        },
        {
          updateCells: {
            rows: [
              {
                values: req.body.map(cell => ({
                  userEnteredValue: { stringValue: cell },
                })),
              },
            ],
            fields: '*',
            start: {
              sheetId: 0,
              rowIndex: 0,
              columnIndex: 0,
            },
          },
        },
      ],
    },
  };

  oauth2Client.refreshAccessToken(() => {
    sheets.spreadsheets.batchUpdate(request, () =>
      res.set('Access-Control-Allow-Origin', '*').sendStatus(200),
    );
  });
};
