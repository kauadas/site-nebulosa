const { google } = require('googleapis');
const credentials = require('./credentials.json');
const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file'
];
const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);
const drive = google.drive({ version: "v3", auth });


var files = [];
drive.files.list({
  pageSize: 1,
  fields: 'files(name, webViewLink)'
}, (err, res) => {
   files = res.data.files;

});

console.log(files)