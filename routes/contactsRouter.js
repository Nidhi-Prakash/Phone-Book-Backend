import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../controllers/contactsController.js";
import { validateToken } from "../middleware/validateToken.js";

export const contactsRouter = Router();

contactsRouter.use(validateToken);

contactsRouter.route("/").get(getAllContacts).post(createContact);

contactsRouter
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);
