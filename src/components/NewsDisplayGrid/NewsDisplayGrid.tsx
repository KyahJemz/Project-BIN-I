"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card= ({
    title,
    description,
    image,
    time,
    category,
    link, 
    isMainCard = false
}) => {
    return (
        <Link href={link} className={`overflow-hidden  hover:opacity-60 rounded-md bg-white border border-gray-200 ${isMainCard ? 'col-span-2 row-span-2 h-full flex flex-col' : ''}`}>
            <div className={`${isMainCard ? 'h-40' : 'h-32'} flex-1 w-full`}>
                <Image width={500} height={500} src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            
            {/* Content section */}
            <div className="p-4 flex flex-col">
                <div>
                    <p className="text-red-600 text-xs font-bold mb-2">{category}</p>
                    <h3 className="font-semibold text-lg mb-2">{title}</h3>
                    {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
                </div>
                <p className="text-xs text-gray-400 mt-4">{time.toString()}</p>
            </div>
        </Link>
    );
};

const NewsDisplayGrid = ({data = [], link}) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {data?.map((item, index) => (
                <Card
                    key={index}
                    title={item.title}
                    description={index === 0 ? item.description : undefined}
                    image={"/images/news/"+item.image}
                    time={item?.createdAt?.toString()??""}
                    category={item.author}
                    isMainCard={index === 0}
                    link={link && (`${link}/${item?._id?.toString()??""}`)}
                />
            ))}
        </div>
    );
};

export default NewsDisplayGrid;
