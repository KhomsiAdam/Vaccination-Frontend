import React, { useEffect, useState } from 'react';
import { useAxiosPrivate } from '@/hooks';

import Image01 from '../images/user-36-05.jpg';
import Image02 from '../images/user-36-06.jpg';
import Image03 from '../images/user-36-07.jpg';
import Image04 from '../images/user-36-08.jpg';
import Image05 from '../images/user-36-09.jpg';

function DashboardCard10() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/manager/users');
        console.log(response.data);
        if (!response.data.message) {
          setUsers(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, [setUsers]);

  return (
    <div className="bg-white border rounded-sm shadow-lg col-span-full xl:col-span-12 border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Customers</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">CIN</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Address</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {users && users.length > 0
                ? users.map((customer) => {
                    return (
                      <tr key={customer?._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="w-10 h-10 mr-2 shrink-0 sm:mr-3">
                          <img
                            className="rounded-full"
                            src={customer?.image}
                            width="40"
                            height="40"
                            alt={customer?.name}
                          />
                        </div> */}
                            <div className="font-medium text-slate-800">
                              {customer?.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{customer?.email}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="font-medium text-left text-green-500">
                            {customer?.cin}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">
                            {customer?.address}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <button
                            type="button"
                            className="p-1 text-center text-gray-100 bg-green-700 rounded"
                            value={customer?.cin}
                          >
                            Validate
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ''}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
