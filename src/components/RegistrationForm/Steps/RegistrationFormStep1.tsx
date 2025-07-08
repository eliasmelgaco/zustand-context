import { useRegistrationFormContext } from '../../../contexts/RegistrationFormContext';
import { Input } from '../../ui/Input';

export default function RegistrationFormStep1() {
  const { values, errors, setField } = useRegistrationFormContext();

  return (
    <Input
      name="name"
      data-testid="form-context-input-name"
      label="Name"
      value={values.name}
      error={errors.name}
      onChange={(e) => setField('name', e.target.value)}
    />
  );
}
