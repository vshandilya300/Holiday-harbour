import http from 'https';


const options = {
	method: 'GET',
	hostname: 'hotels-com-free.p.rapidapi.com',
	port: null,
	path: '/suggest/v1.7/json?query=San%20Francisco&locale=en_US',
	headers: {
		'x-rapidapi-key': 'Sign Up for Key',
		'x-rapidapi-host': 'hotels-com-free.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();