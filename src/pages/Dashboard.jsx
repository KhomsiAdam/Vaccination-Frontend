// /* eslint-disable react/jsx-props-no-spreading */
// import { useState, useRef, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// // import { Sidebar } from '@/components/sidebar';
// import DataContext from '@/context/DataContext';
// import { axiosPrivate } from '@/api/axios';
// import { useLogout } from '@/hooks';

// const CENTER_ENPOINT = '/center';

// export function Dashboard() {
//   const [centerName, setCenterName] = useState();
//   const centerNameRef = useRef();
//   const { adminRegion } = useContext(DataContext);

//   const navigate = useNavigate();
//   const logout = useLogout();
//   const signOut = async () => {
//     await logout();
//     navigate('/login');
//   };

//   const {
//     register,
//     formState: { errors },
//   } = useForm({ mode: 'all' });

//   const submitCreate = async () => {
//     const response = await axiosPrivate.post(
//       CENTER_ENPOINT,
//       JSON.stringify({
//         centerName,
//         region: adminRegion,
//       })
//     );
//     console.log(response.data);
//   };

//   return (
//     <>
//       <button type="button" onClick={signOut}>
//         Sign Out
//       </button>
//       <label htmlFor="create-center-modal" className="btn modal-button">
//         Create center
//       </label>
//       <input type="checkbox" id="my-modal" className="modal-toggle" />
//       <div className="modal">
//         <div className="modal-box">
//           <label
//             htmlFor="center"
//             className="font-medium text-gray-700 select-none"
//           >
//             Center name
//           </label>
//           <input
//             id="center"
//             type="text"
//             name="center"
//             ref={centerNameRef}
//             {...register('name', {
//               required: { value: true, message: 'Please enter a Name' },
//             })}
//             onChange={(e) => setCenterName(e.target.value)}
//             value={centerName}
//             placeholder="name"
//             className="px-4 py-2 text-green-600 placeholder-green-600 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
//           />
//           {errors.name && (
//             <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
//           )}

//           <div className="modal-action">
//             <button type="button" className="btn" onClick={submitCreate}>
//               Send
//             </button>
//             <label htmlFor="create-center-modal" className="btn">
//               Close
//             </label>
//           </div>
//         </div>
//       </div>
//     </>
//     // <div className="flex flex-wrap">test</div>
//     // <div className="flex flex-wrap mt-4" />
//   );
// }
import React, { useEffect, useState } from 'react';

import Sidebar from './Sidebar';
import Header from './Header';
// import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
// import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
// import FilterButton from '../partials/actions/FilterButton';
// import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from './DashboardCard01';
import DashboardCard02 from './DashboardCard02';
import DashboardCard03 from './DashboardCard03';
// import DashboardCard04 from '../partials/dashboard/DashboardCard04';
// import DashboardCard05 from '../partials/dashboard/DashboardCard05';
// import DashboardCard06 from './DashboardCard06';
// import DashboardCard07 from '../partials/dashboard/DashboardCard07';
// import DashboardCard08 from '../partials/dashboard/DashboardCard08';
// import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from './DashboardCard10';
import { axiosPrivate } from '@/api/axios';
// import DashboardCard11 from '../partials/dashboard/DashboardCard11';
// import DashboardCard12 from '../partials/dashboard/DashboardCard12';
// import DashboardCard13 from '../partials/dashboard/DashboardCard13';

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState('');

  // get All Regions
  useEffect(async () => {
    // eslint-disable-next-line no-use-before-define
    const response = await axiosPrivate.get('/stats');
    // const data = await response.json();
    console.log(response.data);
    setStats(response.data);

    return async () => {
      const response = await axiosPrivate.get('/stats');
      setStats(response.data);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {stats ? (
                <>
                  <DashboardCard01 data={stats.vaccine1} />
                  <DashboardCard02 data={stats.vaccine2} />
                  <DashboardCard03 data={stats.vaccine3} />
                </>
              ) : (
                ''
              )}
              {/* Bar chart (Direct vs Indirect) */}
              {/* <DashboardCard04 /> */}
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}
              {/* Doughnut chart (Top Countries) */}
              {/* <DashboardCard06 /> */}
              {/* Table (Top Channels) */}
              {/* <DashboardCard07 /> */}
              {/* Line chart (Sales Over Time) */}
              {/* <DashboardCard08 /> */}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/* <DashboardCard09 /> */}
              {/* Card (Customers) */}
              <DashboardCard10 />
              {/* Card (Reasons for Refunds) */}
              {/* <DashboardCard11 /> */}
              {/* Card (Recent Activity) */}
              {/* <DashboardCard12 /> */}
              {/* Card (Income/Expenses) */}
              {/* <DashboardCard13 /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
