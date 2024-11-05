export default function About() {
	return (
		<main>

			<div className="container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white  max-w-7xl">
				<section className="mb-10">
					<h2 className="text-4xl font-bold mb-4 text-dark-gray border-l-4 pl-4 border-forest-green">
						Behind the Scenes: About Us
					</h2>
					<p className="text-lg text-dark-gray mb-4">
						Our mission is to inform and guide the community on proper waste management and environmental sustainability.
						We provide clear, timely information on waste segregation, disposal, and recycling, alongside tools like
						collection schedules and routes. Our goal is to help residents adopt responsible waste practices for a cleaner and greener Cavite City.
					</p>
				</section>

				<section className="mb-10">
					<h3 className="text-2xl font-semibold text-dark-gray mb-2 border-l-4 pl-2 border-forest-green">
						Our Vision
					</h3>
					<p className="text-md text-dark-gray">
						Our vision is to be the go-to resource for waste management in Cavite City. We aim to connect residents with
						the information they need to make sustainable choices, while promoting collaboration between the community and
						local authorities. Through this, we strive to create a cleaner, greener city.
					</p>
				</section>

				<section className="mb-10">
					<h3 className="text-2xl font-semibold text-dark-gray mb-2 border-l-4 pl-2 border-forest-green">
						Our Team
					</h3>
					<p className="text-md text-dark-gray mb-4">
						Meet the dedicated individuals behind the platform who work tirelessly to make a difference.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="p-4 bg-gray-50 rounded shadow">
							<img src="/team/member1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
							<h4 className="text-center text-xl font-bold">John Doe</h4>
							<p className="text-center text-md text-dark-gray">Project Lead</p>
						</div>
					</div>
				</section>

				<section className="mb-10">
					<h3 className="text-2xl font-semibold text-dark-gray mb-2 border-l-4 pl-2 border-forest-green">
						Community Involvement
					</h3>
					<p className="text-md text-dark-gray">
						We collaborate with local authorities and community leaders to address waste management issues and spread awareness.
					</p>
				</section>

				<section>
					<h3 className="text-2xl font-semibold text-dark-gray mb-2 border-l-4 pl-2 border-forest-green">
						Get Involved
					</h3>
					<p className="text-md text-dark-gray mb-4">
						Want to contribute to our mission? Reach out to us or get involved in community events!
					</p>
				</section>
			</div>
		</main>
	);
}
