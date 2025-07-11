import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { Filter, Search, X } from 'lucide-react';

import { useEmployeeGridStore } from '../../store/employeeGridStore';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';

const EmployeeGridFilters = memo(() => {
  const { filters, roleOptions, setFilters, resetFilters } =
    useEmployeeGridStore();

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilters({ search: event.target.value });
    },
    [setFilters]
  );

  const handleRoleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFilters({ role: event.target.value });
    },
    [setFilters]
  );

  const handleActiveChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value =
        event.target.value === '' ? null : event.target.value === 'true';
      setFilters({ isActive: value });
    },
    [setFilters]
  );

  const hasActiveFilters = useMemo(
    () =>
      filters.search !== '' || filters.role !== '' || filters.isActive !== null,
    [filters]
  );

  const roleOptionsWithAll = useMemo(
    () => [
      {
        value: '',
        label: 'All Roles',
      },
      ...roleOptions.map((item) => ({
        value: item,
        label: item,
      })),
    ],
    [roleOptions]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="relative content-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users..."
              value={filters.search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-row gap-2 w-full">
            <div className="flex flex-row items-center gap-3 w-full">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            </div>

            <Select
              value={filters.role}
              onChange={handleRoleChange}
              options={roleOptionsWithAll}
            />

            <Select
              name="form-context-select-role"
              value={
                filters.isActive === null ? '' : filters.isActive.toString()
              }
              onChange={handleActiveChange}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'true', label: 'Active' },
                { value: 'false', label: 'Inactive' },
              ]}
            />
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="ml-auto flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
                <p className="w-16">Clear All</p>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default EmployeeGridFilters;
