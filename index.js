// declare library
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const socket = require('socket.io');
const socketController = require('./src/socket/index');
const http = require('http');
const userRouter = require('./src/routes/user.routes.js');
const productRouter = require ('./src/routes/product.routes');
const order = require ('./src/routes/order.routes');
const address = require('./src/routes/address.routes');

const app = express();

try {
	app.use(express.static("public"));
	app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
	app.use(bodyParser.json());
	app.use(xss());
	app.use(cors());

	app.use(userRouter)
	app.use(productRouter)
	app.use(order)
	app.use(address)

	const server = http.createServer(app);
	const io = socket(server, {
		cors: {
			origin: '*',
		}
	})

	let count = 0;

	io.on('connection', (socket) => {
		console.log('new user connected ' + count);

		count = count + 1;
		socketController(io, socket);
	})

	// jalankan express
	server.listen(process.env.PORT, () => {
		console.log("SERVICE IS RUNNING ON PORT " + process.env.PORT);
	});
} catch (err) {
	console.log(err);
}