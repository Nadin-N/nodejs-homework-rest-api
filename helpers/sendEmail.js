const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
	const email = { ...data, from: "nvseverin@i.ua" };
	await sgMail.send(email);
	return true;
};

// const email = {
// 	to: "rodaja5255@ippals.com",
// 	from: "nvseverin@i.ua",
// 	subject: "test",
// 	html: "<p> Hello, my dear friend!</p>",
// };

module.exports = sendEmail;
