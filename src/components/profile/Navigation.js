import { useState } from "react";
import '../../static/css/components/ProfileNav.css'
import About from "./About";
import Courses from "./Courses";
import Friends from "./Friends";
function Navigation(props)
{
    const [activeTab, setActiveTab] = useState('pr-about');

    const handleTabClick = (tab) =>
    {
        setActiveTab(tab);
    };
    return (
        <>
            <ul className='user-profile-navbar'>
                <li className={`tab ${activeTab === 'pr-about' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-about')}>Despre</li>
                {props.message.user.role === "Profesor" &&
                    (
                        <>
                            <li className={`tab ${activeTab === 'pr-course' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-course')}>Cursuri</li>
                            <li className={`tab ${activeTab === 'pr-publi' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-publi')}>Publicatii</li>
                            <li className={`tab ${activeTab === 'pr-research' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-research')}>Cercetare</li>
                        </>
                    )
                }
                <li className={`tab ${activeTab === 'pr-friends' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-friends')}>Prieteni</li>
            </ul>

            <div className='user-profile-content'>
                {activeTab === 'pr-about' && <About message={props.message} />}
                {activeTab === 'pr-course' && <Courses message={props.message} />}
                {activeTab === 'pr-friends' && <Friends message={props.message} />}
            </div>
        </>
    );
}
export default Navigation;