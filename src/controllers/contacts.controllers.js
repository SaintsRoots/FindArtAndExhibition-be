import Contact from "../models/contacts.model";
import * as messageService from "../services/contacts.services";
import { validateCreateMessage } from "../validations/contacts.validation";

// controller to create a message
export const createMessage = async (req, res) => {
  const { error, value } = validateCreateMessage(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const createdMessage = await messageService.createMessage(
      value,
    );
    return res.status(201).json({
      status: "201",
      message: "Message sent",
      data: createdMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to send a message",
      error: error.message,
    });
  }
};

// constroller to retrieve all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await messageService.getMessages();
    return res.status(200).json({
      status: "200",
      message: "Messages retrieved",
      data: messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve messages",
      error: error.message,
    });
  }
};

// controller to retrieve single message by id
export const getOneMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await messageService.getOneMessage(messageId);

    if (!message) {
      return res.status(404).json({
        status: "404",
        message: "Message not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Message retrieved",
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve message",
      error: error.message,
    });
  }
};

// controller to delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Contact.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Message not found",
      });
    }
    await messageService.deleteMessage(id);
    return res.status(200).json({
      status: "200",
      message: "Message deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to delete message",
      error: error.message,
    });
  }
};

