import { Table } from 'react-bootstrap'
import '../../static/css/components/SearchViewTeacher.css';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

import { useEffect } from 'react';

function SearchViewTeacher()  
{

    const inputRef = useRef(null);
    const [data, setData] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [clicked, setClicked] = useState(false);
    const [teacherData, setTeacherData] = useState({ data: [] });


    const getUsersByName = async () =>
    {
        setIsLoading(true);
        try
        {
            const url = "https://localhost:5001/users/entity/" + inputRef.current.value + "/Teacher";
            const response = await fetch(url)
                .then(response => response.json());

            if (!response)
            {
                throw new Error(`Nu am putut realiza conexiunea... Satus eroare: ${response.status}`);
            }

            setData({ data: response });
        } catch (err)
        {
            setErr(err.message);
        } finally
        {
            setIsLoading(false);
            setClicked({ clicked: !clicked });
        }
    };

    const prepareData = (e) =>
    {
        console.log(e);
        localStorage.setItem("teacher-data", JSON.stringify(e));
    }

    return (

        <div className="search-view-container">
            <div className="width-80 space-around">
                <div className="input-group">
                    <input ref={inputRef} type="search" className="form-control rounded" placeholder="Cauta" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="btn btn-outline-primary" onClick={getUsersByName}>search</button>
                </div>
            </div>
            {
                err &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Hopa!</strong> Ceva nu a mers bine la adunarea datelor...{err}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            {isLoading && <div className="loading"><img src={require('../../static/imgs/users_listview/loading.gif')} /></div>}
            {
                !err && <Table className={clicked ? "mt-4" : "d-none"} striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>Prenume</th>
                            <th>Nume</th>
                            <th>Email</th>
                            <th>Nr Telefon</th>
                            <th>Functie</th>
                            <th>Rol</th>
                            <th>Vezi profesor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.data.map((user) =>
                            {
                                return (
                                    <tr>
                                        <td>{user.fname}</td>
                                        <td>{user.lnmae}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.function}</td>
                                        <td>{user.role}</td>
                                        <td><Link onClick={() => prepareData(user)} to='/teacher_profile/${user}'>Detalii</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }

        </div>
    );
}
export default SearchViewTeacher;