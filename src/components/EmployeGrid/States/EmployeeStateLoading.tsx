import { memo } from 'react';
import { Loader2 } from 'lucide-react';

const EmployeeStateLoading = memo(() => {
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
              <p className="text-lg text-gray-600">Loading employee data...</p>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
});

export default EmployeeStateLoading;
