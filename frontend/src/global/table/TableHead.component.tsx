import clsx from 'clsx';
import { ITableHeader } from '../../interface/global.interface';

const TableHead = ({ columns, loading, color, textcolor }: ITableHeader) => {
  return (
    <thead className="rounded-t-md">
      {loading ? (
        <span className="w-full h-4 bg-gray-300 rounded-md animate-pulse" />
      ) : (
        <tr className="rounded-t-md">
          {columns?.map((item, index: number) => (
            <th
              key={item?.key}
              className={clsx(
                'w-auto text-sm border-b  font-medium text-gray-500  py-2 px-4 text-nowrap',
                // If title is "Action", center the text, otherwise align to start
                item?.title?.toString().toLowerCase() === 'action'
                  ? 'text-center'
                  : 'text-start',
                color && color,
                !color && 'bg-gray-50',
                textcolor && textcolor,
                index === 0 && 'rounded-tl-sm',
                index === columns.length - 1 && 'rounded-tr-sm'
              )}
            >
              {item?.title}
            </th>
          ))}
        </tr>
      )}
    </thead>
  );
};

export default TableHead;
