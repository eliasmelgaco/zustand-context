import { useRegistrationFormContext } from '../../../contexts/RegistrationFormContext';
import { Input } from '../../ui/Input';

export default function RegistrationFormStep1() {
  const { values, errors, setField } = useRegistrationFormContext();

  return (
    <Input
      name="email"
      data-testid="form-context-input-email"
      label="Email"
      value={values.email}
      error={errors.email}
      onChange={(e) => setField('email', e.target.value)}
    />
  );
}
