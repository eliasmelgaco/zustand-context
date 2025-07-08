import { useRegistrationFormContext } from '../../contexts/RegistrationFormContext';
import { Button } from '../ui/Button';

export default function RegistrationFormNavigation() {
  const { step, steps, handleBack, isSubmitting, isSubmitted } =
    useRegistrationFormContext();

  return (
    <div className="flex justify-between mt-6">
      {step > 0 && (
        <Button
          type="button"
          data-testid="form-context-back"
          variant="secondary"
          onClick={handleBack}
        >
          Back
        </Button>
      )}
      {step < steps.length - 1 && (
        <Button type="submit" data-testid="form-context-next" variant="primary">
          Next
        </Button>
      )}
      {step === steps.length - 1 && (
        <div className="w-full">
          <Button
            type="submit"
            data-testid="form-context-submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitted ? 'Submitting...' : 'Register'}
          </Button>
        </div>
      )}
    </div>
  );
}
