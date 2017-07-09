const sql = require("../util/sql");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

function hashUserPassword(user) {
	if (user.password) {
		return bcrypt.genSalt()
		.then(function(salt) {
			return bcrypt.hash(user.password, salt);
		})
		.then(function(hashedPw) {
			user.password = hashedPw;
		});
	}
}
const User = sql.define("user", {
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
		unique: true,
	},
	email: {
		type: Sequelize.STRING,
		notNull: true,
	},
	password: {
		type:Sequelize.STRING,
		notNull: true,
	},
},{
		 hooks: {
			beforeCreate: hashUserPassword,
			beforeUpdate: hashUserPassword,
		},
});

User.prototype.comparePassword = function(pw) {
	return bcrypt.compare(pw, this.get("password"));
};


module.exports = User;
