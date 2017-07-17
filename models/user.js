const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs-extra");
const path = require("path");
const sql = require("../util/sql");
const File = require("./file");
const Comments = require("./comments");
const imagePath = "assets/previews/";
const imageTum = "assets/thumbnails/";
const Jimp = require("jimp");


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

User.hasMany(File);

// Comments.prototype. upload = function (comments) {
//
// }

User.prototype.upload = function(file, req) {
	return this.createFile({
		id: file.filename,
		size: file.size,
		originalName: file.originalname,
		mimeType: file.mimetype,
		description: req.body.description,
	})
	.then(function() {
		const ext = path.extname(file.originalname);
		const dest = "assets/files/" + file.filename + ext;
		return fs.copy(file.path, dest);
	})
	.then(function(req) {
		if (file.mimetype.includes("image/")) {
			Jimp.read(file.path).then(function(img) {
				img.quality(80);
				img.resize(Jimp.AUTO, 400);
				return img.write(imagePath + file.filename + ".jpg");
			})
		.then(function(img) {
			// create thumpnail
			img.cover(64,64);
			return img.write(imageTum + file.filename + ".jpg");
		});
		}
	});
};

User.prototype.comparePassword = function(pw) {
	return bcrypt.compare(pw, this.get("password"));
};


module.exports = User;
