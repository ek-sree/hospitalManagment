import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { createUserAxios } from "../../../constraints/axios/userAxios";
import { userEndpoints } from "../../../constraints/endpoints/userEndpoints";
import { createDoctorAxios } from "../../../constraints/axios/doctorAxios";
import { doctorEndpoints } from "../../../constraints/endpoints/doctorEndpoints";
import { toast, Toaster } from "sonner";
import hospitalImage from '../../../../public/LoginImage/hospital.jpg';

const Login = () => {
  const userAxios = createUserAxios(null);
  const sellerAxios = createDoctorAxios(null);
  const [isDoctor, setIsDoctor] = useState('user');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      try {
        const axiosInstance = isDoctor === 'doctor' ? userAxios : sellerAxios;
        const endpoints = isDoctor === 'doctor' ? userEndpoints : doctorEndpoints;

        const response = await axiosInstance.post(endpoints.login, values);
        console.log("Login response", response);
        if(response.status === 200 && response.data.data.user.role === 'user') {
          navigate('/');
        } else if(response.status === 200 && response.data.data.user.role === "doctor") {
          navigate('/doctor/home');
        } else {
          toast.error("Credentials don't match");
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "Error occurred, can't login";
        toast.error(errorMessage);
        console.log("Error logging in", error);
      }
    },
  });

  return (
    <div className="bg-white min-h-screen w-full flex flex-col md:flex-row">
      <Toaster position="top-center" expand={false} richColors />
      <div className="md:flex-1 flex items-center justify-center p-4">
        <div className="shadow-md shadow-slate-100 border border-white flex flex-col p-4 w-full max-w-[450px] rounded-md bg-lightGreen">
          <h1 className="text-slate-800 text-center mb-4 text-xl">
            Welcome, Login {isDoctor === 'doctor' ? 'Doctor' : 'User'}
          </h1>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsDoctor('user')}
              className={`px-4 py-2 rounded-l-md ${
                isDoctor === 'user' 
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-black' 
                  : 'bg-slate-100 text-black'
              }`}
            >
              User
            </button>
            <button
              onClick={() => setIsDoctor('doctor')}
              className={`px-4 py-2 rounded-r-md ${
                isDoctor === 'doctor' 
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-black' 
                  : 'bg-slate-100 text-black'
              }`}
            >
              Doctor
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="text-slate-800 flex flex-col">
            <label htmlFor="email" className="mb-2">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="mb-4 p-2 rounded-xl bg-slate-200 text-white"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mb-4">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password" className="mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="mb-4 p-2 rounded-xl bg-slate-200 text-white"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mb-4">{formik.errors.password}</div>
            ) : null}

            <div className="flex justify-center">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full md:w-36 min-h-10 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>

          {isDoctor === 'user' && (
            <Link to='/signup'>
              <div className="text-center mt-4 cursor-pointer">
                <p className="text-black">
                  Click here to <span className="text-blue-500">Sign up</span>
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="md:flex-1 flex items-center justify-center mr-8 p-4 md:p-0">
        <img
          src={hospitalImage}
          alt="Signup"
          className="object-contain h-[100px] md:h-[400px] w-full rounded-md shadow-sm shadow-white"
        />
      </div>
    </div>
  );
};

export default Login;
