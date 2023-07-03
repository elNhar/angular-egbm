/* tslint:disable */
// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
    writeFile(targetPath, environmentFileContent, function (err) {
        if (err) {
            console.log(err);
        }
        if (environmentFileContent !== '') {
            console.log(`wrote variables to ${targetPath}`);
        }
    });
}

// Providing path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
    mkdirSync(envDirectory);
}

//creates the `environment.development.ts` and `environment.ts` file if it does not exist
writeFileUsingFS('./src/environments/environment.ts', '');

// Checks whether command line argument of `development` was not provided signifying production mode
const isProduction = environment !== 'dev';

// choose the correct targetPath based on the environment chosen
const targetPath = './src/environments/environment.ts';

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
  // This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
  export const environment = {
    production: ${isProduction},
    SPACE: '${process.env.SPACE}',
    TOKEN: '${process.env.TOKEN}',
    CAPTCHA: '${process.env.CAPTCHA}',
    EMAILJS_SERVICE_ID: '${process.env.EMAILJS_SERVICE_ID}',
    EMAILJS_TEMPLATE_ID: '${process.env.EMAILJS_TEMPLATE_ID}',
    EMAILJS_PUBLIC_KEY: '${process.env.EMAILJS_PUBLIC_KEY}',
    EMAILJS_ADVENTURE_ID: '${process.env.EMAILJS_ADVENTURE_ID}'
  };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* tslint:enable */
