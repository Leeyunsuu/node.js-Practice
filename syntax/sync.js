const fs = require('fs');

// console.log('A');
// let sample = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(sample);
// console.log('C');

console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', (err, data) => {
	console.log(data);
});
console.log('C');
