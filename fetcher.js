const fs = require('fs');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = process.argv[2];
const filePath = process.argv[3];



const makeFile = function() {
  request(server, (error, response, body) => {
    if (error) {
      console.log('URL INVALID');
      console.log(error);
      process.exit();
    }
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.log('INVALID PATH');
        console.error(err);
        process.exit();
      }
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log(`File doesn't exist.`);
        } else {
          console.log(`Downnloaded and saved ${stats.size} bytes to ${filePath}`);
        }
        process.exit();
      });
    });

  });
};


//check if file exists //await access
fs.exists(filePath, (exists) => {
  if (exists) {
    rl.question("File already exists do you want to overwrite. enter Y to overwrite: ", (value) => {
      if (value === 'Y') {
        makeFile();
      } else {
        process.exit();
      }
    });
  } else {
    makeFile();
  }
});

