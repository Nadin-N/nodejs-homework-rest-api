const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
			minlength: 8,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: emailRegex,
		},
		subscription: {
			type: String,
			enum: subscriptionList,
			default: "starter",
		},
		token: String,
		avatarURL: {
			type: String,
			require: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
	},

	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	password: Joi.string().min(8).required(),
	email: Joi.string().pattern(emailRegex).required(),
	subscription: Joi.string().valid(...subscriptionList),
	token: Joi.string(),
});

const verifyEmailSchema = Joi.object({
	email: Joi.string().pattern(emailRegex).required(),
});

const loginSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().pattern(emailRegex).required(),
});
const subscriptionSchema = Joi.object({
	subscription: Joi.string().valid(...subscriptionList),
});

const schemas = { registerSchema, loginSchema, subscriptionSchema, verifyEmailSchema };
const User = model("user", userSchema);
module.exports = { User, schemas };
