import React, { useContext } from 'react';
import { DataProvider, DataContext } from '@/context/DataContext';
import { StepContext } from '@/context/StepContext';
import {
  CinForm,
  VaccinForm,
  DeseaseForm,
  PersonalInfo,
} from '@/components/forms';

export function Home() {
  const MAX_STEP = 4;
  const { formStep ,setFormStep} = useContext(StepContext);
  const { isVaccinated } = useContext(DataContext);
  console.log(formStep);
  console.log(isVaccinated);

  // eslint-disable-next-line no-unused-vars
  const goToPreviousStep = () => {
    // eslint-disable-next-line no-undef
    setFormStep((cur) => cur - 1);
  }
  return (
    <DataProvider>
      <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-start text-gray-900 antialiased ">
        <div
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)',
            height: '80rem',
          }}
          className="absolute bg-gradient-to-r from-cyan-500 to-blue-500 inset-x-0 top-0"
        />
        <div className="mx-auto z-10 mt-48 text-center">
          <h1 className="text-white text-5xl font-semibold">
            Welcome To <span className="text-yellow-500">LIQAH</span>
          </h1>
          <p className="text-green-200 mt-2">
            Please Enter The Required Information
          </p>
        </div>
        <div className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-cyan-500 mx-auto overflow-hidden z-10">
          <div className="px-16 py-10 ">
          <div className="flex items-center mb-2">
            {formStep < MAX_STEP && formStep > 0 &&(
              <button onClick={goToPreviousStep} type="button" className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 text-gray-200 hover:text-gray-400 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
               
            )}
             <p className="text-sm text-gray-200 ">
                  {formStep + 1} of {MAX_STEP}
                </p>
                </div>

            {formStep === 0 && <CinForm />}
            {formStep === 1 && <VaccinForm />}
            {formStep === 2 && <DeseaseForm />}
            {formStep === 3 && <PersonalInfo />}
            {formStep === 4 && (
              <section className="bg-gray-100">
                <h2 className="font-semibold text-3xl mb-8">Completed</h2>
              </section>
            )}
          </div>
        </div>
      </div>
    </DataProvider>
  );
}
