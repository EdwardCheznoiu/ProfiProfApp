import axios from "axios";
import AuthService from "./auth.service";
import jwtDecode from "jwt-decode";
const API_URL = "https://localhost:5001/";


const getCurrentUser = async () =>
{
    try
    {
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        const tokenDec = jwtDecode(token);
        const userId = tokenDec.UserId;
        if (token)
        {
            const response = await axios.get(API_URL + "users/" + userId, {
                headers: {
                    Authorization: `Bearer ${tokenWithoutQuotes}`,
                },
            });
            return response.data;
        }
    }
    catch (error)
    {
        // console.log(error);
    };
}

const getAllUsers = async () =>
{

}

const getByRole = async (role) =>
{

}

const getById = async (userId) =>
{
    try
    {
        if (!userId) return null;
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        if (token)
        {
            const response = await axios.get(API_URL + "users/" + userId, {
                headers: {
                    Authorization: `Bearer ${tokenWithoutQuotes}`,
                },
            });
            return response.data;
        }
        return null;
    }
    catch (error)
    {
        return error;
    };
}

const getUserFriends = async (userId) =>
{
    try
    {
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        if (token)
        {
            const response = await axios.get(API_URL + "friends/get/" + userId, {
                headers: {
                    Authorization: `Bearer ${tokenWithoutQuotes}`,
                },
            });
            return response.data;
        }
    }
    catch (error)
    {
        // console.log(error);
    };
}

const postUserFriend = async (userId, logedUserId) =>
{
    try
    {
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        const response = await axios.post(API_URL + "friends/set", { logedUserId, userId }, {
            headers: {
                Authorization: `Bearer ${tokenWithoutQuotes}`,
            },
        });
        console.log(response);
    }
    catch (error)
    {
        // console.log(error);
    };
}



const UserService = {
    getCurrentUser,
    getAllUsers,
    getByRole,
    getById,
    getUserFriends,
    postUserFriend
};

export default UserService;