import React from 'react';
import Link from 'next/link';

interface INewsCardProps {
    title: string;
    description?: string;
    image: string;
    time: string;
    category: string;
    isMainCard?: boolean;
}

const NewsCard: React.FC<INewsCardProps> = ({
    title,
    description,
    image,
    time,
    category,
    isMainCard = false
}) => {
    return (
        <div className={`overflow-hidden rounded-md bg-white border border-gray-200 ${isMainCard ? 'col-span-2 row-span-2 h-full flex flex-col' : ''}`}>
            {/* Image section */}
            <div className={`${isMainCard ? 'h-64' : 'h-48'} flex-1 w-full`}>
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            
            {/* Content section */}
            <div className="p-4 flex flex-col">
                <div>
                    <p className="text-red-600 text-xs font-bold mb-2">{category}</p>
                    <h3 className="font-semibold text-lg mb-2">{title}</h3>
                    {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
                </div>
                <p className="text-xs text-gray-400 mt-4">{time}</p>
            </div>
        </div>
    );
};

interface NewsDisplayGridProps {
    newsItems: INewsCardProps[];
}

const NewsDisplayGrid: React.FC<NewsDisplayGridProps> = ({ newsItems }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {newsItems.map((newsItem, index) => (
                <NewsCard
                    key={index}
                    title={newsItem.title}
                    description={index === 0 ? newsItem.description : undefined} // Only display description on the main card
                    image={"/images/news/"+newsItem.image}
                    time={newsItem.createdAt}
                    category={newsItem.author}
                    isMainCard={index === 0} // The first card will be the main large one
                />
            ))}
        </div>
    );
};

export default NewsDisplayGrid;
