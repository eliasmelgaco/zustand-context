import { memo, useRef } from 'react';
import { useEmployeeGridStore } from '../../store/employeeGridStore';
import EmployeeGridFilters from './EmployeeGridFilters';
import EmployeeGridHeader from './EmployeeGridHeader';
import EmployeeGridPagination from './EmployeeGridPagination';
import EmployeeGridBody from './EmployeeGridBody';

const EmployeeGrid = memo(() => {
  const { filteredUsers } = useEmployeeGridStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Employee Directory
          </h1>
          <p className="text-gray-600">
            Manage and view employee information with advanced filtering and
            sorting capabilities
          </p>
        </div>

        <EmployeeGridFilters />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div
            ref={scrollRef}
            className="overflow-y-auto h-[calc(100vh-450px)]"
            data-testid="data-grid-scrollable"
          >
            <table
              className="table-fixed w-full border-collapse"
              data-testid="data-grid-table"
            >
              <EmployeeGridHeader />

              <EmployeeGridBody scrollContainer={scrollRef} />
            </table>
          </div>

          {filteredUsers.length > 0 && <EmployeeGridPagination />}
        </div>
      </div>
    </div>
  );
});

export default EmployeeGrid;
