import { useState, useRef } from 'react';
import '../css/pages/Register.css'
import AuthService from '../../services/auth.service';
import { Link } from 'react-router-dom';
function Register()
{
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRpt, setPasswordRpt] = useState("")

    const handleRegister = async (e) =>
    {
        e.preventDefault();
        try
        {
            await AuthService.register(fname, lname, email, password);
            
        }
        catch (err)
        {
            console.log(err);
        }
    }
    return (
        <>
            <section class="register">
                <div class="container-fluid h-custom">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src={require('../imgs/login/side.png')}
                                class="img-fluid" alt="Sample image" />
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleRegister}>
                                <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="text" id="fname" class="form-control form-control-lg"
                                        placeholder="Introdu numele" value={fname} onChange={(e) => setFname(e.target.value)} />
                                    <label class="form-label" for="form3Example3">Nume</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="text" id="lname" class="form-control form-control-lg"
                                        placeholder="Introdu prenumele" value={lname} onChange={(e) => setLname(e.target.value)} />
                                    <label class="form-label" for="form3Example3">Prenume</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="email" id="email" class="form-control form-control-lg"
                                        placeholder="Introdu o adresa de email valida" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label class="form-label" for="form3Example3">Adresa email</label>
                                </div>


                                <div class="form-outline mb-3">
                                    <input type="password" id="pwd" class="form-control form-control-lg"
                                        placeholder="Introdu parola" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label class="form-label" for="form3Example4">Parola</label>
                                </div>

                                <div class="form-outline mb-3">
                                    <input type="password" id="pwdRpt" class="form-control form-control-lg"
                                        placeholder="Repeta parola" value={passwordRpt} onChange={(e) => setPasswordRpt(e.target.value)} />
                                    <label class="form-label" for="form3Example4">Repeta parola</label>
                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" class="btn btn-primary btn-lg">Inregistrare</button>
                                    <p class="small fw-bold mt-2 pt-1 mb-0">Ai deja un cont? <Link to="/login"
                                        class="link-danger">Autentifcare</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}
export default Register;