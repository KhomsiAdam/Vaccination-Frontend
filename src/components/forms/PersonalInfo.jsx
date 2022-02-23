/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import moment from 'moment';
import DataContext from '@/context/DataContext';
import StepContext from '@/context/StepContext';
import { axiosPrivate } from '@/api/axios';

const REGISTER_ENPOINT = '/register';
const CENTER_ENPOINT = '/centers';

export function PersonalInfo() {
  const [regions, setRegions] = useState();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [centers, setCenters] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');

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
    setAppointment,
  } = useContext(DataContext);

  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'all' });

  // get All Regions
  useEffect(async () => {
    // eslint-disable-next-line no-use-before-define
    const response = await axios.get(
      'https://calm-fjord-14795.herokuapp.com/api/regions'
    );
    // const data = await response.json();
    console.log(response.data);
    setRegions(response.data);

    return async () => {
      const response = await axios.get(
        'https://calm-fjord-14795.herokuapp.com/api/regions'
      );
      setRegions(response.data);
    };
  }, []);

  // get cities from region
  const handleChange = async (e) => {
    setSelectedRegion(e.target.value);
    const response = await axiosPrivate.post(
      CENTER_ENPOINT,
      JSON.stringify({
        region: e.target.value,
      })
    );
    console.log(response.data);
    setCenters(response.data);
  };

  const getAge = (date) =>
    Math.floor((new Date() - new Date(date).getTime()) / 3.15576e10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    moment.addRealMonth = function addRealMonth(d) {
      const fm = moment(d).add(1, 'M');
      const fmEnd = moment(fm).endOf('month');
      return d.date() !== fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD')) ? fm.add(1, 'd') : fm;
    };
    const nextMonth = moment.addRealMonth(moment());
    setAppointment(nextMonth.format('MMMM Do YYYY'));
    console.log(nextMonth.format());
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
        vaccination: 'vaccin1',
        appointment: nextMonth.format(),
        region: selectedRegion,
        center: selectedCenter,
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
      {vaccination === '' ? (
        <>
          <h2 className=" text-gray-500 font-semibold text-3xl mb-8">
            Personal Information
          </h2>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="name"
              className="text-gray-700 select-none font-medium"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              ref={nameRef}
              {...register('name', {
                required: { value: true, message: 'Please enter a Name' },
              })}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="name"
              className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
            )}
            <label
              htmlFor="cin"
              className="text-gray-700 select-none font-medium"
            >
              Cin
            </label>
            <input
              id="cin"
              type="text"
              name="cin"
              value={cin}
              placeholder="cin"
              readOnly
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
              readOnly
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
              {...register('phone', {
                required: { value: true, message: 'Please enter a Phone' },
              })}
              ref={phoneRef}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="phone"
              className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-2">
                {errors.phone.message}
              </p>
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
              {...register('zipcode', {
                required: { value: true, message: 'Please enter a zip code' },
              })}
              ref={zipCodeRef}
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
              placeholder="zipcode"
              className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.zipcode && (
              <p className="text-red-600 text-sm mt-2">
                {errors.zipcode.message}
              </p>
            )}
            <label
              htmlFor="city"
              className="text-gray-700 select-none font-medium"
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
              onChange={(e) => setCity(e.target.value)}
              value={city}
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
              {...register('address', {
                required: { value: true, message: 'Please enter a address' },
              })}
              ref={addressRef}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="address"
              className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-2">
                {errors.address.message}
              </p>
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
              {...register('email', {
                required: { value: true, message: 'Please enter a email' },
              })}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="px-4 py-2 rounded-lg border border-green-500 text-green-600 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

            <label
              htmlFor="phone"
              className="text-gray-700 select-none font-medium"
            >
              Select Region and city for appointment
            </label>
            <select
              className="select w-full max-w-xs select-accent text-green-600 bg-white"
              onChange={(e) => handleChange(e)}
              defaultValue="Select your region"
            >
              <option className="text-green-600 focus:outline-none" disabled>
                Select your region
              </option>
              {regions &&
                regions.map((region) => (
                  <option value={region.region} key={region.id}>
                    {region.region}{' '}
                  </option>
                ))}
            </select>
            <select
              className="select w-full max-w-xs select-accent text-green-600 bg-white"
              {...register('center', {
                required: { value: true, message: 'Please select a center' },
              })}
              onChange={(e) => {
                setSelectedCenter(e.target.value);
              }}
              defaultValue="Select your center"
            >
              <option className="text-green-600 focus:outline-none" disabled>
                Select your center
              </option>
              {centers && !centers.message &&
                centers.map((center) => (
                  <option value={center.center} key={center._id}>
                    {center.center}{' '}
                  </option>
                ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            type="button"
            className="mt-6 bg-cyan-500 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Complete
          </button>
        </>
      ) : (
        <div>Your next appointment is set to:</div>
      )}
    </section>
  );
}
