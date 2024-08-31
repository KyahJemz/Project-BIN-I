/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function HeroSection() {
    return (
        <section className="bg-white text-dark-gray py-20 px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center">

                <div className="flex-1 mb-8 md:mb-0 md:ml-8 hidden md:block h-96">
                    <div className="relative w-full h-full">
                        <Image 
                            src="/images/tree.png" 
                            alt="Cavite City" 
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                        />
                    </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">BIN-I: Keep Cavite City Clean and Green</h2>
                    <p className="text-base md:text-lg mb-6">Stay informed, participate, and make a difference in our community.</p>
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center">
                        <Link href={'/news'} className="bg-sun-yellow shadow-md text-dark-gray px-6 py-2 rounded mb-4 sm:mb-0 sm:mr-4">Read News</Link>
                        <Link href={'/events'} className="bg-sun-yellow shadow-md text-dark-gray px-6 py-2 rounded">See Events</Link>
                    </div>
                </div>
                
            </div>
        </section>
    );
}
