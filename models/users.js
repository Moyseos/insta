const sql = require("./util/sql");
const Sequelize = require("sequelize");

module.exports = sql.define("user", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	first_name: {
		type: Sequelize.STRING,
		notNull: true,
	},
	last_name: {
		type: Sequelize.STRING,
		notNull: true,
	},
	user_name: {
		type: Sequelize.STRING,
		notNull: true,
	},
	email: {
		type: Sequelize.STRING,
		notNull: true,
	},
});
