import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  forwardRef,
  ForwardedRef,
} from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button.component';
import Checkbox from './CheckBox.component';
import { IMasterTable } from '../interface/global.interface';
import Pagination from './Pagination';
import TableBody from './table/TableBody.component';
import TableHead from './table/TableHead.component';

// Extend the interface to include ref for the table element
interface IMasterTableWithRef extends IMasterTable {
  ref?: ForwardedRef<HTMLTableElement | null>;
}

const MasterTable = forwardRef<
  HTMLTableElement | HTMLDivElement | null,
  IMasterTable
>(
  (
    {
      columns,
      loading,
      pagination,
      rows,
      color,
      textcolor,
      className,
      // Checkbox props
      showCheckbox = false,
      selectedIds = [],
      onSelectAll,
      onSelectRow,
      primaryKey = '_id',
      onBulkAction,
      bulkActionLabel = 'Delete Selected',
      showBulkActions = true,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [maxWidth, setMaxWidth] = useState<number>(0);

    // Calculate available width dynamically
    useEffect(() => {
      const calculateMaxWidth = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const padding = 48; // 24px padding on each side (p-6)
          const availableWidth = containerWidth - padding;
          setMaxWidth(availableWidth);
        }
      };

      calculateMaxWidth();

      // Recalculate on window resize
      window.addEventListener('resize', calculateMaxWidth);
      return () => window.removeEventListener('resize', calculateMaxWidth);
    }, []);

    // Get all available IDs from rows
    const allIds = useMemo(() => {
      return rows?.map((row) => row[primaryKey]).filter(Boolean);
    }, [rows, primaryKey]);

    // Check if all rows are selected
    const isAllSelected = useMemo(() => {
      return (
        allIds?.length > 0 && allIds?.every((id) => selectedIds?.includes(id))
      );
    }, [allIds, selectedIds]);

    // Check if some rows are selected (for indeterminate state)
    const isSomeSelected = useMemo(() => {
      return selectedIds?.length > 0 && selectedIds?.length < allIds?.length;
    }, [selectedIds, allIds]);

    // Handle select all checkbox
    const handleSelectAll = () => {
      if (onSelectAll) {
        onSelectAll(!isAllSelected, allIds);
      }
    };

    // Handle individual row selection
    const handleRowSelect = (id: string | number) => {
      if (onSelectRow) {
        const isSelected = selectedIds?.includes(id);
        onSelectRow(id, !isSelected);
      }
    };

    // Create columns with checkbox if enabled
    const enhancedColumns = useMemo(() => {
      if (!showCheckbox) return columns;

      const checkboxColumn = {
        key: 'checkbox',
        title: '',
        render: ({ row }: { row: any }) => (
          <Checkbox
            checked={selectedIds?.includes(row[primaryKey])}
            onChange={() => handleRowSelect(row[primaryKey])}
            className="h-4 w-4"
          />
        ),
      };

      return [checkboxColumn, ...columns];
    }, [showCheckbox, columns, selectedIds, primaryKey]);

    // Create header columns with select all checkbox if enabled
    const headerColumns = useMemo(() => {
      if (!showCheckbox) return columns;

      const selectAllColumn = {
        key: 'checkbox',
        title: (
          <Checkbox
            checked={isAllSelected}
            onChange={handleSelectAll}
            className="h-4 w-4"
            ref={(input) => {
              if (input) {
                input.indeterminate = isSomeSelected;
              }
            }}
          />
        ),
      };

      return [selectAllColumn, ...columns];
    }, [showCheckbox, columns, isAllSelected, handleSelectAll]);

    return (
      <div
        ref={containerRef}
        className={twMerge(
          'w-full max-w-full h-full p-4 mb-4 rounded-md bg-white overflow-hidden',
          className
        )}
      >
        {/* Bulk Actions */}
        {showCheckbox && showBulkActions && selectedIds.length > 0 && (
          <div className="mb-4 flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm text-primaryBlue font-medium">
              {selectedIds.length} item(s) selected
            </span>
            {onBulkAction && (
              <Button
                variant="primary"
                size="sm"
                title={bulkActionLabel}
                onClick={() => onBulkAction(selectedIds)}
                className="bg-red-600 hover:bg-red-700"
              />
            )}
          </div>
        )}

        <div
          className="w-full overflow-x-auto rounded-sm border border-gray-200 shadow-sm"
          style={{ maxWidth: maxWidth > 1184 ? `${maxWidth}px` : '100%' }}
        >
          <table
            ref={ref as React.Ref<HTMLTableElement>}
            className="min-w-full rounded-sm bg-white border-separate border-spacing-0"
          >
            <TableHead
              columns={headerColumns}
              loading={loading}
              color={color}
              textcolor={textcolor}
            />
            <TableBody
              columns={enhancedColumns}
              rows={rows}
              loading={loading}
            />
          </table>
        </div>
        {!!pagination && <Pagination {...pagination} />}
      </div>
    );
  }
);

// Add display name for better debugging
MasterTable.displayName = 'MasterTable';

export default MasterTable;
