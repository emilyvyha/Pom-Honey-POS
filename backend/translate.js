const { generateRequestUrl, normaliseResponse } = require('google-translate-api-browser');
const https = require('https');

const url = generateRequestUrl('Je ne mangé pas six jours', { to: "en" });

https.get(url, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log(normaliseResponse(JSON.parse(data)));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});