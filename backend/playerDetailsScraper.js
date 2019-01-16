const https = require("https");
const fs = require("fs");

const playerId = [625383, 326016, 28081, 28235, 253802, 931581, 290630, 924355, 30045, 279810,
26907, 33141, 471342, 625371, 290716, 559235, 376116, 31107, 430246, 234675, 422108, 236779,
452044, 31820, 227712, 446507, 277916, 326017, 481896]

const scrape = async () => {
  const promiseList = await playerId.map(async pid => {
    return new Promise((resolve, reject) => {
      const options = {
        host: 'cricapi.com',
        path: `/api/playerStats?pid=${pid}&apikey=pC0R2KYMfRMjEUzpmB4orLEGO1b2`,
        method: 'GET'
      };
      const request = https.request(options, response => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      request.end();
    });
  });

  const results = await Promise.all(promiseList);
  const modifiedResults = await results.map(result => {
    if(!result.data.bowling["ODIs"]) {
      return;
    }
    const newObj = {
      name: result.name,
      currentAge: result.currentAge,
      formatsPlayed: Object.keys(result.data.bowling).length,
      playingRole: result.playingRole,
      bowlingAve: result.data.bowling["ODIs"]["Ave"],
      battingAve: result.data.batting["ODIs"]["Ave"],
      matches: result.data.batting["ODIs"]["Mat"]
    };

    return newObj;
  });

  const filteredResults = await modifiedResults.filter(e => {
    if(!e)
      return false;
    return true;
  })
  fs.writeFileSync('backend/data files/scrapeNew.json', JSON.stringify(filteredResults, null, '\t'));
};

scrape();
