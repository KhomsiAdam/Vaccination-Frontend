/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

export const StepContext = createContext({});

export function StepProvider({ children }) {
  const [formStep, setFormStep] = useState(0);

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  return (
    <StepContext.Provider
      value={{
        formStep,
        setFormStep,
        completeFormStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export default StepContext;
