import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router"
import * as Yup from 'yup';
import "./Login.scss"
import {  Field, Form, Formik } from "formik"
import {  getAuth, sendPasswordResetEmail } from "firebase/auth";


const ForgetPassword = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin()
  const [alert, setAlert] = useState(null);
  const [loginError, setLoginError] = useState("");
  return (
    <div className='body-login'>
      <div className='body-login-left'>
        <img src='./farm.jpg' />
      </div>
      <div className='body-login-right'>
        <h2>Lấy Lại Mật Khẩu</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
          })}
          onSubmit={(values) => {
            const email = values.email;
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
              .then(() => {
                navigate("/");
              })
              .catch((error) => {
                console.log(error);
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
              {loginError && <div className="errorMessage">{loginError}</div>}
              <button type="submit" className="btn-login">Gửi</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )



}

export default ForgetPassword