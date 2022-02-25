/*eslint-disable*/
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks';

import { axiosPrivate } from '@/api/axios';

const LOGIN_ENDPOINT = '/login';

export function Login() {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        LOGIN_ENDPOINT,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.token;
      const roles = response?.data?.role;
      setAuth({ email, password, roles, accessToken });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      // errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    // <div className="h-screen mx-2 md:flex md:w-[500px]">
    //   <div className="flex md:w-1/2 justify-center rounded-lg items-center bg-white">
    //     <form className="bg-white p-6" onSubmit={handleSubmit}>
    //       <h1 className="text-gray-800 font-bold text-2xl mb-1">
    //         Hello Again!
    //       </h1>
    //       <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

    //       <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5"
    //           viewBox="0 0 20 20"
    //           fill="currentColor"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //         <input
    //           className="pl-2 outline-none border-none"
    //           type="email"
    //           id="email"
    //           name="email"
    //           ref={userRef}
    //           autoComplete="off"
    //           onChange={(e) => setEmail(e.target.value)}
    //           value={email}
    //           required
    //           placeholder="Email Address"
    //         />
    //       </div>
    //       <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5 text-gray-400"
    //           viewBox="0 0 20 20"
    //           fill=""
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //         <input
    //           className="pl-2 outline-none border-none"
    //           type="password"
    //           id="password"
    //           name="password"
    //           onChange={(e) => setPassword(e.target.value)}
    //           value={password}
    //           requiredtype="text"
    //           placeholder="password"
    //         />
    //       </div>
    //       <div className="persistCheck">
    //         <input
    //           type="checkbox"
    //           id="persist"
    //           onChange={togglePersist}
    //           checked={persist}
    //         />
    //         <label htmlFor="persist">Remember me</label>
    //       </div>
    //       <button
    //         type="submit"
    //         className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
    //       >
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button className="btn-primary" type="submit">
          Sign In
        </button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Remember me</label>
        </div>
        <p
          ref={errRef}
          className="text-center text-red-600"
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </form>
      <p className="my-2 text-center">
        Not having an Account?
        <br />
        <span className="line">
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </span>
      </p>
    </section>
  );
}
