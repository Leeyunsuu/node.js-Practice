var args = process.argv;
console.log(args[2]);
console.log('A');
console.log('B');
if (args[2] === 'yunsuten') {
	//'true'면 if 실행, 'false'면 else실행
	//args[2]가 'yunsuteng'일 경우
	console.log('C1');
} else {
	//args[2]가 'yunsuteng'가 아닐 경우
	console.log('C2');
}
console.log('D');
