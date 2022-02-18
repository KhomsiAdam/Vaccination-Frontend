/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import {  useForm } from 'react-hook-form';
import DataContext from '@/context/DataContext';
import StepContext from '@/context/StepContext';

export function CinForm() {
  const { cin, cinRef, setCin, age, ageRef, setAge } = useContext(DataContext);
  const { completeFormStep  } = useContext(StepContext);
  const [disable ,setDisable] = useState(true);
  const {
    
    register,
    formState: { errors },
  } = useForm({ mode: 'all' });

  console.log(`User CIN: ${cin}`);
  console.log(`User age: ${age}`);

  function handleChange(event){
    setDisable(event.target.value ==="");
  }
  

  return (
    <section className="bg-gray-100">
      <form>
        <h2 className="text-gray-500 font-semibold text-3xl mb-8">Personal Information</h2>
        <label htmlFor="cin">Cin</label>
        <input
          type="text"
          id="cin"
          name="cin"
          ref={cinRef}
          {...register('cin', {
            required: { value: true, message: 'Please enter a cin' },
          })}
          onChange={(e) => {setCin(e.target.value); handleChange(e)}}
          value={cin}
          className="text-input px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
        />
        {errors.cin && (
          <p className="text-red-600 text-sm mt-2">{errors.cin.message}</p>
        )}

        <label htmlFor="cin">Birthday</label>
        <input
          type="date"
          id="age"
          name="age"
          ref={ageRef}
          {...register('age', {
            required: { value: true, message: 'Please enter Your birthday' },
          })}
          onChange={(e) => {setAge(e.target.value); handleChange(e)}}
          value={age}
          className="text-input px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
        />
        {errors.age && (
          <p className="text-red-600 text-sm mt-2">{errors.age.message}</p>
        )}

        <button
          disabled = {disable}
          onClick={completeFormStep}
          type="button"
          className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </section>
  );
}
