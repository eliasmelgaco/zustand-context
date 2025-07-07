import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useEmployeeGridStore } from '../../store/employeeGridStore';

const EmployeeGridPagination = memo(() => {
  const { pagination, setPagination } = useEmployeeGridStore();

  const handlePageChange = useCallback(
    (page: number) => setPagination(page),
    [setPagination]
  );

  const handlePageSizeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newPageSize = parseInt(event.target.value);
      setPagination(1, newPageSize);
    },
    [setPagination]
  );

  const paginationText = useMemo(() => {
    const startItem = (pagination.currentPage - 1) * pagination.pageSize + 1;
    const endItem = Math.min(
      pagination.currentPage * pagination.pageSize,
      pagination.totalItems
    );

    return `Showing ${startItem} to ${endItem} of ${pagination.totalItems} results`;
  }, [pagination.currentPage, pagination.pageSize, pagination.totalItems]);

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-700">{paginationText}</div>

        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">
            Show:
          </label>
          <select
            id="pageSize"
            value={pagination.pageSize}
            onChange={handlePageSizeChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={700}>700</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

export default EmployeeGridPagination;
