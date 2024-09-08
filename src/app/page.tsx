import HomePage, {getHomePageProps} from "@/pages/HomePage";
import React from "react";
import Image from 'next/image'
import Link from "next/link";
import NewsDisplayGrid from "@/components/NewsDisplayGrid/NewsDisplayGrid";

const HeroSection = () => {
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
	)
}

const NewsSection = () => {
	return (<></>)
}

export default async function Home() {
	const { props } = await getHomePageProps();
	return (
		<main>
			<div className="min-h-screen bg-gray-100 max-w-7xl mx-auto">
				<HeroSection />

				<section className="bg-white text-dark-gray py-4 px-4">
					<h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Stay in the Know: Latest News</h2>
                	<p className="text-lg mb-4 text-dark-gray">Your source for the latest headlines and breaking stories.</p>
					<NewsDisplayGrid data={structuredClone(props?.allNews.slice(0, 7))}/>
				</section>

				<section className="bg-white text-dark-gray py-4 px-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-4">
					<section className="bg-white text-dark-gray py-4 px-4 col-span-2">
						<h2 className="text-lg font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Don’t Miss Out: Announcements</h2>
						<p className="text-xs mb-4 text-dark-gray">Stay ahead with important updates and official notices.</p>
					</section>
					<section className="bg-white text-dark-gray py-4 px-4"> 
						<h2 className="text-lg font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Save the Date: Upcoming Events</h2>
						<p className="text-xs mb-4 text-dark-gray">Don’t miss out—discover events happening near you.</p>
					</section>
				</section>


				anouncement events


				posts


				routes


				schedules



				about 


				
			</div>
			<HomePage allAnnouncements={props.allAnnouncements} allNews={props.allNews} allEvents={props.allEvents} allContactDetails={props.allContactDetails} allSchedules={props.allSchedules} allRoutes={props.allRoutes}/> 
		</main>
	)
}
