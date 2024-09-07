import AddIcon from '@/svgs/add.svg';
import DeleteIcon from '@/svgs/delete.svg';
import EditIcon from '@/svgs/edit.svg';
import ViewIcon from '@/svgs/view.svg';
import { formatDate, formatFullDate, formatTime } from '@/utils/utilities';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IGridProps<T> {
    header?: string;
    data: T[];
    link: string;
    grid?: string;  // New parameter to determine the grid layout
    type: 'announcement' | 'event' | 'news' | 'post';
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onAdd?: () => void;
}

const BiniCard: React.FC<BiniCardProps> = ({ type, details }) => {
    switch (type) {
        case 'announcement':
            return (
                <div className="bg-white rounded-lg p-4">
                    <Image height={500} width={500} src={"/images/announcements/" + details.image} alt={details.title} className="w-full h-48 object-cover"/>
                    <h3 className="font-bold text-lg mt-2">{details.title}</h3>
                    <p className="text-sm font-semibold text-gray-500 mt-1">{details.author}</p>
                    <p className="text-sm font-light text-gray-500 mt-1">Created: {formatFullDate(details.createdAt)}</p>
                </div>
            );
        case 'event':
            return (
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg p-2">
                    <Image
                        height={500}
                        width={500}
                        src={details?.image ? `/images/events/${details.image}` : '/images/default-event.jpg'}
                        alt={details?.title || "Event Image"}
                        className="w-full h-56 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full text-gray-800 p-2">
                        <div className="bg-gray-100 w-12 rounded-l ml-4 mb-1 border border-black-900 rounded overflow-hidden shadow-lg">
                            <div className='w-auto h-4 bg-red-600'></div>
                            <p className="font-bold text-xl text-center px-2 pt-2">
                                {details?.eventDate ? new Date(details.eventDate).getDate() : 'TBD'}
                            </p>
                            <p className="text-xs font-bold uppercase text-center px-2 pb-2">
                                {details?.eventDate ? new Date(details.eventDate).toLocaleString('default', { month: 'short' }) : ''}
                            </p>
                        </div>
                        <div className="bg-white p-2 w-full">
                            <p className="text-sm font-semibold">{details?.title || ''}</p>
                            <p className="text-sm font-light">{details?.eventLocation ?? ''}</p>
                            {details?.eventDate && details?.eventTime && (
                                <p className="text-sm font-light">
                                    {formatDate(details.eventDate)} at {details.eventTime}
                                </p>
                            )}
                            {(!details?.eventDate && !details?.eventTime) && (
                                <p className="text-sm font-light">Date & Time TBD</p>
                            )}
                        </div>
                    </div>
                </div>
            );
        case 'news':
            return (
                <div className="bg-white rounded-lg p-4">
                    <h3 className="font-bold text-lg">{details.title}</h3>
                    <Image height={500} width={500} src={"/images/news/" + details.image} alt={details.title} className="w-full h-48 object-cover mt-4" />
                    <p className="mt-4">{details.description}</p>
                    <p className="text-sm text-gray-500">{details.author}</p>
                    <p className="text-xs text-gray-400 mt-2">Created: {formatFullDate(details.createdAt)}</p>
                </div>
            );
        case 'post':
            return (
                <div className="bg-white rounded-lg p-4">
                    <h3 className="font-bold text-lg">{details.title}</h3>
                    <p className="text-sm font-semibold text-gray-500">{details.author}</p>
                    <img src={"/images/posts/" + details.image} alt={details.title} className="w-full h-48 object-cover mt-4" />
                    <p className="mt-4">{details.description}</p>
                    <p className="text-xs text-gray-400 mt-2">Created: {formatFullDate(details.createdAt)}</p>
                </div>
            );
        default:
            return null;
    }
};

const BiniGrid = <T extends { id: string }>({
    header,
    data,
    link,
    grid = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    type,
    onEdit,
    onDelete,
    onAdd,
}: IGridProps<T>) => {
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

            <div className={`grid ${grid} gap-4`}>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white flex flex-col justify-between shadow-md rounded-lg overflow-hidden border border-gray-200 relative"
                    >

                        <BiniCard type={type} details={item} />

                        {(onEdit || onDelete || link) && (
                            <div className="flex justify-end space-x-1 p-4 absolute bottom-0 right-0">
                                {link && (
                                    <Link href={`${link}/${item._id}`} className="text-indigo-600 hover:text-indigo-900">
                                        <ViewIcon />
                                    </Link>
                                )}
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(item._id.toString())}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        <EditIcon />
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(item._id.toString())}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <DeleteIcon />
                                    </button>
                                )}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </>
    );
};

export default BiniGrid;
