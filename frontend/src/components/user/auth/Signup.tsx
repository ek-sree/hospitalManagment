import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { createUserAxios } from '../../../constraints/axios/userAxios';
import { userEndpoints } from '../../../constraints/endpoints/userEndpoints';
import { SignupFormValues } from '../../../interface/AuthInterface'
import { toast, Toaster } from 'sonner';
import signImg from '../../../../public/LoginImage/signup.jpg';

const Signup = () => {

  const userAxios = createUserAxios(null);


  const navigate = useNavigate();

  const validationSchema = Yup.object({
    userName: Yup.string().required('Name is required'),
  
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits and contain only numbers')
      .required('Phone is required'),
  
    age: Yup.number()
      .min(18, 'You must be at least 18 years old')
      .required('Age is required'),
  
    bloodGroup: Yup.string()
      .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Invalid blood group')
      .required('Blood group is required'),
  
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  
  
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      phone: '',
      age:'',
      bloodGroup:'',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: SignupFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void })=> {
       try {
       
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...userData } = values;
        const dataToSend = {
          ...userData, 
        };
        const response = await userAxios?.post(userEndpoints?.register,dataToSend)
        console.log("res",response);
        
        if(response.status==200){
            navigate('/home');
        }
       }catch (error: any) {  
        const errorMessage = error?.response?.data?.message || "Registration failed";
        toast.error(errorMessage);
        console.log("Error registering", error);
       }finally{
        setSubmitting(false)
       }
    },
});

  return (
    <div className="bg-slate-800 min-h-screen w-full flex flex-col md:flex-row">
       <Toaster position="top-center" expand={false} richColors />
      <div className="md:flex-1 flex items-center justify-center p-4 md:p-0">
        <img
          src={signImg}
          alt="Signup"
          className={`object-cover md:pl-11 h-[200px] md:h-[580px] w-full rounded-md shadow-sm shadow-white`}
        />
      </div>
      <div className="md:flex-1 flex items-center justify-center p-4">
        <div className="shadow-md shadow-slate-100 border border-white flex flex-col p-4 w-full max-w-[450px] rounded-md bg-zinc-900">
          <h1 className="text-white text-center mb-4 text-xl">Welcome Signup User</h1>

    

          <form onSubmit={formik.handleSubmit} className="text-white flex flex-col">
            <label htmlFor="name" className="mb-2">Name</label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="mb-4 p-2 rounded-xl bg-slate-800"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="text-red-500 mb-1 text-sm">{formik.errors.userName}</div>
            ) : null}

            <label htmlFor="email" className="mb-2">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="mb-4 p-2 rounded-xl bg-slate-800"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mb-4">{formik.errors.email}</div>
            ) : null}

        
                <label htmlFor="phone" className="mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="mb-4 p-2 rounded-xl bg-slate-800"
                  placeholder="Enter your phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />


<div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="age" className="mb-2">Age</label>
      <input
        type="number"
        name="age"
        id="age"
        className="mb-4 p-2 rounded-xl bg-slate-800 w-full"
        placeholder="Enter your age"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.age}
      />
      {formik.touched.age && formik.errors.age ? (
        <div className="text-red-500 mb-4">{formik.errors.age}</div>
      ) : null}
    </div>

    <div>
      <label htmlFor="bloodGroup" className="mb-2">Blood Group</label>
      <select
        name="bloodGroup"
        id="bloodGroup"
        className="mb-4 p-2 rounded-xl bg-slate-800 w-full"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.bloodGroup}
      >
        <option value="" label="Select :-" />
        <option value="A+" label="A+" />
        <option value="A-" label="A-" />
        <option value="B+" label="B+" />
        <option value="B-" label="B-" />
        <option value="AB+" label="AB+" />
        <option value="AB-" label="AB-" />
        <option value="O+" label="O+" />
        <option value="O-" label="O-" />
      </select>
      {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
        <div className="text-red-500 mb-4">{formik.errors.bloodGroup}</div>
      ) : null}
    </div>
  </div>
         

            <label htmlFor="password" className="mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="mb-4 p-2 rounded-xl bg-slate-800"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mb-4">{formik.errors.password}</div>
            ) : null}

            <label htmlFor="confirmPassword" className="mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              className="mb-4 p-2 rounded-xl bg-slate-800"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 mb-4">{formik.errors.confirmPassword}</div>
            ) : null}

            <div className="flex justify-center">
              <button type="submit" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full md:w-36 min-h-10 rounded-md">
                Submit
              </button>
            </div>
          </form>

         <Link to='/'> <div className="text-center mt-4 cursor-pointer">
            <p className="text-white">
              Already have an account.? <span className="text-blue-500 underline">Login</span>
            </p>
          </div></Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;