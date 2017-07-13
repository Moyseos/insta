module.exports = function(req, res, title, page, args) {
	res.render("template", {
		title: title || "No Title",
		page: page,
		pageArgs: args || {},
	});
};
