"use client";

import React from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { INewsDocument } from "@/models/news";
import PreviewRenderer from "@/components/EditorJsRenderer/PreviewRenderer";

export default function NewsPreview({ news }: { news: INewsDocument }) {
    const { title, author, description, image, createdAt } = news;
    const router = useRouter();

    if (!news) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1 className="text-4xl font-bold mt-4 mb-2">{title}</h1>
            <p className="text-sm text-gray-500 mb-2">By {author}</p>
            <p className="text-sm text-gray-500 mb-4">Published on {new Date(createdAt).toLocaleDateString()}</p>

            <p className="text-lg mb-4">{description}</p>

            {image && (
                <div className="mb-4">
                    <Image
                        src={`/images/news/${image}`}
                        alt={title}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-md object-cover"
                    />
                </div>
            )}

            <PreviewRenderer data={null} />
            </>
    );
};
