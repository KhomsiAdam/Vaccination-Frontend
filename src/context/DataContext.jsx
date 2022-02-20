/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect, useRef } from 'react';

export const DataContext = createContext({});

export function DataProvider({ children }) {
  const [cin, setCin] = useState('');
  const cinRef = useRef();
  const [age, setAge] = useState('');
  const ageRef = useRef();
  const [vaccination, setVaccination] = useState('');
  const vaccinationRef = useRef();
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [name, setName] = useState('');
  const nameRef = useRef();
  const [phone, setPhone] = useState('');
  const phoneRef = useRef();
  const [zipCode, setZipCode] = useState('');
  const zipCodeRef = useRef();
  const [city, setCity] = useState('');
  const cityRef = useRef();
  const [address, setAddress] = useState('');
  const addressRef = useRef();
  const [email, setEmail] = useState('');
  const emailRef = useRef();

  useEffect(() => {
    localStorage.setItem('vaccination', vaccination);
  }, [vaccination]);

  return (
    <DataContext.Provider
      value={{
        cin,
        cinRef,
        setCin,
        age,
        ageRef,
        setAge,
        vaccination,
        setVaccination,
        vaccinationRef,
        isVaccinated,
        setIsVaccinated,
        name,
        nameRef,
        setName,
        phone,
        phoneRef,
        setPhone,
        zipCode,
        zipCodeRef,
        setZipCode,
        city,
        cityRef,
        setCity,
        address,
        addressRef,
        setAddress,
        email,
        emailRef,
        setEmail
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
