import { useEffect } from 'react';
import { useEmployeeGridStore } from '../../store/employeeGridStore';
import EmployeeGrid from './EmployeeGrid';

import { generateMockUsers } from '../utils/dataGenerator';

export default function EmployeePage() {
  const { setUsers, setIsLoading, setError } = useEmployeeGridStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call
        await new Promise((resolve) => setTimeout(() => resolve({}), 2000));

        // Mock users
        const mockUsers = generateMockUsers(1000);
        setUsers(mockUsers);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to load data'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [setUsers, setIsLoading, setError]);

  return <EmployeeGrid />;
}
