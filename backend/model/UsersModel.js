const mongoose = require("mongoose");
const { UsersSchema } = require("../Schema/UsersSchema");



const UsersModel = mongoose.model("User", UsersSchema);

module.exports = { UsersModel };
