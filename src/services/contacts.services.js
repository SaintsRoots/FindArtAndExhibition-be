import Contact from "../models/contacts.model";

// service to create a message
export const createMessage = async (messageData) => {
  const { names, email, subject, message } = messageData;
  return await Contact.create({
    names,
    email,
    subject,
    message,
  });
};

// service to retrieve all Messages
export const getMessages = async () => {
  return await Contact.find()
};

// service to retrieve a single message by id
export const getOneMessage = async (messageId) => {
  return await Contact.findById(messageId)
};

// service delete a message
export const deleteMessage = async (id) => {
  await Contact.findByIdAndDelete(id);
};
