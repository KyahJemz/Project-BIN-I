import { IPostDocument } from "@/models/posts";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const PostCard = ({ details }: { details: IPostDocument }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center shadow-md">
            <Link href={`/posts/${details._id}`}  className="w-full">
                <div className="relative w-full h-48 mb-4">
                    <Image 
                        src={`/images/posts/${details.image}`} 
                        alt={details.title} 
                        layout="fill" 
                        objectFit="cover" 
                        className="w-full h-32 object-cover rounded-t-lg mb-4"
                    />
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">{details.title}</h3>
                <p className="text-dark-gray">{details.description}</p>
            </Link>
        </div>
    )
}

const NoPostCard = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center shadow-md">
            <h3 className="text-xl font-semibold text-dark-gray mb-2">No Posts</h3>
            <p className="text-dark-gray">There are currently no posts to display. Please check back soon for any updates or new information.</p>
        </div>
    )
}

export default function PostsSection({ data }: { data: IPostDocument[] }) {
    return (
        <section className="py-10 px-4 bg-sky-blue">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-2 text-dark-gray">Latest Posts</h2>
                <p className="text-lg mb-8 text-dark-gray">Stay up-to-date with the latest news and updates.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data.length > 0 ? (
                        data.map((post: IPostDocument) => (
                            <PostCard key={post._id} details={post} />
                        ))
                    ) : (
                        <NoPostCard />
                    )}
                </div>
            </div>
        </section>
    );
}
