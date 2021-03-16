var http = require('http');
var fs = require('fs');
var url = require('url');
const testFolder = './data';

var app = http.createServer((request, response) => {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
	var title = queryData.id; //http://localhost:3000/?id=ㅁㅁㅁ,	만약 id가 아닌 name이라면 name으로 입력
	// console.log(url.parse(_url, true));
	// console.log(request.url);
	if (pathname === '/') {
		if (queryData.id === undefined) {
			title = 'Welcome';
			let description = 'Hello, Node.js ^^'; //서버시작 후, description에 본문 생성.
			fs.readdir('./data', (err, files) => {
				let i = 0;
				let lists = '<ul>';
				// console.log(files);
				while (i < 3) {
					let filelist = files[i];
					// console.log(filelist);
					lists = lists + `<li><a href="/?id=${filelist}">${filelist}</a></li>`; //반복 할 때 마다 전에 할당한 <li>를 재할당
					i = i + 1;
				}
				lists = lists + '</ul>';
				var template = `
			<!doctype html>
		<html>
		<head>
			<title>WEB1 - ${title}</title>
			<meta charset="utf-8">
		</head>
		<body>
			<h1><a href="/?id=WEB">WEB</a></h1>
				${lists}
			<h2>${title}</h2>
			<p>${description}
			</p>
			</body>
			</html>
			`;
				response.writeHead(200);
				response.end(template);
			});
		} else {
			fs.readdir('./data', (err, files) => {
				let i = 0;
				let lists = '<ul>';
				// console.log(files);
				while (i < 3) {
					let filelist = files[i];
					// console.log(filelist);
					lists = lists + `<li><a href="/?id=${filelist}">${filelist}</a></li>`; //반복 할 때 마다 전에 할당한 <li>를 재할당
					i = i + 1;
				}
				lists = lists + '</ul>';
				fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
					//queryData.id와 일치하는 변수 파일
					var template = `
						<!doctype html>
						<html>
						<head>
						<title>WEB1 - ${title}</title>
						<meta charset="utf-8">
						</head>
						<body>
						<h1><a href="/?id=WEB">WEB</a></h1>
						${lists}
						<h2>${title}</h2>
						<p>${description}
						</p>
						</body>
						</html>
					`;
					response.writeHead(200);
					response.end(template);
				}); //queryData.id로 data폴더 하위 파일을 읽어옴.
			});
		}
	} else {
		response.writeHead(404);
		response.end('404 Not found');
	}
});
app.listen(3000);
