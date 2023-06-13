import axios from "axios";
import jwtDecode from "jwt-decode";
const API_URL = "https://localhost:5010/auth";

const login = async (email, password) =>
{
    try
    {
        const response = await axios.post(API_URL + "/login", { email, password });
        console.log(response.data)
        if (response.data) { localStorage.setItem("user", JSON.stringify(response.data)); }
    }
    catch (error)
    {
        return error;
    }
}

const register = async (fname, lname, email, password) =>
{
    try
    {
        const response = await axios.post(API_URL + "/register", { fname, lname, email, password });
        if (response) return response.data;
    }
    catch (error)
    {
        return error;
    }
};

const getLoginDetails = async () =>
{
    const token = localStorage.getItem("user");
    if (token)
    {
        const tokenDec = jwtDecode(token);
        return tokenDec;
    }
    return null;
}

const logout = () =>
{
    localStorage.removeItem("user");
    window.location.replace("/login")
}


const AuthService = {
    login,
    register,
    getLoginDetails,
    logout
};

export default AuthService;