import { RegistrationFormProvider } from '../../contexts/RegistrationFormContext';
import RegistrationForm from './RegistrationForm';
import RegistrationFormStep1 from './Steps/RegistrationFormStep1';
import RegistrationFormStep2 from './Steps/RegistrationFormStep2';
import RegistrationFormStep3 from './Steps/RegistrationFormStep3';
import RegistrationFormStep4 from './Steps/RegistrationFormStep4';

export const steps = [
  { label: 'Name', component: RegistrationFormStep1 },
  { label: 'Email', component: RegistrationFormStep2 },
  { label: 'Role', component: RegistrationFormStep3 },
  { label: 'Review', component: RegistrationFormStep4 },
];

export default function RegistrationPage() {
  return (
    <RegistrationFormProvider steps={steps}>
      <RegistrationForm />
    </RegistrationFormProvider>
  );
}
