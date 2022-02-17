/*eslint-disable*/
import React from 'react';

export const MultiStep = () => {
  const [formStep, setFormStep] = React.useState(0);
  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };
  const renderButton = () => {
    if (formStep > 2) {
      return undefined;
    } else if (formStep === 2) {
      return (
        <button
          onClick={completeFormStep}
          type="button"
          className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Confirmation
        </button>
      );
    } else {
      return (
        <button
          onClick={completeFormStep}
          type="button"
          className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-start text-gray-900 antialiased relative">
      <div
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)',
          height: '34rem',
        }}
        className="absolute bg-gradient-to-r from-cyan-500 to-blue-500 inset-x-0 top-0"
      ></div>
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
          <form>
            {formStep === 0 && (
              <section className="bg-gray-100">
                <h2 className="font-semibold text-3xl mb-8">
                  Personal Information
                </h2>
                <label htmlFor="cin">Cin</label>
                <input type="text" id="cin" name="cin" className="text-input px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline" />
              </section>
            )}
            {formStep === 1 && (
              <section className="bg-gray-100">
                <h2 className="font-semibold text-3xl mb-8">
                  Vaccination Information
                </h2>

                {/* <label htmlFor="vaccin1">Vaccin 1</label>
                <input
                  type="radio"
                  id="vaccin1"
                  name="radio-4"
                  className="radio  radio-primary"
                  
                />
                 <label htmlFor="vaccin1">Vaccin 2</label>
                <input
                  type="radio"
                  id="vaccin2"
                  name="radio-4"
                  className="radio radio-primary"
                />
                 <label htmlFor="vaccin1">Vaccin 3</label>
                 <input
                  type="radio"
                  id="vaccin3"
                  name="radio-4"
                  className="radio radio-primary"
                /> */}
                <ul class="grid grid-cols-3 gap-x-5 m-10 max-w-md mx-auto">
                  <li className="relative">
                    <input
                      className="sr-only peer"
                      type="radio"
                      value="vaccin1"
                      name="vaccination"
                      id="vaccin1"
                    />
                    <label
                      className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
                      for="vaccin1"
                    >
                      Vaccin 1
                    </label>

                    <div className="absolute hidden w-5 h-5 peer-checked:block top-10 right-3">
                      👍
                    </div>
                  </li>
                  <li className="relative">
                    <input
                      className="sr-only peer"
                      type="radio"
                      value="vaccin2"
                      name="vaccination"
                      id="vaccin2"
                    />
                    <label
                      className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent"
                      for="vaccin2"
                    >
                      Vaccin 2
                    </label>

                    <div className="absolute hidden w-5 h-5 peer-checked:block top-10 right-3">
                    👍
                    </div>
                  </li>

                  <li className="relative">
                    <input
                      className="sr-only peer"
                      type="radio"
                      value="vaccin3"
                      name="vaccination"
                      id="vaccin3"
                    />
                    <label
                      className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-yellow-500 peer-checked:ring-2 peer-checked:border-transparent"
                      for="vaccin3"
                    >
                      vaccin 3
                    </label>

                    <div className="absolute hidden w-5 h-5 peer-checked:block top-10 right-3">
                    👍
                    </div>
                  </li>
                </ul>
              </section>
            )}
            {formStep === 2 && (
              <section className="bg-gray-100">
                <h2 className="font-semibold text-3xl mb-8">
                  Personal Information
                </h2>
              </section>
            )}
            {formStep === 3 && (
              <section className="bg-gray-100">
                <h2 className="font-semibold text-3xl mb-8">Completed</h2>
              </section>
            )}
            {renderButton()}
          </form>
        </div>
      </div>
    </div>
  );
};
