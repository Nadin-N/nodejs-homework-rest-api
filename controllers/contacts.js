const Joi = require("joi");

const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

const getAll = async (req, res) => {
	const result = await contacts.listContacts();
	res.json(result);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.getContactById(id);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const add = async (req, res) => {
	const result = await contacts.addContact(req.body);
	res.status(201).json(result);
};

const deleteById = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.removeContact(id);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.updateContact(id, req.body);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	deleteById: ctrlWrapper(deleteById),
	updateById: ctrlWrapper(updateById),
};
