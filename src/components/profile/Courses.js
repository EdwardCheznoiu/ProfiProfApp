import '../../static/css/components/Courses.css'
import { useState, useEffect } from 'react';
import AcademicService from '../../services/academic.service'
import ToastError from '../ToastError';
import ToastSucces from '../ToastSucces';
function Courses(props)
{

    const [formActive, setFormActive] = useState(false);
    const [courses, setCourses] = useState("");
    const [userCourses, setUserCourses] = useState("");
    const [selectedCourse, setSelectedCourse] = useState('');
    const [currentProfileId, setCurrentProfileId] = useState("");
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    useEffect(() =>
    {
        getCurrentUserId();
        handleGetAllCourses();
        handleGetCoursesByUid();
    }, [userCourses]);

    const handleFormActive = () =>
    {
        setFormActive(!formActive)
    }

    const handleCloseForm = () =>
    {
        setFormActive(false)
    }

    const handleCourseSelection = (event) =>
    {
        setSelectedCourse(event.target.value);
    };

    const getCurrentUserId = async () =>
    {
        const location = window.location.pathname;
        const userId = location.split('profile/')[1];
        setCurrentProfileId(userId);
    }

    const handleGetAllCourses = async () =>
    {
        try
        {
            const response = await AcademicService.getAllCourses();
            setCourses(response);
        }
        catch {
            setError("Nu s-au putut prelua cursurile");
        }
    }

    const handleGetCoursesByUid = async () =>
    {
        try
        {
            const response = await AcademicService.getCoursesByUid(props.message.user.id);
            setUserCourses(response);
        }
        catch {

        }
    }

    const handleSetCourse = async () =>
    {
        try
        {
            const response = await AcademicService.setCourse(props.message.logedUser.id, selectedCourse);
            setSucces("Cursul a fost asociat cu succes. Reîncarcă pagina.");
        }
        catch {
            setError("Cursul nu a putut fi asociat!");
        }
    }

    const resetError = () =>
    {
        setError("");
    }

    const resetSucces = () =>
    {
        setError("");
    }

    return (
        <>
            {error && <ToastError message={error} duration={4000} resetError={resetError} />}
            {succes && <ToastSucces message={succes} duration={4000} resetError={resetSucces} />}
            {formActive && <>
                <div className="form-holder">
                    <div className='form-holder-info'>Alege un curs din lista de mai jos</div>
                    <div className='form-holder-close' onClick={handleCloseForm}><img src={require('../../static/imgs/users_profile/close.png')} /></div>
                    <select className="form-select" aria-label="Default select example" value={selectedCourse} onChange={handleCourseSelection}>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                    <div className='add-new-course' onClick={() => { handleSetCourse(); handleGetCoursesByUid(); handleCloseForm(); }}>Adaugă</div>
                </div>
            </>
            }
            {
                props.message ? (
                    <div className="user-details">
                        {props.message.user.id == props.message.logedUser.id &&
                            <div className='btn-holder'>
                                <div className="add-course-btn" onClick={handleFormActive}>
                                    <img src={require('../../static/imgs/users_profile/add-c.png')} />
                                    Adaugă un curs
                                </div>
                            </div>
                        }
                        {userCourses && userCourses.map((course) => (
                            <div className="user-details-item">
                                <div>{course.name}</div>
                            </div>
                        ))}
                    </div>
                ) :
                    (
                        <div className="user-details">
                            <h1>Nu exista cursuri</h1>
                        </div>
                    )
            }
        </>
    );
}
export default Courses;