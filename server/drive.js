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
    fields: '*',
    orderBy: 'createdTime desc'
  });
  
  let data = {}
  res.data.files.forEach(element => {
    console.log(element.fileExtension)
    if (types.includes(element.fileExtension)){
      console.log(element.name);
      let no_lines = element.name.split("_").join(" ").replace("."+element.fileExtension,"")
      let [name, author] = no_lines.split("-");
      data[element.name] = {
        "name": name,
        "author": author,
        "download": element.webViewLink,
        "image": element.thumbnailLink,
        "parents": element.parents
      };
    
    }
    
    
  });

  fs.writeFileSync("front/json/db.json",JSON.stringify(data,null,4))
}

exports.load = load