import { memo, RefObject, useMemo } from 'react';
import EmployeeGridVirtualizedBody from './EmployeeGridVirtualizedBody';
import { AlertCircle, Loader2, Users } from 'lucide-react';
import { useEmployeeGridStore } from '../../store/employeeGridStore';

interface EmployeeGridBodyProps {
  scrollContainer: RefObject<HTMLDivElement>;
}

const EmployeeGridBody = memo(({ scrollContainer }: EmployeeGridBodyProps) => {
  const { filters, filteredUsers, isLoading, error } = useEmployeeGridStore();

  const hasActiveFilters = useMemo(
    () =>
      filters.search !== '' || filters.role !== '' || filters.isActive !== null,
    [filters]
  );

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={5}>
            <div
              className="h-full p-4 flex items-center justify-center"
              data-testid="data-grid-loading"
            >
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-lg text-gray-600">
                  Loading employee data...
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={5}>
            <div className="text-center py-12" data-testid="data-grid-error">
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <p className="text-lg text-gray-900 mb-2">Error loading data</p>
              <p className="text-gray-600">{error}</p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (!isLoading && filteredUsers.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={5}>
            <div className="text-center py-12" data-testid="data-grid-empty">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">
                {hasActiveFilters
                  ? 'No matching results'
                  : 'No employees found'}
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <EmployeeGridVirtualizedBody
      users={filteredUsers}
      scrollContainer={scrollContainer}
    />
  );
});

export default EmployeeGridBody;
