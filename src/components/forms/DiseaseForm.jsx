/* eslint-disable react/no-array-index-key */
import { useContext, useState, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import DataContext from '@/context/DataContext';
import diseases from '@/data/diseasesData';
import StepContext from '@/context/StepContext';

export function DiseaseForm() {
  const { completeFormStep } = useContext(StepContext);
  const [selects, setSelects] = useState();
  const [isCheck, setIsCheck] = useState(false);
  const isCheckRef = useRef();

  // function handleChange(event) {
  //   setIsCheck(event.target.value === '');
  // }

  const handleChange = (e) => {
    if (e.target.value === 'Yes') {
      setIsCheck(true);
    } else if (e.target.value === 'No') {
      setIsCheck(false);
    }
  };

  const healthCheck = () => {
    if (!isCheck) completeFormStep();
  };

  return (
    <section className="bg-gray-100">
      <h2 className="text-gray-500 font-semibold text-3xl mb-8">
        Do you suffer from an illness or disease ?
      </h2>
      <ul className="grid grid-cols-2 gap-x-5 m-10 max-w-md mx-auto">
        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            value="Yes"
            ref={isCheckRef}
            name="vaccination"
            id="yes"
            onChange={(e) => handleChange(e)}
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="yes"
          >
            Yes
          </label>

          <div className="absolute hidden w-5 h-5 peer-checked:block top-10 right-3" />
        </li>
        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            value="No"
            ref={isCheckRef}
            name="vaccination"
            id="no"
            onChange={(e) => handleChange(e)}
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="no"
          >
            No
          </label>

          <div className="absolute hidden w-5 h-5 peer-checked:block top-10 right-3" />
        </li>
      </ul>
      {isCheck ? (
        <>
          <select
            className="select w-full max-w-xs select-accent bg-white"
            onChange={(e) => setSelects(e.target.value)}
            defaultValue="Pick a disease or illness"
            disabled={!isCheck}
          >
            <option value="" disabled>
              Pick a disease or illness
            </option>
            {diseases.map((disease) => (
              <option
                value={`${disease.medication}: ${disease.treatment}`}
                key={disease.id}
              >
                {disease.disease}
              </option>
            ))}
          </select>
          <p className="my-4">{selects}</p>
        </>
      ) : null}
      <button
        onClick={healthCheck}
        type="button"
        disabled={isCheck}
        className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next Step
      </button>
    </section>
  );
}

export default DiseaseForm;
