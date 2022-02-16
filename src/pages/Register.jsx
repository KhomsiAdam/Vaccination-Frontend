import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '@/api/axios';

const REGISTER_ENDPOINT = '/register';

export function Register() {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        REGISTER_ENDPOINT,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      setEmail('');
      setPassword('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Email already is use');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h2>Success!</h2>
          <p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </section>
      ) : (
        <section>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              ref={emailRef}
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

            <button
              onClick={handleSubmit}
              type="submit"
              className="btn-primary"
            >
              Sign Up
            </button>
            <p
              ref={errRef}
              className="text-center text-red-600"
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </form>
          <p className="my-2 text-center">
            Already have an account?
            <br />
            <span className="line">
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}
