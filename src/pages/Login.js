import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router"
import * as Yup from 'yup';
import "./Login.scss"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Navigate } from "react-router-dom"
import { onValue, ref } from "firebase/database";
import { dbFirebase } from "../app/firebaseCongfig";
import { authFirebase } from "../app/authfirebaseConfig";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
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

  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin()
  const [alert, setAlert] = useState(null);
 
  const [loginError, setLoginError] = useState("");
  const handleForgetPassword = () => {
    navigate('/forgetpassword');
  }
  return (
    <div className='body-login'>
      <div className='body-login-left'>
        <img src='./farm.jpg' />
      </div>
      <div className='body-login-right'>
        {/* <h2>Welcome To Strawberry farm</h2> */}
        <h2>Đăng Nhập</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
          })}
          onSubmit={(values) => {
            const { email, password } = values;
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                  window.location.href = "/home";
                }
              })
              .catch((error) => {
                console.error(error);
                // alert("Email hoặc mật khẩu không chính xác!");
                setLoginError("Email hoặc mật khẩu không chính xác!");
              });
          }}
        >
          {({ errors, touched }) => (
        <Form id="form-login">
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          {errors.email && touched.email && (
            <div className="errorMessage">{errors.email}</div>
          )}

          <label htmlFor="password">Mật Khẩu</label>
          <Field name="password" type="password" />
          {errors.password && touched.password && (
            <div className="errorMessage">{errors.password}</div>
          )}

          {loginError && <div className="errorMessage">{loginError}</div>}

          <button type="submit" className="btn-login">Gửi</button>
          <button onClick={handleForgetPassword}className="btn-login">Quên Mật Khẩu</button>
        </Form>
      )}
        </Formik>
      </div>
    </div>
  )



}

export default Login