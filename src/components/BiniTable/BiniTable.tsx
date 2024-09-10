import AddIcon from '@/svgs/add.svg';
import DeleteIcon from '@/svgs/delete.svg';
import EditIcon from '@/svgs/edit.svg';
import ViewIcon from '@/svgs/view.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ITableProps<T> {
    header?: string;
    columns: string[];
    data: T[];
    link: string;
    client?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onAdd?: () => void;
}
const BiniTable = <T extends { id: string }>({
    header,
    columns,
    data,
    link,
    client = false,
    onEdit,
    onDelete,
    onAdd,
}: ITableProps<T>) => {
    const router = useRouter();

    function onLinkClick (link: string) {
        if(link === '') return;
        router.push(link);
    }
    
    return (
        <>
            {(header || onAdd) && (
                <div className="flex justify-between mb-4 px-1">
                    {header && <h2 className="text-lg font-bold">{header}</h2>}
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 flex flex-row gap-2"
                        >
                            <AddIcon />
                            Add New
                        </button>
                    )}
                </div>
            )}

            <div className='overflow-x-auto'>
                <table className="min-w-full divide border">
                    <thead className="bg-gray-50 border">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                                >
                                    {column}
                                </th>
                            ))}
                            {(onEdit || onDelete || link) && (
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index} onClick={client ? () => onLinkClick(item?._id ? `${link}/${item._id}` : '') : undefined} className='cursor-pointer hover:bg-gray-200 z-0'>
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                        {(item as any)[column]}
                                    </td>
                                ))}
                                {(onEdit || onDelete || link) && (

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-left  z-10">
                                        {link && (
                                            <Link href={`${link}/${item._id}`}  className="text-indigo-600 hover:text-indigo-900">
                                                <ViewIcon />
                                            </Link>
                                        )}
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(item._id.toString())}
                                                className="text-indigo-600 hover:text-indigo-900 ml-4"
                                            >
                                                <EditIcon />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(item._id.toString())}
                                                className="text-red-600 hover:text-red-900 ml-4"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default BiniTable;
