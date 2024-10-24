import Contact from "../models/contactsModel.js";

export const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ allContacts });
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json({ contact });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Error");
  }
};

export const createContact = async (req, res) => {
  try {
    const { Name, Phone_Number } = req.body;
    const contactAlreadyExist = await Contact.findOne({ Phone_Number });
    if (contactAlreadyExist) {
      res.status(400).json({ message: "Contact already exist." });
    } else {
      const newContact = await Contact.create({
        user_id: req.user.id,
        Name,
        Phone_Number,
      });
      res.status(201).json({ newContact });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Internal error", error);
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ updatedContact });
    } else {
      res.status(400).json({ message: "Id is wrong" });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal error");
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      const deletedContact = await Contact.deleteOne({ _id: req.params.id });
      res.status(200).json({ deletedContact });
    } else {
      res.status(400).json({ message: "Id is wrong" });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal error");
  }
};
