import bcrypt from 'bcrypt';
import prisma from '../DB/db.config.js';

async function main() {
<<<<<<< Updated upstream
  await prisma.club.deleteMany();

  const clubsData = [
    {
      club_name: "Competitive Programming Club",
      description:
        "The Competitive Programming Club brings together students passionate about problem-solving, algorithms, and coding challenges. Members practice for national and international contests, learn optimized approaches to complex problems, and participate in regular mock rounds. The club aims to cultivate analytical thinking, speed, and precision through hands-on sessions and collaborative learning.",
      membersCount: 0,
      logo_image:
        "https://pbs.twimg.com/profile_images/1375043815254458368/ZV9ZXuY__400x400.jpg",
      poster_image:
        "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202211/Michael%20Roytek%20ICPC%20hall%20packed%20with%20teams.jpg?itok=A-33v-xC",
      type: "Technical",
    },
    {
      club_name: "MINDS - Machine Intelligence and Neural Development Society",
      description:
        "The AI/ML Club is dedicated to exploring artificial intelligence, machine learning algorithms, and real-world applications of data science. Members work on projects involving neural networks, natural language processing, computer vision, and AI-powered tools. The club provides workshops, hands-on experiments, and competitions to help students build intelligent systems and understand cutting-edge advancements.",
      membersCount: 0,
      logo_image:
        "https://media.licdn.com/dms/image/v2/D560BAQFdjMn-GVNJ3Q/company-logo_200_200/B56ZpOLuqxG4AI-/0/1762248289540/minds_machine_intelligence_and_neural_development_society_logo?e=1766016000&v=beta&t=FevwHIob5OiVWOynP25nLRaojQwI9dtSl3PP-DTfuXA",
      poster_image:
        "https://inha.uz/wp-content/uploads/2023/04/ai-1024x682.jpg",
      type: "Technical",
    },
    {
      club_name: "Robotics Club",
      description:
        "The Robotics Club focuses on designing, building, and programming robots for various tasks and competitions. Students collaborate to work with microcontrollers, sensors, mechanical systems, and automation frameworks. Through hands-on workshops, prototype building, and problem-based challenges, the club nurtures creativity and engineering skills in robotics and embedded systems.",
      membersCount: 0,
      logo_image:
        "https://media.licdn.com/dms/image/v2/C560BAQG_pv2f76_BKQ/company-logo_400_400/company-logo_400_400/0/1636968775926?e=2147483647&v=beta&t=DsPhiD6tFXAvP83XtfI6do5IEBWKZBVt_pLWp-NZ9VU",
      poster_image:
        "https://assets.skyfilabs.com/images/blog/6_tips_to_setup_robotics_club_in_your_college.jpg",
      type: "Technical",
    },
    {
      club_name: "Game Development Club",
      description:
        "The Game Development Club is a space for aspiring developers, designers, writers, and artists to create interactive and immersive games. Members explore game engines like Unity and Unreal, learn game mechanics, animation, storytelling, and level design. The club encourages collaboration and creativity through team projects, workshops, and game jam events.",
      membersCount: 0,
      logo_image:
        "https://static.vecteezy.com/system/resources/thumbnails/014/039/889/small/game-with-gear-logo-template-joystick-design-icon-gear-game-logo-free-vector.jpg",
      poster_image:
        "https://assets-us-01.kc-usercontent.com/d6a9597f-2e6e-0006-ad27-50e384133464/45340814-080e-4bdb-bc25-dd84dc8993b0/game-development-animation-and-game-design-1920x1080.jpg",
      type: "Technical",
    },
    {
      club_name: "Entrepreneurship Club",
      description:
        "The Entrepreneurship Club supports students interested in building startups, developing leadership abilities, and understanding business innovation. Members participate in ideation sessions, pitch practices, case studies, and mentorship programs. The club promotes creativity, risk-taking, and strategic thinking while helping students transform ideas into meaningful ventures.",
      membersCount: 0,
      logo_image:
        "https://www.ualberta.ca/en/entrepreneurship-centre/media-library/images/entrepreneurship-club.jpg",
      poster_image:
        "https://t4.ftcdn.net/jpg/00/94/27/61/360_F_94276127_McInfmoFTFejzeoQbMb0ExscdYMN67fJ.jpg",
      type: "Management",
    },
    {
      club_name: "Web Development Club",
      description:
        "The Web Development Club is dedicated to mastering modern web technologies, UI/UX design, and full-stack development. Students learn by building real projects using frameworks, APIs, and responsive design principles. The club conducts workshops, coding challenges, and collaborative hack sessions to help members create impactful and professional-grade web applications.",
      membersCount: 0,
      logo_image:
        "https://r2.erweima.ai/imgcompressed/compressed_f585ba0e4bc8f802220a097f7ae5c06d.webp",
      poster_image:
        "https://tus.ie/app/uploads/Communications/PR/JulySep2025/TUS-Hackathon-3-scaled.jpg",
      type: "Technical",
    },
    {
      club_name: "Dance Club",
      description:
        "The Dance Club provides a creative and energetic platform for students who love movement and performance arts. Members explore various dance styles, choreograph routines, and participate in competitions and cultural events. The club encourages self-expression, teamwork, and physical fitness while helping dancers refine their skills through regular practice sessions.",
      membersCount: 0,
      logo_image:
        "https://images-platform.99static.com//mg6tNfsrYgcmo0W13CSe5VUcmrQ=/1023x17:1937x931/fit-in/500x500/99designs-contests-attachments/99/99425/attachment_99425353",
      poster_image:
        "https://th-i.thgim.com/public/incoming/toogjz/article68505289.ece/alternates/LANDSCAPE_1200/16fraayana1.jpg",
      type: "Cultural",
    },
    {
      club_name: "Music Club",
      description:
        "The Music Club brings together vocalists, instrumentalists, composers, and music enthusiasts to explore different genres and styles. Members engage in jam sessions, performances, and collaborative projects while improving their musical abilities. The club fosters creativity, stage confidence, and a shared appreciation for rhythm, melody, and artistic expression.",
      membersCount: 0,
      logo_image:
        "https://w7.pngwing.com/pngs/488/23/png-transparent-alfa-music-club-graphy-percussion-peci-text-photography-logo-thumbnail.png",
      poster_image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/4d/d1/15/soho-restaurant-music.jpg?w=900&h=500&s=1",
      type: "Cultural",
    },
    {
      club_name: "Drama Club",
      description:
        "The Drama Club celebrates theatre arts through acting, scriptwriting, direction, and stage production. Members learn techniques in expression, stage presence, improvisation, and storytelling. The club regularly hosts performances, skits, and theatrical showcases, making it a vibrant platform for creative expression and confidence building.",
      membersCount: 0,
      logo_image:
        "https://t3.ftcdn.net/jpg/02/72/69/08/360_F_272690896_LNsSvoOZHALZbEWzFy7o3cj2JeOX6ioI.jpg",
      poster_image:
        "https://www.schuylervilleschools.org/wp-content/uploads/2023/04/IMG_8927-1.jpg",
      type: "Cultural",
    },
    {
      club_name: "Sports Club",
      description:
        "The Sports Club promotes fitness, teamwork, and competitive spirit through a range of indoor and outdoor sports activities. Members participate in training sessions, tournaments, and inter-college events. The club encourages discipline, sportsmanship, and healthy living while enabling students to excel in athletics and recreational sports.",
      membersCount: 0,
      logo_image:
        "https://cdn.dribbble.com/userupload/6469790/file/original-3b13889063d1f5176092b489b5e8c31e.jpg",
      poster_image: "https://www.memberjungle.com/client_images/2139391.jpg",
      type: "Sports",
    },
  ];

  await prisma.club.createMany({ data: clubsData });
  console.log("Club data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
=======
	// Create clubs (skip duplicates) and upsert members.
	const clubsData = [
		{
			club_name: 'Competitive Programming Club',
			description:
				'The Competitive Programming Club brings together students passionate about problem-solving, algorithms, and coding challenges. Members practice for national and international contests, learn optimized approaches to complex problems, and participate in regular mock rounds. The club aims to cultivate analytical thinking, speed, and precision through hands-on sessions and collaborative learning.',
			membersCount: 0,
			logo_image:
				'https://pbs.twimg.com/profile_images/1375043815254458368/ZV9ZXuY__400x400.jpg',
			poster_image:
				'https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202211/Michael%20Roytek%20ICPC%20hall%20packed%20with%20teams.jpg?itok=A-33v-xC',
			type: 'Technical',
		},
		{
			club_name: 'MINDS - Machine Intelligence and Neural Development Society',
			description:
				'The AI/ML Club is dedicated to exploring artificial intelligence, machine learning algorithms, and real-world applications of data science. Members work on projects involving neural networks, natural language processing, computer vision, and AI-powered tools. The club provides workshops, hands-on experiments, and competitions to help students build intelligent systems and understand cutting-edge advancements.',
			membersCount: 0,
			logo_image:
				'https://media.licdn.com/dms/image/v2/D560BAQFdjMn-GVNJ3Q/company-logo_200_200/B56ZpOLuqxG4AI-/0/1762248289540/minds_machine_intelligence_and_neural_development_society_logo?e=1766016000&v=beta&t=FevwHIob5OiVWOynP25nLRaojQwI9dtSl3PP-DTfuXA',
			poster_image: 'https://inha.uz/wp-content/uploads/2023/04/ai-1024x682.jpg',
			type: 'Technical',
		},
		{
			club_name: 'Robotics Club',
			description:
				'The Robotics Club focuses on designing, building, and programming robots for various tasks and competitions. Students collaborate to work with microcontrollers, sensors, mechanical systems, and automation frameworks. Through hands-on workshops, prototype building, and problem-based challenges, the club nurtures creativity and engineering skills in robotics and embedded systems.',
			membersCount: 0,
			logo_image:
				'https://media.licdn.com/dms/image/v2/C560BAQG_pv2f76_BKQ/company-logo_400_400/company-logo_400_400/0/1636968775926?e=2147483647&v=beta&t=DsPhiD6tFXAvP83XtfI6do5IEBWKZBVt_pLWp-NZ9VU',
			poster_image:
				'https://assets.skyfilabs.com/images/blog/6_tips_to_setup_robotics_club_in_your_college.jpg',
			type: 'Technical',
		},
		{
			club_name: 'Game Development Club',
			description:
				'The Game Development Club is a space for aspiring developers, designers, writers, and artists to create interactive and immersive games. Members explore game engines like Unity and Unreal, learn game mechanics, animation, storytelling, and level design. The club encourages collaboration and creativity through team projects, workshops, and game jam events.',
			membersCount: 0,
			logo_image:
				'https://static.vecteezy.com/system/resources/thumbnails/014/039/889/small/game-with-gear-logo-template-joystick-design-icon-gear-game-logo-free-vector.jpg',
			poster_image:
				'https://assets-us-01.kc-usercontent.com/d6a9597f-2e6e-0006-ad27-50e384133464/45340814-080e-4bdb-bc25-dd84dc8993b0/game-development-animation-and-game-design-1920x1080.jpg',
			type: 'Technical',
		},
		{
			club_name: 'Entrepreneurship Club',
			description:
				'The Entrepreneurship Club supports students interested in building startups, developing leadership abilities, and understanding business innovation. Members participate in ideation sessions, pitch practices, case studies, and mentorship programs. The club promotes creativity, risk-taking, and strategic thinking while helping students transform ideas into meaningful ventures.',
			membersCount: 0,
			logo_image:
				'https://www.ualberta.ca/en/entrepreneurship-centre/media-library/images/entrepreneurship-club.jpg',
			poster_image:
				'https://t4.ftcdn.net/jpg/00/94/27/61/360_F_94276127_McInfmoFTFejzeoQbMb0ExscdYMN67fJ.jpg',
			type: 'Management',
		},
		{
			club_name: 'Web Development Club',
			description:
				'The Web Development Club is dedicated to mastering modern web technologies, UI/UX design, and full-stack development. Students learn by building real projects using frameworks, APIs, and responsive design principles. The club conducts workshops, coding challenges, and collaborative hack sessions to help members create impactful and professional-grade web applications.',
			membersCount: 0,
			logo_image:
				'https://r2.erweima.ai/imgcompressed/compressed_f585ba0e4bc8f802220a097f7ae5c06d.webp',
			poster_image:
				'https://tus.ie/app/uploads/Communications/PR/JulySep2025/TUS-Hackathon-3-scaled.jpg',
			type: 'Technical',
		},
		{
			club_name: 'Dance Club',
			description:
				'The Dance Club provides a creative and energetic platform for students who love movement and performance arts. Members explore various dance styles, choreograph routines, and participate in competitions and cultural events. The club encourages self-expression, teamwork, and physical fitness while helping dancers refine their skills through regular practice sessions.',
			membersCount: 0,
			logo_image:
				'https://images-platform.99static.com//mg6tNfsrYgcmo0W13CSe5VUcmrQ=/1023x17:1937x931/fit-in/500x500/99designs-contests-attachments/99/99425/attachment_99425353',
			poster_image:
				'https://th-i.thgim.com/public/incoming/toogjz/article68505289.ece/alternates/LANDSCAPE_1200/16fraayana1.jpg',
			type: 'Cultural',
		},
		{
			club_name: 'Music Club',
			description:
				'The Music Club brings together vocalists, instrumentalists, composers, and music enthusiasts to explore different genres and styles. Members engage in jam sessions, performances, and collaborative projects while improving their musical abilities. The club fosters creativity, stage confidence, and a shared appreciation for rhythm, melody, and artistic expression.',
			membersCount: 0,
			logo_image:
				'https://w7.pngwing.com/pngs/488/23/png-transparent-alfa-music-club-graphy-percussion-peci-text-photography-logo-thumbnail.png',
			poster_image:
				'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/4d/d1/15/soho-restaurant-music.jpg?w=900&h=500&s=1',
			type: 'Cultural',
		},
		{
			club_name: 'Drama Club',
			description:
				'The Drama Club celebrates theatre arts through acting, scriptwriting, direction, and stage production. Members learn techniques in expression, stage presence, improvisation, and storytelling. The club regularly hosts performances, skits, and theatrical showcases, making it a vibrant platform for creative expression and confidence building.',
			membersCount: 0,
			logo_image:
				'https://t3.ftcdn.net/jpg/02/72/69/08/360_F_272690896_LNsSvoOZHALZbEWzFy7o3cj2JeOX6ioI.jpg',
			poster_image:
				'https://www.schuylervilleschools.org/wp-content/uploads/2023/04/IMG_8927-1.jpg',
			type: 'Cultural',
		},
		{
			club_name: 'Sports Club',
			description:
				'The Sports Club promotes fitness, teamwork, and competitive spirit through a range of indoor and outdoor sports activities. Members participate in training sessions, tournaments, and inter-college events. The club encourages discipline, sportsmanship, and healthy living while enabling students to excel in athletics and recreational sports.',
			membersCount: 0,
			logo_image:
				'https://cdn.dribbble.com/userupload/6469790/file/original-3b13889063d1f5176092b489b5e8c31e.jpg',
			poster_image: 'https://www.memberjungle.com/client_images/2139391.jpg',
			type: 'Sports',
		},
	];

	await prisma.club.createMany({ data: clubsData, skipDuplicates: true });

	const clubs = await prisma.club.findMany();
	const clubByName = Object.fromEntries(clubs.map((c) => [c.club_name, c]));

	const defaultPassword = 'ChangeMe123!';
	const hashed = await bcrypt.hash(defaultPassword, 10);

	async function upsertMember({ name, email, phone = '', role = 'MEMBER', club_name }) {
		const club = clubByName[club_name] || clubs[0];
		const existing = await prisma.coreMember.findUnique({ where: { email } });
		const data = {
			name,
			email,
			phone,
			role,
			password: hashed,
			club_id: club.id,
		};
		if (existing) {
			await prisma.coreMember.update({ where: { email }, data });
			console.log(`Updated member ${email}`);
		} else {
			await prisma.coreMember.create({ data });
			console.log(`Created member ${email}`);
		}
	}

	// Required members
	await upsertMember({
		name: 'Uzair Ahmed Shah',
		email: 'uzair.shah@adypu.edu.in',
		phone: '',
		role: 'MEMBER',
		club_name: 'MINDS - Machine Intelligence and Neural Development Society',
	});

	await upsertMember({
		name: 'Jagadish Ishwar Patil',
		email: 'jagadish.patil@adypu.edu.in',
		phone: '',
		role: 'MEMBER',
		club_name: 'MINDS - Machine Intelligence and Neural Development Society',
	});

	// 15 explicit additional members
	const membersData = [
		{
			name: 'Ayesha Khan',
			email: 'ayesha.khan@example.com',
			phone: '9000000011',
			club_name: 'Web Development Club',
		},
		{
			name: 'Rohan Mehta',
			email: 'rohan.mehta@example.com',
			phone: '9000000012',
			club_name: 'Competitive Programming Club',
		},
		{
			name: 'Sneha Gupta',
			email: 'sneha.gupta@example.com',
			phone: '9000000013',
			club_name: 'Game Development Club',
		},
		{
			name: 'Vikram Rao',
			email: 'vikram.rao@example.com',
			phone: '9000000014',
			club_name: 'Robotics Club',
		},
		{
			name: 'Kiran Joshi',
			email: 'kiran.joshi@example.com',
			phone: '9000000015',
			club_name: 'Entrepreneurship Club',
		},
		{
			name: 'Priya Nair',
			email: 'priya.nair@example.com',
			phone: '9000000016',
			club_name: 'Music Club',
		},
		{
			name: 'Arjun Patel',
			email: 'arjun.patel@example.com',
			phone: '9000000017',
			club_name: 'Sports Club',
		},
		{
			name: 'Meera Iyer',
			email: 'meera.iyer@example.com',
			phone: '9000000018',
			club_name: 'Dance Club',
		},
		{
			name: 'Rahul Deshmukh',
			email: 'rahul.deshmukh@example.com',
			phone: '9000000019',
			club_name: 'Drama Club',
		},
		{
			name: 'Anita Sharma',
			email: 'anita.sharma@example.com',
			phone: '9000000020',
			club_name: 'Web Development Club',
		},
		{
			name: 'Siddharth Kulkarni',
			email: 'siddharth.kulkarni@example.com',
			phone: '9000000021',
			club_name: 'Competitive Programming Club',
		},
		{
			name: 'Nikhil Verma',
			email: 'nikhil.verma@example.com',
			phone: '9000000022',
			club_name: 'MINDS - Machine Intelligence and Neural Development Society',
		},
		{
			name: 'Tanya Roy',
			email: 'tanya.roy@example.com',
			phone: '9000000023',
			club_name: 'Music Club',
		},
		{
			name: 'Harshad S',
			email: 'harshad.s@example.com',
			phone: '9000000024',
			club_name: 'Game Development Club',
		},
		{
			name: 'Leena D',
			email: 'leena.d@example.com',
			phone: '9000000025',
			club_name: 'Sports Club',
		},
	];

	// pick a random club (excluding MINDS) for each of these members
	const otherClubs = clubs.filter((c) => c.club_name !== 'MINDS - Machine Intelligence and Neural Development Society');
	for (const mem of membersData) {
		const randomClub = otherClubs[Math.floor(Math.random() * otherClubs.length)];
		await upsertMember({
			name: mem.name,
			email: mem.email,
			phone: mem.phone,
			role: 'MEMBER',
			club_name: randomClub.club_name,
		});
	}

	console.log('Seeding completed.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
>>>>>>> Stashed changes
