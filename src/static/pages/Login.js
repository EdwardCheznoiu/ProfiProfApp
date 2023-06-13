import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Login.css'
import AuthService from '../../services/auth.service';
import Toast from '../../components/big/Toast';
function Login()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const handleLogin = async (e) =>
    {
        e.preventDefault();
        try
        {
            if (!email || !password)
            {
                setErr("Ai campuri necompletate")
            }
            const response = await AuthService.login(email, password);
            console.log(response.code)
            if (response.code === "ERR_NETWORK")
            {
                setErr("Nu s-a putut realiza conexiunea la server");
            }
            window.location.replace("/")
        }
        catch (error)
        {
            console.log(error.message);

        }
    }
    return (
        <>
            {err && <Toast message={err} />}
            <section className="login">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={require('../imgs/login/side.png')}
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleLogin}>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="validationCustom01" className="form-control form-control-lg"
                                        placeholder="Introdu o adresa de email valida" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <label className="form-label" for="form3Example3">Adresa email</label>
                                </div>


                                <div className="form-outline mb-3">
                                    <input type="password" id="validationCustom02" className="form-control form-control-lg"
                                        placeholder="Introdu parola" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <label className="form-label" for="form3Example4">Parola</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">

                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" for="form2Example3">
                                            Tine-ma minte
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Ai uitat parola?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg">Autentifcare</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Nu ai inca un cont? <Link to="/register"
                                        className="link-danger">Inregistrare</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}

export default Login