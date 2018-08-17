const path = require('path');
const solc = require('solc');
//file system extra
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const passwordPath = path.resolve(__dirname, 'contracts', 'passwordManager.sol');
const source = fs.readFileSync(passwordPath, 'utf8');
const output = solc.compile(source, 1).contracts;

//creates build folder
fs.ensureDirSync(buildPath)
//iterates over both campaigns in the passwordManager.sol file
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + '.json'),
    output[contract]
  )
}
