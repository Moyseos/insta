const Sequelize = require("sequelize");
const sql = require("../util/sql");


const Comments = sql.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	comment: {
		type: Sequelize.TEXT,
		notNull: true,
	},
});

module.exports = Comments;
