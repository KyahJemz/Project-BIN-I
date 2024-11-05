import Link from 'next/link';
import React from 'react';

interface IGridProps<T> {
    header?: string;
    data: T[];
    link: string;
}

interface ITutorialDetails {
    title: string;
    tasks: {
      title: string;
      description: string;
      completed?: boolean;
    }[];
  }

const TutorialCard = ({ details }: { details: ITutorialDetails }) => (
    <div className="bg-white rounded-lg p-4">
        <h3 className="font-bold text-lg">{details.title}{details?.completed ? " - (Completed)" : "" }</h3>
        {details.tasks.map((item, index) => (
            <div key={index}>
                <p className="text-sm text-gray-600 mt-2">{item.title}</p>
                <p className="pl-4 italic text-xs text-gray-600">{item.description}</p>
            </div>
        ))}
    </div>
)


const TutorialList = <T extends { id: string }>({
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
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white flex flex-col justify-between shadow-md rounded-lg overflow-hidden border border-gray-200 relative"
                    >   
                        <Link href={link && (`${link}/${item?._id?.toString()??""}`)}  className="block w-full h-full hover:opacity-60">
                            <TutorialCard details={item} />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TutorialList;
