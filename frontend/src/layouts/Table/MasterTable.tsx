import React from 'react';

interface Column {
  title: string;
  key: string;
  render?: (value: any, record: any) => React.ReactNode;
}

interface TableData {
  columns: Column[];
  data: any[];
}

interface MasterTableProps {
  tableData: TableData;
  onRowClick?: (record: any) => void;
  className?: string;
}

const MasterTable: React.FC<MasterTableProps> = ({
  tableData,
  onRowClick,
  className = '',
}) => {
  const { columns, data } = tableData;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="table">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="table-cell font-semibold text-left">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={index}
              className={`table-row ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(record)}
            >
              {columns.map((column) => (
                <td key={column.key} className="table-cell">
                  {column.render
                    ? column.render(record[column.key], record)
                    : record[column.key] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-grey-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default MasterTable;
