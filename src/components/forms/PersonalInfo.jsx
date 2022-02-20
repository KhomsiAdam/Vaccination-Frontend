/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import DataContext from '@/context/DataContext';
import StepContext from '@/context/StepContext';
import { axiosPrivate } from '@/api/axios';

const REGISTER_ENPOINT = '/register';

export function PersonalInfo() {
  const { completeFormStep } = useContext(StepContext);
  const {
    cin,
    age,
    name,
    setName,
    nameRef,
    phone,
    phoneRef,
    setPhone,
    zipCode,
    zipCodeRef,
    setZipCode,
    city,
    cityRef,
    setCity,
    address,
    addressRef,
    setAddress,
    email,
    emailRef,
    setEmail,
    vaccination,
  } = useContext(DataContext);

  const {
    watch,
    register,
    formState: { errors, isvalid },
  } = useForm({ mode: 'all' });

  const getAge = (date) =>
    Math.floor((new Date() - new Date(date).getTime()) / 3.15576e10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axiosPrivate.post(
      REGISTER_ENPOINT,
      JSON.stringify({
        name,
        cin,
        age: getAge(age),
        phone,
        zipCode,
        city,
        address,
        vaccination,
        email,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    if (response) {
      console.log(response);
      completeFormStep();
    }
  };

  return (
    <section className="bg-gray-100">
      <h2 className=" text-gray-500 font-semibold text-3xl mb-8">
        Personal Information
      </h2>
      <div className="flex flex-col space-y-2 w-full">
        <label htmlFor="name" className="text-gray-700 select-none font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          ref={nameRef}
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="name"
          // {...register('name', {
          //   required: { value: true, message: 'Please enter a Name' },
          // })}
          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
        )}
        <label htmlFor="cin" className="text-gray-700 select-none font-medium">
          Cin
        </label>
        <input
          id="cin"
          type="text"
          name="cin"
          value={cin}
          placeholder="cin"
          readOnly="true"
          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
        />

        <label
          htmlFor="birthday"
          className="text-gray-700 select-none font-medium"
        >
          Birthday
        </label>
        <input
          id="birthday"
          type="text"
          name="birthday"
          value={age}
          readOnly="true"
          placeholder="birthday"
          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        <label
          htmlFor="phone"
          className="text-gray-700 select-none font-medium"
        >
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          ref={phoneRef}
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          // {...register('phone', {
          //   required: { value: true, message: 'Please enter a Phone' },
          // })}
          placeholder="phone"
          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-2">{errors.phone.message}</p>
        )}
        <label
          htmlFor="zipcode"
          className="text-gray-700 select-none font-medium"
        >
          Zip Code
        </label>
        <input
          id="zipcode"
          type="text"
          name="zipcode"
          ref={zipCodeRef}
          onChange={(e) => setZipCode(e.target.value)}
          value={zipCode}
          placeholder="zipcode"
          // {...register('zipcode', {
          //   required: { value: true, message: 'Please enter a zip code' },
          // })}
          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        {errors.zipcode && (
          <p className="text-red-600 text-sm mt-2">{errors.zipcode.message}</p>
        )}
        <label htmlFor="city" className="text-gray-700 select-none font-medium">
          City
        </label>
        <input
          id="city"
          type="text"
          name="city"
          ref={cityRef}
          onChange={(e) => setCity(e.target.value)}
          value={city}
          // {...register('city', {
          //   required: { value: true, message: 'Please enter a city' },
          // })}
          placeholder="City"
          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        {errors.city && (
          <p className="text-red-600 text-sm mt-2">{errors.city.message}</p>
        )}
        <label
          htmlFor="address"
          className="text-gray-700 select-none font-medium"
        >
          Address
        </label>
        <input
          id="address"
          type="text"
          name="address"
          ref={addressRef}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="address"
          // {...register('address', {
          //   required: { value: true, message: 'Please enter a address' },
          // })}
          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        {errors.address && (
          <p className="text-red-600 text-sm mt-2">{errors.address.message}</p>
        )}
        <label
          htmlFor="email"
          className="text-gray-700 select-none font-medium"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          // {...register('email', {
          //   required: { value: true, message: 'Please enter a email' },
          // })}
          placeholder="Email"
          className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        type="button"
        className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Complete
      </button>
    </section>
  );
}
