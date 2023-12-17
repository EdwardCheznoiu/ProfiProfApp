import { useEffect, useState } from "react";
import UserService from "../../services/users.service";
import { Link } from "react-router-dom";
import SearchBar from "../../components/big/SearchBar";
function Students()
{
    const [students, setStudents] = useState("");
    const [data, setData] = useState("");
    useEffect(() =>
    {


        handleGetStudents();

    }, []);

    const handleGetStudents = async () =>
    {
        try
        {
            const response = await UserService.getByRole("Student");
            if (response != null)
            {
                setStudents(response);
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
            if (!dt) handleGetStudents();
            const response = await UserService.getByDataAndRole(dt, "Student");
            if (response != null)
            {

                setStudents(response);
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
                {students && (<>
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
                                students.map((student) =>
                                {
                                    return (
                                        <tr key={student.id}>
                                            <th scope="row">{student.id}</th>
                                            <td>{student.lnmae}</td>
                                            <td>{student.fname}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phonenumber}</td>
                                            <td>{student.role}</td>
                                            <td><Link to={`/profile/${student.id}`}>Vezi profil</Link></td>
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
export default Students;