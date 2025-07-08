import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  JSX,
} from 'react';

type FormValues = {
  name: string;
  email: string;
  role: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type RegistrationFormContextType = {
  steps: Step[];
  values: FormValues;
  step: number;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  setField: (field: keyof FormValues, value: string) => void;
  setError: (field: keyof FormValues, error: string) => void;
  validate: () => boolean;
  handleBack: () => void;
  handleNext: () => void;
};

const defaultValues: FormValues = { name: '', email: '', role: '' };

const RegistrationFormContext = createContext<
  RegistrationFormContextType | undefined
>(undefined);

interface Step {
  label: string;
  component: () => JSX.Element;
}
interface RegistrationFormProviderProps {
  children: ReactNode;
  steps: Step[];
}

export function useRegistrationFormContext() {
  const ctx = useContext(RegistrationFormContext);
  if (!ctx) {
    throw new Error(
      'useRegistrationFormContext must be used within RegistrationFormProvider'
    );
  }
  return ctx;
}

export function RegistrationFormProvider({
  children,
  steps,
}: RegistrationFormProviderProps) {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setField = (field: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const setError = (field: keyof FormValues, error: string) => {
    setErrors((e) => ({ ...e, [field]: error }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!values.name) {
      newErrors.name = 'Name is required';
    }

    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!values.role) {
      newErrors.role = 'Role is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function validateField(field: 'name' | 'email' | 'role'): boolean {
    let error = '';
    if (field === 'name' && !values.name) error = 'Name is required';
    if (field === 'email') {
      if (!values.email) error = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(values.email)) error = 'Invalid email';
    }
    if (field === 'role' && !values.role) error = 'Role is required';

    setError(field, error);
    return !error;
  }

  const handleBack = () => setStep((s) => s - 1);

  const handleNext = () => {
    if (step < steps.length - 1) {
      if (step === 0 && !validateField('name')) return;
      if (step === 1 && !validateField('email')) return;
      if (step === 2 && !validateField('role')) return;
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (validate()) {
      setIsSubmitted(true);
    }
    setIsSubmitting(false);
  };

  return (
    <RegistrationFormContext.Provider
      value={{
        values,
        step,
        steps,
        errors,
        isSubmitting,
        isSubmitted,
        setStep,
        setField,
        setError,
        validate,
        handleBack,
        handleNext,
      }}
    >
      {children}
    </RegistrationFormContext.Provider>
  );
}
