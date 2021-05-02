var http = require('http');
var url = require('url');

var Webpage = http.createServer(function (request, response) {
	var URL = request.url;
	console.log(url.parse(URL, true)); //url의 분석 된 속성을 출력
	var pathname = url.parse(URL, true).pathname; //분석 된 url중 pathname만 꺼내어 선언

	if (pathname == '/') {
		//선언 된 pathname이 아무것도 없을 경우
		response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		response.end('안녕하세요, 현재 서버가 구동중입니다.');
	} else if (pathname == '/id=node.js') {
		//선언 된 pathname이 id=node.js일 경우
		response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		response.end('안녕하세요? node.js입니다.');
	} else {
		//조건문에 제시 된 pathname이 전부 아닌 pathame일 경우
		response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
		response.end('파일이 없습니다.');
	}
});

Webpage.listen(80, function () {
	console.log('Sever On...');
});
