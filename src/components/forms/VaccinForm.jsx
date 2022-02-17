import { useContext } from 'react';
import DataContext from '@/context/DataContext';
import StepContext from '@/context/StepContext';
import { axiosPrivate } from '@/api/axios';

const VERIFY_ENPOINT = '/user/vaccinVerify';

export function VaccinForm() {
  const {
    cin,
    vaccination,
    setVaccination,
    vaccinationRef,
    isVaccinated,
    setIsVaccinated,
  } = useContext(DataContext);
  const { completeFormStep } = useContext(StepContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosPrivate.post(
      VERIFY_ENPOINT,
      JSON.stringify({ cin, vaccination }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    if (response?.data?.vaccine) {
      setIsVaccinated(true);
      console.log(isVaccinated);
    } else {
      completeFormStep();
    }

    console.log(response?.data);
  };

  console.log(vaccination);
  return (
    <section className="bg-gray-100">
      <h2 className="font-semibold text-3xl mb-8">Vaccination Information</h2>
      <form>
        <ul className="grid grid-cols-3 gap-x-5 m-10 max-w-md mx-auto">
          <li className="relative">
            <input
              className="sr-only peer"
              type="radio"
              value="vaccin1"
              ref={vaccinationRef}
              onClick={(e) => setVaccination(e.target.value)}
              name="vaccination"
              id="vaccin1"
            />
            <label
              className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
              htmlFor="vaccin1"
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
              ref={vaccinationRef}
              onClick={(e) => setVaccination(e.target.value)}
              name="vaccination"
              id="vaccin2"
            />
            <label
              className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent"
              htmlFor="vaccin2"
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
              ref={vaccinationRef}
              onClick={(e) => setVaccination(e.target.value)}
              name="vaccination"
              id="vaccin3"
            />
            <label
              className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-yellow-500 peer-checked:ring-2 peer-checked:border-transparent"
              htmlFor="vaccin3"
            >
              Vaccin 3
            </label>

            <div className="absolute hidden w-5 h-5 peer-checked:block top-10 right-3">
              👍
            </div>
          </li>
        </ul>
        <button
          onClick={handleSubmit}
          type="button"
          className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </form>
    </section>
  );
}
