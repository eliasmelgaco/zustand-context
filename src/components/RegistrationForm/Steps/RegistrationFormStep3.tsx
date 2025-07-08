import { useRegistrationFormContext } from '../../../contexts/RegistrationFormContext';

import { Select } from '../../ui/Select';

export default function RegistrationFormStep1() {
  const { values, errors, setField } = useRegistrationFormContext();

  return (
    <Select
      name="role"
      data-testid="form-context-select-role"
      label="Role"
      value={values.role}
      error={errors.role}
      onChange={(e) => setField('role', e.target.value)}
      options={[
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
      ]}
    />
  );
}
