


import AuthService from '../../services/auth.service';
import { useState, useEffect } from 'react';
import '../css/pages/UserProfile.css';
import Chat from '../../components/big/Chat'
function TeacherProfile()
{

    const rawTeacherData = localStorage.getItem("teacher-data");
    const teacherData = JSON.parse(rawTeacherData);
    console.log(teacherData);

    useEffect(() =>
    {
        const removeTeacher = () =>
        {
            localStorage.removeItem("teacher-data");
        }
        return () =>
        {
            removeTeacher();
        };
    }, []);

    return (
        <>
            <Chat></Chat>
            <div className="user-profile">
                <div className="user-profile-img">
                    <img src={teacherData.profileimage ? require(`${teacherData.profileimage}`) : require('../../static/imgs/users_profile/fem.png')} alt="UserProfileImage" />
                </div>
                <div className="user-profile-name">
                    <div className='inline'>
                        <div className='user-activ'></div>
                        <h3>{teacherData.fname} {teacherData.lnmae}</h3>
                        <img src={require('../../static/imgs/users_profile/add.png')} />
                        <img src={require('../../static/imgs/users_profile/message.png')} />
                    </div>
                    <>Ultima autentificare: { }</>
                </div>
            </div>

            <div className="user-details">
                <ul className='user-profile-navbar'>
                    <li>Despre</li>
                    {teacherData.role === "Teacher" &&
                        (
                            <>
                                <li>Cursuri</li>
                                <li>Publicatii</li>
                                <li>Cercetare</li>
                            </>
                        )
                    }
                    <li>Prieteni</li>
                </ul>
                <div className='user-details-item'>Nume: {teacherData.fnamee}</div>
                <div className='user-details-item'>Prenume: {teacherData.lnmae}</div>
                <div className='user-details-item'>Numar de telefon: {teacherData.phonenumber} </div>
                {teacherData.role == "Teacher" &&
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
                <div className='user-details-item'>Rol: {teacherData.role}</div>
                <div className='user-details-item'>Despre: {teacherData.details}</div>
            </div>
        </>
    )
}
export default TeacherProfile;

