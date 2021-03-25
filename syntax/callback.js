let a = () => {
	console.log('A');
};

function slowfunc(callback) {
	callback();
}
slowfunc(a);
