const sql = require("../util/sql");
const Sequelize = require("sequelize");

module.exports = sql.define("user", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	firstname: {
		type: Sequelize.STRING,
		notNull: true,
	},
	lastname: {
		type: Sequelize.STRING,
		notNull: true,
	},
	username: {
		type: Sequelize.STRING,
		notNull: true,
	},
	email: {
		type: Sequelize.STRING,
		notNull: true,
	},
	password: {
		type:Sequelize.STRING,
		notNull: true,
	 },
});
