const { optimize } = require('optimize.lua');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const fs = require('fs');

const argv = yargs(hideBin(process.argv))
	.usage('Usage: $0 [input] [output]')
	.demandCommand(2).argv;
const input = argv['_'][0];
const output = argv['_'][1];

if (!fs.existsSync(input)) throw new Error('Input does not exist');

const inputString = fs.readFileSync(input, 'utf-8');
const outputString = optimize(inputString);

if (fs.existsSync(output)) fs.rmSync(output);

fs.writeFileSync(output, outputString);
