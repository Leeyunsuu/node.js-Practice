var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer((request, response) => {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
	var title = queryData.id; //http://localhost:3000/?id=ㅁㅁㅁ,	만약 id가 아닌 name이라면 name으로 입력
	console.log(url.parse(_url, true));
	// if (queryData.id == 'WEB') {
	// 	title = 'Welcome';
	// 	queryData.id = 'WEB'; //서버시작 후, description에 본문 생성.
	// }
	// if (_url == '/favicon.ico') {
	// 	response.writeHead(404);
	// 	response.end();
	// 	return;
	// }
	if (pathname === '/') {
		title = 'Welcome';
		queryData.id = 'WEB'; //서버시작 후, description에 본문 생성.
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
		<ul>
			<li><a href="/?id=HTML">HTML</a></li>
			<li><a href="/?id=CSS">CSS</a></li>
			<li><a href="/?id=JAVASCRIPT">JavaScript</a></li>
		</ul>
		<h2>${title}</h2>
		<p>${description}
		</p>
	</body>
	</html>
		`;
			response.writeHead(200);
			response.end(template);
		}); //queryData.id로 data폴더 하위 파일을 읽어옴.
	} else {
		response.writeHead(404);
		response.end('404 Not found');
	}
});
app.listen(3000);
