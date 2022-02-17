import { useContext } from 'react';
import DataContext from '@/context/DataContext';
import StepContext from '@/context/StepContext';

export function CinForm() {
  const { cin, cinRef, setCin, age, ageRef, setAge } = useContext(DataContext);
  const { completeFormStep } = useContext(StepContext);
  console.log(`User CIN: ${cin}`);
  console.log(`User age: ${age}`);

  return (
    <section className="bg-gray-100">
      <form>
        <h2 className="font-semibold text-3xl mb-8">Personal Information</h2>
        <label htmlFor="cin">Cin</label>
        <input
          type="text"
          id="cin"
          name="cin"
          ref={cinRef}
          onChange={(e) => setCin(e.target.value)}
          value={cin}
          className="text-input px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
        />
        <input
          type="date"
          id="age"
          name="age"
          ref={ageRef}
          onChange={(e) => setAge(e.target.value)}
          value={age}
          className="text-input px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={completeFormStep}
          type="button"
          className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </form>
    </section>
  );
}
