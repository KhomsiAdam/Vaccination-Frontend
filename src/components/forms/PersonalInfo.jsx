/* eslint-disable*/
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import DataContext from '@/context/DataContext';
import StepContext from '@/context/StepContext';
import { axiosPrivate } from '@/api/axios';


const VERIFY_ENPOINT = '/user/register';


export function PersonalInfo() {

  const { completeFormStep } = useContext(StepContext);
 const {cin ,cinRef ,setCin ,age ,ageRef ,setAge ,name ,
  nameRef,
  setName,
  phone,
  phoneRef,
  setPhone,
  zipcode,
  zipcodeRef,
  setZipcode,
  city,
  cityRef,
  setCity,
  address,
  addressRef,
  setAddress,
  email,
  emailRef,
  setEmail
 } = useContext(DataContext);
  
  const {
    watch,
    register,
    formState: { errors, isvalid },
  } = useForm({ mode: 'all' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosPrivate.post(
      VERIFY_ENPOINT,
      JSON.stringify({nom, cin, birthday, phone, zipcode, city, address, vaccination, email }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    if (response?.data) {
      console.log(`test : ${response?.data}`);
    } else {
      completeFormStep();
    }

    console.log('HELLO');
  };

  return (
    <section className="bg-gray-100">
    <h2 className=" text-gray-500 font-semibold text-3xl mb-8">
      Personal Information
    </h2>
    <div class="flex flex-col space-y-2">
      <label
        htmlFor="name"
        class="text-gray-700 select-none font-medium"
      >
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        ref={nameRef}
        placeholder="name"
        {...register('name', {
          required: { value: true, message: 'Please enter a Name' },
        })}
        class="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
       {errors.name && (
          <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
        )}
      <label
        htmlFor="cin"
        class="text-gray-700 select-none font-medium"
      >
        Cin
      </label>
      <input
        id="cin"
        type="text"
        name="cin"
        value ={cin}
        ref={cinRef}
        placeholder="cin"
        readOnly="true"
        class="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
      
       <label
        htmlFor="birthday"
        class="text-gray-700 select-none font-medium"
      >
        Birthday
      </label>
      <input
        id="birthday"
        type="text"
        name="birthday"
        value={age}
        ref={ageRef}
        readOnly
        placeholder="birthday"
        class="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
        <label
        htmlFor="phone"
        class="text-gray-700 select-none font-medium"
      >
        Phone
      </label>
      <input
        id="phone"
        type="text"
        name="phone"
        ref={phoneRef}
        {...register('phone', {
          required: { value: true, message: 'Please enter a Phone' },
        })}
        placeholder="phone"
        class="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
       {errors.phone && (
          <p className="text-red-600 text-sm mt-2">{errors.phone.message}</p>
        )}
       <label
        htmlFor="zipcode"
        class="text-gray-700 select-none font-medium"
      >
        Zip Code
      </label>
      <input
        id="zipcode"
        type="text"
        name="zipcode"
        ref={zipcodeRef}
        placeholder="zip code"
        {...register('zipcode', {
          required: { value: true, message: 'Please enter a zip code' },
        })}
        class="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
       {errors.zipcode && (
          <p className="text-red-600 text-sm mt-2">{errors.zipcode.message}</p>
        )}
       <label
        htmlFor="city"
        class="text-gray-700 select-none font-medium"
      >
        City
      </label>
      <input
        id="city"
        type="text"
        name="city"
        ref={cityRef}
        {...register('city', {
          required: { value: true, message: 'Please enter a city' },
        })}
        placeholder="City"
        class="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
       {errors.city && (
          <p className="text-red-600 text-sm mt-2">{errors.city.message}</p>
        )}
       <label
        htmlFor="address"
        class="text-gray-700 select-none font-medium"
      >
       Address
      </label>
      <input
        id="address"
        type="text"
        name="address"
        ref={addressRef}
        placeholder="address"
        {...register('address', {
          required: { value: true, message: 'Please enter a address' },
        })}
        class="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
       {errors.address && (
          <p className="text-red-600 text-sm mt-2">{errors.address.message}</p>
        )}
       <label
        htmlFor="email"
        class="text-gray-700 select-none font-medium"
      >
        Email
      </label>
      <input
        id="email"
        type="text"
        name="email"
        ref={emailRef}
        {...register('email', {
          required: { value: true, message: 'Please enter a email' },
        })}
        placeholder="Email"
        class="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
       {errors.email && (
          <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
        )}
    </div>
    <button
          onClick={(e)=>{completeFormStep;handleSubmit}}
          type="button"
          className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Completed
        </button>
  </section>
  );
}
