import { INewsDocument } from "@/models/news";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const NewsCard = ({ details, management, onDelete, onEdit }: { details: INewsDocument, management?: boolean, onDelete?: (id: string) => void, onEdit?: (data: INewsDocument) => void }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div className="relative w-full h-48 mb-4">
                <Image
                    src={`/images/news/${details.image}`}
                    alt={details.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-gray">{details.title}</h3>
            <p className="text-dark-gray mb-4">{details.description}</p>

            <div className="flex justify-between items-center">
                <Link href={`/news/${details._id}`}>
                    <button className="bg-sun-yellow text-dark-gray px-4 py-2 rounded shadow-md">Read More</button>
                </Link>

                {management && (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit && onEdit(details)}
                            className="text-blue-500 hover:text-blue-700 transition"
                        >
                            {/* Edit Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182l-9.156 9.156-4.34.524a.75.75 0 01-.83-.83l.524-4.34 9.156-9.156z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12v6.75A2.25 2.25 0 0117.25 21h-10.5A2.25 2.25 0 014.5 18.75v-10.5A2.25 2.25 0 016.75 6h6.75" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDelete && onDelete(details._id)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            {/* Delete Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9l-.867 10.141A2.25 2.25 0 0116.392 21H7.608a2.25 2.25 0 01-2.241-1.859L4.5 9m5.25 0V4.875A2.625 2.625 0 0112.375 2.25h-.75A2.625 2.625 0 019 4.875V9m0 0h6m-6 0h6" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const NoNewsCard = () => {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2 text-dark-gray">News Post Title</h3>
            <p className="text-dark-gray">A short excerpt from the news post...</p>
            <button disabled className="mt-4 bg-sun-yellow text-dark-gray px-4 py-2 shadow-md rounded opacity-0"></button>
        </div>
    );
};

export default function NewsSection({ data, management = false, onDelete, onEdit }: { data: INewsDocument[], management?: boolean, onDelete?: (id: string) => void, onEdit?: (data: INewsDocument) => void }) {
    return (
        <section className="py-10 px-4 bg-light-gray">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-2 text-dark-gray">Recent News Posts</h2>
                <p className="text-lg mb-8 text-dark-gray">Catch up with the latest news and updates from our community.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.length > 0 ? (
                        data.map((news: INewsDocument) => (
                            <NewsCard key={news._id} details={news} management={management} onDelete={onDelete} onEdit={onEdit} />
                        ))
                    ) : (
                        <NoNewsCard />
                    )}
                </div>
            </div>
        </section>
    );
}
