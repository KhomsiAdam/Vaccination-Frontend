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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
