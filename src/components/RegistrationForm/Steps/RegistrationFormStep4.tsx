import { useRegistrationFormContext } from '../../../contexts/RegistrationFormContext';

export default function RegistrationFormStep1() {
  const { values } = useRegistrationFormContext();

  return (
    <div
      data-testid="form-context-review"
      className="mb-4 p-4 bg-gray-50 rounded"
    >
      <h3 className="font-semibold mb-2">Review</h3>
      <div>
        <span className="font-medium">Name:</span>
        <p data-testid="form-context-review-name">{values.name}</p>
      </div>
      <div>
        <span className="font-medium">Email:</span>
        <p data-testid="form-context-review-email">{values.email}</p>
      </div>
      <div>
        <span className="font-medium">Role:</span>
        <p data-testid="form-context-review-role">{values.role}</p>
      </div>
    </div>
  );
}
