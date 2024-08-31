import { INewsDocument } from "@/models/news";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const NewsCard = ({details}: {details: INewsDocument}) => {
    return (
        <div className="bg-white p-6 rounded shadow">
            <div className="relative w-full h-48 mb-4">
                <Image 
                    src={`/images/news/${details.image}`} 
                    alt={details.title} 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded"
                />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-gray">{details.title}</h3>
            <p className="text-dark-gray">{details.description}</p>
            <Link href={`/news/${details._id}`}><button className="mt-4 bg-sun-yellow text-dark-gray px-4 py-2 rounded shadow-md">Read More</button></Link>
        </div>
    )
}

const NoNewsCard = () => {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2 text-dark-gray">News Post Title</h3>
            <p className="text-dark-gray">A short excerpt from the news post...</p>
            <button disabled className="mt-4 bg-sun-yellow text-dark-gray px-4 py-2 shadow-md rounded opacity-0"></button>
        </div>
    )
}

export default function NewsSection({data}: {data: INewsDocument[]}) {
    return (
        <section className="py-10 px-4 bg-light-gray">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-2 text-dark-gray">Recent News Posts</h2>
                <p className="text-lg mb-8 text-dark-gray">Catch up with the latest news and updates from our community.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.length > 0 ? (
                        data.map((news: INewsDocument) => (
                            <NewsCard key={news._id} details={news} />      
                        ))
                    ) : (
                        <NoNewsCard />
                    )}
                </div>
            </div>
        </section>
    );
}
