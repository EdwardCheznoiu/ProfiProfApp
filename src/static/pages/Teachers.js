import { useState } from "react";
import UserService from "../../services/users.service";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/big/SearchBar";
function Teachers()
{
    const [teachers, setTeachers] = useState("");
    const [data, setData] = useState("");
    useEffect(() =>
    {
        handleGetteachers();
    }, []);

    const handleGetteachers = async () =>
    {
        try
        {
            const response = await UserService.getByRole("Profesor");
            if (response != null)
            {
                setTeachers(response);
            }
        } catch (error)
        {
            console.error(error);
        }
    };

    const handleGetSearchedStud = async (dt) =>
    {
        try
        {
            if (!dt) handleGetteachers();
            const response = await UserService.getByDataAndRole(dt, "Profesor");
            if (response != null)
            {

                setTeachers(response);
            }
        }
        catch (error)
        {

        }
    }

    const updateData = (newData) =>
    {
        setData(newData);
    };

    return (
        <>
            <div className="stud-container">
                <SearchBar updateData={updateData} handleGetSearchedStud={handleGetSearchedStud} />
                {teachers && (<>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nume</th>
                                <th scope="col">Prenume</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefon</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Profil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teachers.map((teacher) =>
                                {
                                    return (
                                        <tr key={teacher.id}>
                                            <th scope="row">{teacher.id}</th>
                                            <td>{teacher.lnmae}</td>
                                            <td>{teacher.fname}</td>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.phonenumber}</td>
                                            <td>{teacher.role}</td>
                                            <td><Link to={`/profile/${teacher.id}`}>Vezi profil</Link></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </>)}
            </div>
        </>
    );
}
export default Teachers;