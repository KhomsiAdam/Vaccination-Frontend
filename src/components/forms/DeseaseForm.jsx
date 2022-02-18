/* eslint-disable*/
import { useContext ,useState ,useRef} from 'react';
import { useForm } from 'react-hook-form';
import DataContext from '@/context/DataContext';
import deseases from '@/data/deseasesData'
import StepContext from '@/context/StepContext';


export function DeseaseForm() {

  const { completeFormStep } = useContext(StepContext);
  const [selects,setSelects] = useState();
  const [isCheck ,setIsCheck] = useState(true);
  const isCheckRef = useRef();

  function handleChange(event){
    setIsCheck(event.target.value ==="");
  }
  

  return (
    <section className="bg-gray-100">
    <h2 className="text-gray-500 font-semibold text-3xl mb-8">
      Desease Information
    </h2>
    <ul className="grid grid-cols-2 gap-x-5 m-10 max-w-md mx-auto">
      <li className="relative">
        <input
          className="sr-only peer"
          type="radio"
          value="sick"
          ref={isCheckRef}
          name="vaccination"
          id="sick"
          onChange={(e) =>handleChange(e)}
        />
        <label
          className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent"
          htmlFor="sick"
        >
          sick
        </label>

        <div className="absolute hidden w-5 h-5 peer-checked:block top-10 right-3">
          
        </div>
      </li>
      <li className="relative">
        <input
          className="sr-only peer"
          type="radio"
          value="Not"
          name="vaccination"
          id="not"
        />
        <label
          className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
          htmlFor="not"
        >
          Not
        </label>

        <div className="absolute hidden w-5 h-5 peer-checked:block top-10 right-3">
          
        </div>
      </li>
    </ul>
    {
      <select
        className="select w-full max-w-xs select-accent"
        onChange={(e) => setSelects(e.target.value)}
        defaultValue={selects} 
        disabled={isCheck}
      >
        <option disabled selected>
          What is your Disease?
        </option>
        {deseases.map((desease, index) => (
          <option value={desease.treatment} key={index}>
            {desease.disease}
          </option>
        ))}
      </select>
    }
    <h1>{selects}</h1>
    <button
          onClick={completeFormStep}
          type="button"
          className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
  </section>
  );
}
