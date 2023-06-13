import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const API_URL = "https://localhost:5003/";

const getMessagesFromConv = async (convId) =>
{
    const response = await axios.get(API_URL + "messages/convmessages/" + convId);
    if (response)
    {
        return (response.data);
    }
}

const getConversations = async (userId, logedUserId) =>
{
    try
    {
        const response = await axios.get(API_URL + "conversations/" + logedUserId + "/" + userId);
        if (response.status === 200)
        {
            return response.data[0].id
        }
    }
    catch (error)
    {
        return null;
    }


}

const createConversation = async (userId, logedUserId) =>
{
    try
    {
        await axios.post(API_URL + "conversations/" + userId + "/" + logedUserId, { userId, logedUserId });
    }
    catch (error)
    {
        console.log(error);
    }

}

const getMessage = async () =>
{

}

const getMessages = async (userId, logedUserId) =>
{
    const conversation = await getConversations(userId, logedUserId);
    if (conversation)
    {
        const messages = await getMessagesFromConv(conversation);
        if (messages)
        {
            return messages;
        }
    }
    return null;
}

const getMessagesByBody = async (userId, logedUser, messageBody) =>
{
    console.log(userId);
    console.log(logedUser);
    console.log(messageBody);
    try
    {
        const conversationId = await getConversations(userId, logedUser);
        if (conversationId)
        {
            const response = await axios.get(API_URL + "messages/body/" + userId + "/" + logedUser + "/" + messageBody);
            if (response.data)
                return response.data;
        }
    }
    catch (error)
    {
        console.log(error);
        return null;
    }

}

const sendMessage = async (userId, logedUserId, messageBody) =>
{
    try
    {
        console.log(userId);
        let conversationId = await getConversations(userId, logedUserId);

        if (!conversationId)
        {
            await createConversation();
            conversationId = await getConversations(userId, logedUserId);
            console.log(conversationId);
            if (!conversationId) { throw new Error("Ceva nu a mers bine la preluarea mesajelor"); };
            await axios.post(API_URL + "messages/send", { userId, conversationId, messageBody });
        }
        else
        {
            await axios.post(API_URL + "messages/send", { userId, ConvId: conversationId, messageBody });
        }
    }
    catch (error)
    {
        console.log(error);
    }


}


const deleteMessage = () =>
{

}

const deleteConv = () =>
{

}

const MessengerService = {
    getMessages,
    sendMessage,
    getMessagesByBody
};

export default MessengerService;