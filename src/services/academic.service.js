import axios from "axios";

const API_URL = "https://localhost:5013/";

const getAllCourses = async () =>
{
    try
    {
        const response = await axios.get(API_URL + "courses");
        if (response)
        {
            return (response.data);
        }
    }
    catch (error)
    {
        return Promise.reject(error);
    }
}

const getCoursesByUid = async (uid) =>
{
    try
    {
        const response = await axios.get(API_URL + "courses/get/" + uid);
        console.log(response);
        if (response)
        {
            return (response.data);
        }
    }
    catch (error)
    {
        return Promise.reject(error);
    }
}


const setCourse = async (uid, cuid) =>
{
    try
    {
        const response = await axios.post(API_URL + "courses/setuser/", { UserId: uid, CourseId: cuid });
        if (response)
        {
            return (response.data);
        }
    }
    catch (error)
    {
        return Promise.reject(error);
    }
}


const AcademicService = {
    getAllCourses,
    setCourse,
    getCoursesByUid
};

export default AcademicService;