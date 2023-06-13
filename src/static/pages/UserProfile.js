import AuthService from '../../services/auth.service';
import UserService from '../../services/users.service';
import { useState, useEffect } from 'react';
import '../css/pages/UserProfile.css';
import '../css/components/Loading.css'
import Chat from '../../components/big/Chat'
import { Link, useLocation } from 'react-router-dom';
import Toast from '../../components/big/Toast';
function UserProfile()
{
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState("");
    const [logedUser, setLogedUser] = useState("");
    const [loginDetails, setLoginDetails] = useState("");
    const location = useLocation();
    useEffect(() =>
    {
        handleLoadingData();
    }, [location.pathname]);


    const getCurrentUserId = async () =>
    {
        const location = window.location.pathname;
        const userId = location.split('profile/')[1];
        return userId;
    }

    const handlePorfileUser = async () =>
    {
        try
        {
            const userId = await getCurrentUserId();
            const usr = await UserService.getById(userId);
            setUser(usr);
        } catch (error)
        {
            setUser("-NO NAME-");
        }
    }

    const handleGetCurrentUser = async () =>
    {
        try
        {
            const usr = await UserService.getCurrentUser();
            setLogedUser(usr);
        } catch (error)
        {
            setLogedUser("-NO NAME-");
        }
    }

    const handleLoginDetails = async () =>
    {
        const login = await AuthService.getLoginDetails();
        if (login) setLoginDetails(login);
    }


    const handleLoadingData = async () =>
    {
        await handlePorfileUser();
        await handleGetCurrentUser();
        await handleLoginDetails();
        setIsLoading(false);

    }

    return (
        <>
            {
                isLoading ? <div className='loading'><img src={require('../imgs/users_listview/loading.gif')} /> </div> :
                    (
                        <>
                            <Toast message={"Text de proba"} />
                            {logedUser.id != user.id && <Chat message={{ userId: user.id, logedUserId: logedUser.id, userFname: user.fname, userLname: user.lnmae }} />}
                            <div className="user-profile">
                                <div className='user-settings-holder'>
                                    <div className='user-settings'>
                                        {logedUser.id == user.id && <Link to="/"><img src={require('../../static/imgs/users_profile/settings.png')} /></Link>}
                                    </div>
                                </div>
                                <div className="user-profile-img">
                                    <img src={user.profileimage ? require(`${user.ProfileImage}`) : require('../../static/imgs/users_profile/male.png')} alt="UserProfileImage" />
                                </div>
                                <div className="user-profile-name">
                                    <div className='inline'>
                                        <div className='user-activ'></div>
                                        <h3>{user.fname} {user.lnmae}</h3>
                                        {
                                            logedUser.id != user.id && (
                                                <>
                                                    <div className='vertical-line'></div>
                                                    <img onClick={() => UserService.postUserFriend(user.id, logedUser.id)} src={require('../../static/imgs/users_profile/add.png')} />
                                                    <img src={require('../../static/imgs/users_profile/message.png')} />
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className='user-active-role'>- {user.role} -</div>
                                    <>Ultima autentificare: {loginDetails.LastLogin}</>
                                </div>
                            </div>

                            <ul className='user-profile-navbar'>
                                <li>Despre</li>
                                {user.role == "Teacher" &&
                                    (
                                        <>
                                            <li>Publicatii</li>
                                            <li>Cercetare</li>
                                        </>
                                    )
                                }
                                <li>Prieteni</li>
                            </ul>

                            <div className="user-details">
                                <div className='user-details-item'>Nume: {user.fname}</div>
                                <div className='user-details-item'>Prenume: {user.lnmae}</div>
                                <div className='user-details-item'>Numar de telefon: {user.phoneNumber} </div>
                                {user.Role == "Teacher" &&
                                    (
                                        <>
                                            <div className='user-details-item'>Functia ocupata: </div>
                                            <div className='user-details-item'>Cabinet: </div>
                                            <div className='user-details-item'>Cursuri: </div>
                                            <div className='user-details-item'>Publicatii: </div>
                                            <div className='user-details-item'>Cercetare: </div>
                                        </>
                                    )
                                }
                                <div className='user-details-item'>Rol: {user.role}</div>
                                <div className='user-details-item'>Despre: {user.details}</div>
                            </div>
                        </>
                    )
            }

        </>
    )
}
export default UserProfile;

