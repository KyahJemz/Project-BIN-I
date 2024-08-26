import Image from "next/image";

import dynamic from 'next/dynamic';

export default function Home() {

  const Map = dynamic(
    // @ts-ignore
    () => import('@/components/map/map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  );

  const routeCoordinates = [
    [14.481390308786406, 120.90879344408413],
    [14.4815609454619, 120.90825703152979], 
    [14.481485701942601, 120.90809392249388],
    [14.481386874381286, 120.90620242918128],
    [14.481603059597074, 120.90553897115583] 
  ];


  return (
    <div className="bg-gray-100 min-h-screen">
    {/* Header */}
    <header className="bg-green-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">BIN-I Portal</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">News</a></li>
            <li><a href="#" className="hover:underline">Events</a></li>
            <li><a href="#" className="hover:underline">Announcements</a></li>
            <li><a href="#" className="hover:underline">Schedules</a></li>
            <li><a href="#" className="hover:underline">Routes</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
        <button className="bg-white text-green-700 px-4 py-2 rounded">Get Involved</button>
      </div>
    </header>

    {/* Hero Section */}
    <section className="bg-green-500 text-white py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">Join Our Mission to Protect the Environment</h2>
      <p className="text-lg mb-6">Stay informed, participate, and make a difference in our community.</p>
      <div>
        <button className="bg-white text-green-700 px-6 py-2 rounded mr-4">Read News</button>
        <button className="bg-white text-green-700 px-6 py-2 rounded">See Events</button>
      </div>
    </section>

    {/* Announcements Section */}
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Latest Announcements</h2>
        <p className="text-lg mb-4">Stay up-to-date with the latest news and updates.</p>
        <ul className="space-y-4">
          {/* Repeat for each announcement */}
          <li className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">Announcement Title</h3>
            <p className="text-gray-700">A brief description of the announcement.</p>
          </li>
          {/* More announcements */}
        </ul>
      </div>
    </section>

    {/* Upcoming Events Section */}
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Repeat for each event */}
          <div className="bg-green-100 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Event Name</h3>
            <p className="text-gray-700">Details about the event.</p>
            <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded">Details</button>
          </div>
          {/* More event cards */}
        </div>
      </div>
    </section>

    {/* Blog Highlights Section */}
    <section className="py-20 px-4 bg-gray-200">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Repeat for each blog post */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Blog Post Title</h3>
            <p className="text-gray-700">A short excerpt from the blog post...</p>
            <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded">Read More</button>
          </div>
          {/* More blog posts */}
        </div>
      </div>
    </section>

    {/* Garbage Collection Schedules Section */}
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Garbage Collection Schedules</h2>
        <p className="text-lg mb-6">Check the schedule for garbage collection in your area.</p>
        <div className="bg-white h-96 p-6 rounded shadow-md">
          <Map position={[14.481390308786406, 120.90879344408413]} routeCoordinates={routeCoordinates}/>
          </div>
      </div>
    </section>

    {/* Routes Section */}
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Collection Routes</h2>
        <div className="bg-gray-200 p-6 rounded shadow-md">[Map or List of Routes Here]</div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-green-700 text-white py-4">
      <div className="container mx-auto text-center">
        <p>© 2024 BIN-I: INFORMATIVE WASTE MANAGEMENT PORTAL FOR CAVITE CITY. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
  );
}

