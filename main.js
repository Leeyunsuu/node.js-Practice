var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
const dataList = './data';

function templateHTML(title, lists, body, control) {
	return `<!doctype html>
		<html>
		<head>
			<title>WEB1 - ${title}</title>
			<meta charset="utf-8">
		</head>
		<body>
			<h1><a href="/">WEB</a></h1>
				${lists}
				${control}
				${body}
		</body>
		</html>
	`;
}

function FileList(files) {
	let i = 0;
	var lists = '<ul>'; // console.log(files);
	while (i < dataList.length) {
		let filelist = files[i]; // console.log(filelist);
		lists = lists + `<li><a href="/?id=${filelist}">${filelist}</a></li>`; //반복 할 때 마다 전에 할당한 <li>를 재할당
		i = i + 1;
	}
	lists = lists + '</ul>';
	return lists;
}

var app = http.createServer((request, response) => {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
	// console.log(url.parse(_url, true));
	// console.log(request.url);
	// console.log(pathname);
	if (pathname === '/') {
		if (queryData.id === undefined) {
			let title = 'Welcome';
			var description = 'Hello, Node.js ^^'; //서버시작 후, description에 본문 생성.
			fs.readdir('./data', (err, files) => {
				let lists = FileList(files);
				let template = templateHTML(
					title,
					lists,
					`<h2>${title}</h2><p>${description}</p>`,
					`<a href="/create">Create</a>`,
				);
				response.writeHead(200);
				response.end(template);
			});
		} else {
			fs.readdir('./data', (err, files) => {
				let lists = FileList(files);
				fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
					//queryData.id와 일치하는 변수 파일
					let title = queryData.id; //http://localhost:3000/?id=ㅁㅁㅁ,	만약 id가 아닌 name이라면 name으로 입력
					console.log(title);
					let template = templateHTML(
						title,
						lists,
						`<h2>${title}</h2><p>${description}</p>`,
						`<a href="/create">Create</a> <a href="/update?id=${title}">Update</a>`,
					);
					response.writeHead(200);
					response.end(template);
				}); //queryData.id로 data폴더 하위 파일 read
			});
		}
	} else if (pathname === '/create') {
		fs.readdir('./data', (err, files) => {
			//./data/파일 목록 호출
			let title = 'Edit';
			let lists = FileList(files);
			let template = templateHTML(
				title,
				lists,
				`<form action="/create_process" method="post">
				<p><input type="text" name="title" placeholder="title"/></p>
				<p><textarea name="description" placeholder="description"></textarea></p>
				<p><input type="submit" /></p>
				</form>
				`, //title, description post형식으로 전송
				`<a href="/create">Create</a>`,
			);
			response.writeHead(200);
			response.end(template);
		});
	} else if (pathname === '/create_process') {
		let body = '';
		request.on('data', (data) => {
			body += data;
		});
		request.on('end', () => {
			// let post = qs.parse(body);
			let title = post.title;
			let description = post.description;
			fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
				response.writeHead(302, { Location: `/?id=${title}` });
				response.end();
			});
			// console.log(post);
		});
	} else if (pathname === '/update') {
		fs.readdir('./data', (err, files) => {
			let lists = FileList(files);
			fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
				//queryData.id와 일치하는 변수 파일
				let title = queryData.id; //만약 id가 아닌 name이라면 name으로 입력
				console.log(queryData.id);
				let template = templateHTML(
					title,
					lists,
					`<form action="/update_process" method="post">
				<p><input type="hidden" name="id" value=${title}></p>
				<p><input type="text" name="title" placeholder="title" value=${title}></p>
				<p><textarea name="description" placeholder="description">${description}</textarea></p>
				<p><input type="submit" /></p>
				</form>
				`,
					`<a href="/create">Create</a> <a href="/update?id=${title}">Update</a>`,
				);
				response.writeHead(200);
				response.end(template);
			}); //queryData.id로 data폴더 하위 파일 read
		});
	} else if (pathname === '/update_process') {
		response.writeHead(200);
		response.end('SUCCES');
	} else {
		response.writeHead(404);
		response.end('404 Not found');
	}
});
app.listen(3000);
