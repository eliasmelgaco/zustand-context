import { memo, useMemo } from 'react';
import { Users } from 'lucide-react';

import { useEmployeeGridStore } from '../../../store/employeeGridStore';

const EmployeeStateEmpty = memo(() => {
  const { filters } = useEmployeeGridStore();

  const hasActiveFilters = useMemo(
    () =>
      filters.search !== '' || filters.role !== '' || filters.isActive !== null,
    [filters]
  );

  return (
    <tbody>
      <tr>
        <td colSpan={5}>
          <div className="text-center py-12" data-testid="data-grid-empty">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-2">
              {hasActiveFilters ? 'No matching results' : 'No employees found'}
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
});

export default EmployeeStateEmpty;
