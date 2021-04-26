var query = require("../../../server_config/connection");
export default query;

// var mysql = require("mysql");

// var pool = mysql.createPool({
// 	connectionLimit: 50,
// 	host: "localhost",
// 	user: "root",
// 	password: "",
// 	database: "hsdb",
// });

// export default function(sql, arr) {
// 	return new Promise((resolve, reject) => {
// 		pool.getConnection((err,connection) => {
// 			if(err) return reject(err);
// 			connection.query(sql, arr, function (err, results) {
// 				connection.release();
// 				if (err) return reject(err);
// 				else return resolve(results);
// 			});
// 		})
		
// 	});
// }