module.exports = {
	HTML: function (title, lists, body, control) {
		return `<!doctype html>
		<html>
		<head>
			<title>WEB2 - ${title}</title>
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
	},
	list: function (files) {
		let i = 0;
		let lists = '<ul>'; // console.log(files);
		while (i < files.length) {
			lists = lists + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`; //반복 할 때 마다 전에 할당한 <li>를 재할당
			i = i + 1;
		}
		lists = lists + '</ul>';
		return lists;
	},
};
