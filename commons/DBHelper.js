const mysql = require('mysql');
const dbSetting = require('../config/database.js');

class DBHelper {

	constructor(connectionPool) {
		this.connectionPool = mysql.createPool({
			'host' : dbSetting.host,
			'port':dbSetting.port,
			'user' : dbSetting.user,
			'password' : dbSetting.password,
			'database' : dbSetting.database,
			'charset': dbSetting.charset,
			'connectionLimit': dbSetting.connectionLimit,
			'supportBigNumbers': true,
			'bigNumberStrings': true
		});
	}

	release(connection) {
		connection.end(function(error) {
			if(error) {
				console.log('Connection closed failed.');
			} else {
				console.log('Connection closed succeeded.');
			}
		});
	}

	execQuery(sqlOptions) {
		var results = new Promise((resolve, reject) => {
			this.connectionPool.getConnection((error,connection) => {
				if(error) {
					console.log("Get connection from mysql pool failed !");
					throw error;
				}

				var sql = sqlOptions['sql'];
				var args = sqlOptions['args'];

				if(!args) {
					var query = connection.query(sql, (error, results) => {
						if(error) {
							console.log('Execute query error !');
							throw error;
						}

						resolve(results);
					});
				} else {
					var query = connection.query(sql, args, function(error, results) {
						if(error) {
							console.log('Execute query error !');
							throw error;
						}

						resolve(results);
					});
				}

				connection.release(function(error) {
					if(error) {
						console.log('Mysql connection close failed !');
						throw error;
					}
				});
			});
		}).then(function (chunk) {
			return chunk;
		});

		return results;
	}

	async queryById(sql, args) {
		let sqlOpts = {sql, args};
		let result = await this.execQuery(sqlOpts);
		return result[0];
	}

	async query(sql, args) {
		let sqlOpts = {sql, args};
		let result = await this.execQuery(sqlOpts);
		return result;
	}

	async insert(sql, args) {
		let sqlOpts = {sql, args};
		let result = await this.execQuery(sqlOpts);
		return result;
	}

	async update(sql, args) {
		let sqlOpts = {sql, args};
		let result = await this.execQuery(sqlOpts);
		return result;
	}

	async delete(sql, args) {
		let sqlOpts = {sql, args};
		let result = await this.execQuery(sqlOpts);
		return result;
	}

}

module.exports = new DBHelper();
