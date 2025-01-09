import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import FileBase from 'react-file-base64';
import { useNavigate } from "react-router";
import "./Login.scss"


import { onValue, ref } from "firebase/database";
import { dbFirebase } from "../app/firebaseCongfig";
import { authFirebase } from "../app/authfirebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


// export default async function Login() {
  // const result = await new Promise((resolver) => {
  //   const songRef = ref(dbFirebase, "songs");
  //   onValue(songRef, async (snapshot) => {
  //     const data = [];
  //     for (const key in snapshot.val()) {
  //       const value = snapshot.val()[key];
  //       data.push({
  //         id: key,
  //         image: value.image,
  //         title: value.title
  //       })
  //     }
  //     resolver(data);
  //   });
  // });

  // console.log(result);


const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState();

    const { signup, error, isLoading } = useSignup()

    // const handleSubmit = async (e) => {
    //     console.log(confirmPassword, password)
    //     e.preventDefault()
    //     if (password !== confirmPassword) {
    //         console.log("oke")
    //         alert("Password nhập lại không chính xác")
    //     }

    //     else await signup(email, password)
    // }

    const formRegister = document.querySelector("#form-register");
    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        console.log(email);
        console.log(password);
        if (password !== confirmPassword) {
            alert("Password nhập lại không chính xác")
            return;
        }
        const auth = getAuth();
        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        window.location.href = "/login";
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <>
            <div className='body-login'>
                <div className='body-login-left'>
                    <img src='./farm.jpg' />
                </div>
                <div className='body-login-right'>
                    {/* <h2>Welcome To Strawberry farm</h2> */}

                    <form id="form-register" className="signup" onSubmit={handleRegister} >
                        <h3>Đăng Ký</h3>

                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label>Mật Khẩu:</label>
                        <input
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <label>Nhập Lại Mật Khẩu</label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                        <button type="submit" className="btn-signup">Gửi</button>
                        {/* <button type="button" className="btn-signup" onClick={() => navigate("/login")}>Go to login</button> */}
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </div>
            {/* <div className='body-login'>
                <div className='body-login-left'>
                    <img src='./farm.jpg' />
                </div>
                <div className='body-login-right'>
                    <h2>Welcome To Strawberry farm</h2>

                    <form id="form-register" className="signup" onSubmit={handleSubmit}>
                        <h3>Sign Up</h3>

                        <label>Email address:</label>
                        <input
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label>Password:</label>
                        <input
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                        <button className="btn-signup">Sign up</button>
                        <button className="btn-signup" onClick={() => navigate("/login")}>Go to login</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </div> */}

        </>
    )
}

export default Signup