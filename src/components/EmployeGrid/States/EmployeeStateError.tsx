import { memo } from 'react';
import { AlertCircle } from 'lucide-react';

import { useEmployeeGridStore } from '../../../store/employeeGridStore';

const EmployeeStateError = memo(() => {
  const { error } = useEmployeeGridStore();

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
});

export default EmployeeStateError;
