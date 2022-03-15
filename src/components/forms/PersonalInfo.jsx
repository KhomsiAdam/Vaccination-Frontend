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

  // const [delayed, setDelayed] = useState('1991-12-03');
  // const [notDelayed, setNotDelayed] = useState('2000-12-03');

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
    appointment,
    setAppointment,
    isSideEffect,
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
      return d.date() !== fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD'))
        ? fm.add(1, 'd')
        : fm;
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
          <h2 className="mb-8 text-3xl font-semibold text-gray-500 ">
            Personal Information
          </h2>
          <div className="flex flex-col w-full space-y-2">
            <label
              htmlFor="name"
              className="font-medium text-gray-700 select-none"
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
              className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
            <label
              htmlFor="cin"
              className="font-medium text-gray-700 select-none"
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
              className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />

            <label
              htmlFor="birthday"
              className="font-medium text-gray-700 select-none"
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
              className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <label
              htmlFor="phone"
              className="font-medium text-gray-700 select-none"
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
              className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}

            <label
              htmlFor="zipcode"
              className="font-medium text-gray-700 select-none"
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
              className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.zipcode && (
              <p className="mt-2 text-sm text-red-600">
                {errors.zipcode.message}
              </p>
            )}
            <label
              htmlFor="city"
              className="font-medium text-gray-700 select-none"
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
              className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.city && (
              <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
            )}
            <label
              htmlFor="address"
              className="font-medium text-gray-700 select-none"
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
              className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
            <label
              htmlFor="email"
              className="font-medium text-gray-700 select-none"
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
              className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}

            <label
              htmlFor="phone"
              className="font-medium text-gray-700 select-none"
            >
              Select Region and city for appointment
            </label>
            <select
              className="w-full text-green-600 bg-white select select-accent"
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
              className="w-full text-green-600 bg-white select select-accent"
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
              {centers &&
                !centers.message &&
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
            className="w-full px-8 py-6 mt-6 text-white rounded bg-cyan-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Complete
          </button>
        </>
      ) : (
        <section className="bg-gray-100">
          {isSideEffect ? (
            <>
              <h2 className="mb-8 text-3xl font-semibold">Completed</h2>
              <p className="text-center">
                Your appointment is delayed by another month: {appointment}
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-8 text-3xl font-semibold">Completed</h2>
              <p className="text-center">
                Your appointment is planned next month: {appointment}
              </p>
            </>
          )}
        </section>
      )}
    </section>
  );
}
