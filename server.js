const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
	"mongodb+srv://Nadiia:lepetikonfeti2012@cluster0.kg5i1l2.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
	.connect(DB_HOST)
	.then(() => {
		console.log("Database connection successful");
		app.listen(3000);
	})
	.catch((error) => {
		console.log(error.message);
		process.exit(1);
	});
