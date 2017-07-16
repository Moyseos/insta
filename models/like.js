const Sequelize = require("sequelize");
const sql = require("../util/sql");


const Like = sql.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	like: {
		type: Sequelize.BOOLEAN,
	},
});

module.exports = Like;
