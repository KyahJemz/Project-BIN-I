import Link from 'next/link';
import React from 'react';

interface IGridProps<T> {
    header?: string;
    data: T[];
    link: string;
}

interface ITutorialDetails {
    title: string;
    description: string;
    completed?: boolean;
}

const LessonCard = ({ details }: { details: ITutorialDetails }) => (
    <div className="bg-white rounded-lg p-4">
        <p className="text-sm text-gray-600 font-bold">{details.title}{details?.completed ? " (Completed)" : "" }</p>
        <p className="pl-4 italic text-xs text-gray-600">{details.description}</p>
    </div>
)

const LessonList = <T extends { id: string }>({
    header,
    data,
    link,
}: IGridProps<T>) => {
    console.log("else ",data)
    return (
        <>
            {(header) && (
                <div className="flex justify-between mb-4 px-1">
                    {header && <h2 className="text-lg font-bold">{header}</h2>}
                </div>
            )}

            <div className={`grid grid-cols-1 gap-4`}>
                {data.map((item, index) => {
                    const isPreviousCompleted = index > 0 && data[index - 1]?.completed;
                    return (
                        <div
                            key={item._id ?? index}
                            className="bg-white flex flex-col justify-between shadow-md rounded-lg overflow-hidden border border-gray-200 relative"
                        >
                            {item?.completed || index === 0 || isPreviousCompleted ? (
                                <Link href={link ? `${link}/${item._id?.toString()}` : "#"} className="block w-full h-full hover:opacity-60">
                                    <LessonCard details={item} />
                                </Link>
                            ) : (
                                <div className="block w-full h-full opacity-60">
                                    <LessonCard details={item} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default LessonList;
