import { memo, RefObject } from 'react';

import EmployeeGridVirtualizedBody from './EmployeeGridVirtualizedBody';
import { useEmployeeGridStore } from '../../store/employeeGridStore';
import EmployeeStateEmpty from './States/EmployeeStateEmpty';
import EmployeeStateError from './States/EmployeeStateError';
import EmployeeStateLoading from './States/EmployeeStateLoading';

interface EmployeeGridBodyProps {
  scrollContainer: RefObject<HTMLDivElement>;
}

const EmployeeGridBody = memo(({ scrollContainer }: EmployeeGridBodyProps) => {
  const { filteredUsers, isLoading, error } = useEmployeeGridStore();

  if (isLoading) {
    return <EmployeeStateLoading />;
  }

  if (error) {
    return <EmployeeStateError />;
  }

  if (!isLoading && filteredUsers.length === 0) {
    return <EmployeeStateEmpty />;
  }

  return (
    <EmployeeGridVirtualizedBody
      users={filteredUsers}
      scrollContainer={scrollContainer}
    />
  );
});

export default EmployeeGridBody;
