import { useContext } from 'react';
import DataContext from '@/context/DataContext';

export function Completed() {
  const { appointment } = useContext(DataContext);

  return (
    <section className="bg-gray-100">
      <h2 className="font-semibold text-3xl mb-8">Completed</h2>
      <p className="text-center">
        Your appointment is planned next month: {appointment}
      </p>
    </section>
  );
}
