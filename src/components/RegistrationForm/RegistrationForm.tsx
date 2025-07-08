import { createElement, FormEvent } from 'react';
import { useRegistrationFormContext } from '../../contexts/RegistrationFormContext';

import RegistrationFormNavigation from './RegistrationFormNavigation';

const Submitted = () => {
  return (
    <div
      data-testid="form-context-success"
      className="bg-green-100 text-green-800 p-4 rounded text-center font-semibold"
    >
      Registration successful!
    </div>
  );
};

export default function RegistrationForm() {
  const { isSubmitted, step, steps, handleNext } = useRegistrationFormContext();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleNext();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 data-testid="form-context-title" className="text-2xl font-bold mb-4">
        Registration Form
      </h2>

      {!isSubmitted ? (
        <form onSubmit={handleFormSubmit}>
          {createElement(steps[step].component)}

          <RegistrationFormNavigation />
        </form>
      ) : (
        <Submitted />
      )}
    </div>
  );
}
