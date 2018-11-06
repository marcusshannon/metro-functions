'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToSheets = undefined;

var _googleapis = require('googleapis');

const sheets = _googleapis.google.sheets('v4');
const OAuth2 = _googleapis.google.auth.OAuth2;
const oauth2Client = new OAuth2('1079224192474-5abukf06vslq01reevm3g8uuo0f14h69.apps.googleusercontent.com', 'kmcMPjz6f5FYwwh9bPGfMiI5');
oauth2Client.setCredentials({
  refresh_token: '1/RqTZB_2lCThbczIAOhnBG-RQxWATq39TTH0nJuc8lN9nKfyvQrjLbwbdkdBzfUkc'
});

const uploadToSheets = exports.uploadToSheets = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'POST').set('Access-Control-Allow-Headers', 'Content-Type').sendStatus(200);
    return;
  }
  const request = {
    auth: oauth2Client,
    spreadsheetId: '1i_p3UkMb09BcgOdmyILyWcgoHZ5sJhx4sJlMdJrHLzI',
    resource: {
      requests: [{
        insertDimension: {
          range: {
            sheetId: 0,
            dimension: 'ROWS',
            startIndex: 0,
            endIndex: 1
          },
          inheritFromBefore: false
        }
      }, {
        updateCells: {
          rows: [{
            values: req.body.map(cell => ({
              userEnteredValue: { stringValue: cell }
            }))
          }],
          fields: '*',
          start: {
            sheetId: 0,
            rowIndex: 0,
            columnIndex: 0
          }
        }
      }]
    }
  };

  oauth2Client.refreshAccessToken(() => {
    sheets.spreadsheets.batchUpdate(request, () => res.set('Access-Control-Allow-Origin', '*').sendStatus(200));
  });
};