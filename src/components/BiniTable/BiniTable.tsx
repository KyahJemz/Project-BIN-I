import Link from 'next/link';
import React from 'react';

interface ITableProps<T> {
    header?: string;
    columns: string[];
    data: T[];
    link: string;
    onEdit?: (data: T) => void;
    onDelete?: (id: string) => void;
    onAdd?: () => void;
}

const BiniTable = <T extends { id: string }>({
    header,
    columns,
    data,
    link,
    onEdit,
    onDelete,
    onAdd,
}: ITableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            {(header || onAdd) && (
                <div className="flex justify-between mb-4">
                    {header && <h2 className="text-lg font-bold">{header}</h2>}
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                        >
                            Add
                        </button>
                    )}
                </div>
            )}

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
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
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {(item as any)[column]}
                                </td>
                            ))}
                            {(onEdit || onDelete || link) && (
                               
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {link && (
                                        <Link href={`${link}/${item._id}`} className="text-indigo-600 hover:text-indigo-900">
                                            View
                                        </Link>
                                    )}
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-indigo-600 hover:text-indigo-900 ml-4"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(item._id.toString())}
                                            className="text-red-600 hover:text-red-900 ml-4"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BiniTable;