import { useState } from 'react';
import '../../static/css/components/Chat.css'
import MessengerService from '../../services/messenger.service';
import { useEffect, useRef } from 'react';

function Chat(props)
{

    const [conversations, setConversations] = useState("");
    const tmpConversations = useRef([]);
    const [messageBody, setMessageBody] = useState("");
    const [searchMessage, setSearchMessage] = useState("");
    const flagTmpConv = useRef(false);
    useEffect(() =>
    {
        handleConv();
    }, []);


    const handleConv = async () =>
    {
        try
        {
            const conv = await MessengerService.getMessages(props.message.userId, props.message.logedUserId);
            setConversations(conv);
            await handleMessageBodyResp();
        }
        catch (err)
        {
            console.log(err);
        }
    }
    const [chatActive, setChatActive] = useState(true);

    const HandleChatVis = () =>
    {
        setChatActive({ chatActive: !chatActive.chatActive })
    }

    const handleSendMessage = async (e) =>
    {
        e.preventDefault();
        try
        {
            await MessengerService.sendMessage(props.message.userId, props.message.logedUserId, messageBody);
            await handleConv();
        }
        catch (err)
        {
            console.log(err);
        }
    }

    const handleMessageBodyResp = async () =>
    {
        const scrollArea = document.querySelector(".chat-main-content");
        const inputArea = document.querySelector(".chat-text-zone");
        scrollArea.scrollTop = scrollArea.scrollHeight;
        inputArea.value = "";
    }

    const handleSearchMesage = async (e) =>
    {
        setSearchMessage(e);
        const response = await MessengerService.getMessagesByBody(props.message.userId, props.message.logedUserId, searchMessage);

        setConversations(response);

        if (!flagTmpConv.current)
        {
            tmpConversations.current = conversations;
            flagTmpConv.current = true;
        }

        if (e.length <= 1)
        {
            setConversations(tmpConversations.current);
            flagTmpConv.current = false;
        }


    }
    console.log(tmpConversations);
    return (
        <div className={chatActive.chatActive ? "chat-container-active" : "chat-container"}>
            <div onClick={HandleChatVis} className="chat-bar">
                <div className="chat-bar-name">{props.message.userFname} {props.message.userLname}</div>
                <div className="message-number"> </div>
            </div>
            <div className="chat-main-content">
                {
                    !conversations ?
                        (<div className="chat-msg-nobody">
                            <div className="chat-msg-palceholder">Nu exista mesaje in aceasta conversatie</div>
                        </div>
                        ) :
                        (<>
                            {
                                conversations.map((message) =>
                                {
                                    return (
                                        <div className="chat-msg">
                                            <div className="chat-msg-name">Nume persoana</div>
                                            <div className="chat-msg-body"> {message.messageBody} </div>
                                        </div>
                                    )
                                })
                            }
                        </>)
                }
            </div>
            <div className="chat-input">
                <textarea className="chat-text-zone" type="text" value={messageBody} onChange={(e) => setMessageBody(e.target.value)}></textarea>
            </div>
            <div className="chat-input-btn">
                <img onClick={handleSendMessage} src={require('../../static/imgs/messenger/send-btn.png')} />
            </div>
            <input type="text" className="search-click-active" name="" placeholder="Cauta in conversatie..." value={searchMessage} onChange={(e) => handleSearchMesage(e.target.value)} />
        </div>
    );

}

export default Chat