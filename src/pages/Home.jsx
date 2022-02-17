import React, { useContext } from 'react';
import { DataProvider, DataContext } from '@/context/DataContext';
import { StepContext } from '@/context/StepContext';
import { CinForm, VaccinForm } from '@/components/forms';

export function Home() {
  const { formStep } = useContext(StepContext);
  const { isVaccinated } = useContext(DataContext);
  console.log(formStep);
  console.log(isVaccinated);

  return (
    <DataProvider>
      <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-start text-gray-900 antialiased relative">
        <div
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)',
            height: '34rem',
          }}
          className="absolute bg-gradient-to-r from-cyan-500 to-blue-500 inset-x-0 top-0"
        />
        <div className="mx-auto z-10 mt-48 text-center">
          <h1 className="text-white text-5xl font-semibold">
            Welcome To <span className="text-yellow-500">IBRA</span>
          </h1>
          <p className="text-green-200 mt-2">
            Please Enter The Required Information
          </p>
        </div>
        <div className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-cyan-500 mx-auto overflow-hidden z-10">
          <div className="px-16 py-10 ">
            {formStep === 0 && <CinForm />}
            {formStep === 1 && <VaccinForm />}
            {formStep === 2 && (
              <form>
                <section className="bg-gray-100">
                  <h2 className="font-semibold text-3xl mb-8">
                    Personal Information
                  </h2>
                </section>
              </form>
            )}
            {formStep === 3 && (
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
