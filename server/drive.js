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
const fs = require('fs')

const parents = {}

const types = ["pdf","epub"];

async function load() {
  let res = await drive.files.list({
    kind: "drive#fileList",
    fields: '*'
  });
  
  let data = {}
  res.data.files.forEach(element => {
    if (types.includes(element.fileExtension)){
      let name = element.name.split("_").join(" ").replace("."+element.fileExtension,"")
      data[element.name] = {
        "name": name,
        "download": element.webViewLink,
        "image": element.thumbnailLink,
        "parents": element.parents
      };
    
    }
    
    
  });

  fs.writeFileSync("front/json/db.json",JSON.stringify(data,null,4))
}

load()