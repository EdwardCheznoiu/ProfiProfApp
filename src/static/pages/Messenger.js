import '../css/pages/Messenger.css'
import MessengerService from '../../services/messenger.service'
function Messenger()
{
    const handleConv = () =>
    {
        try
        {
            MessengerService.conversations()
        }
        catch (err)
        {
            console.log(err);
        }
    }

    return (
        <>
            <div className="messenger-container">
                <div className="messenger-conv-container">
                    {
                        <div className="conv-container">
                            <div className="conv-image">
                                <img src={require('../../static/imgs/users_profile/fem.png')} />
                            </div>
                            <div className="info-conv">
                                <div className="conv-name">placeholder</div>
                                <div className="info-conv-msgs">Mesaje: </div>
                                <div className="info-conv-date">Data ultimului mesaj: </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="messenger-chat-container">
                    <div className="message-chat-content">
                        <div className="message-chat-msg">
                            <div className="msg-sender">Nume</div>
                            <div className="msg-body">Mesaj</div>
                            <div className="dispose-msg">x</div>
                        </div>
                        <div className="message-chat-msg">
                            <div className="msg-sender">Nume</div>
                            <div className="msg-body">Mesaj</div>
                            <div className="dispose-msg">x</div>
                        </div>
                        <div className="message-chat-msg">
                            <div className="msg-sender">Nume</div>
                            <div className="msg-body">Mesaj</div>
                            <div className="dispose-msg">x</div>
                        </div>
                        <div className="message-chat-msg">
                            <div className="msg-sender">Nume</div>
                            <div className="msg-body">Mesaj</div>
                            <div className="dispose-msg">x</div>
                        </div>
                    </div>

                    <div className="input-container">
                        <input id="input-text" type="textarea" />
                        <img src={require('../../static/imgs/messenger/send-btn.png')} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger