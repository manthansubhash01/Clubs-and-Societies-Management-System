import prisma from "../DB/db.config.js";

export const getAllClubs = async (req, res) => {
  try {
    const clubs = await prisma.club.findMany({
      include: {
        _count: {
          select: {
            core_members: true
          }
        }
      }
    });
    
    // Add actual member count to response
    const clubsWithMemberCount = clubs.map(club => ({
      ...club,
      membersCount: club._count.core_members
    }));
    
    res.json(clubsWithMemberCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

export const getClubById = async (req, res) => {
  const { id } = req.params;
  try {
    const club = await prisma.club.findUnique({
      where: { id: parseInt(id) },
      include: {
        core_members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true
          }
        },
        _count: {
          select: {
            core_members: true
          }
        }
      }
    });
    
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    
    // Add actual member count to response
    const clubWithMemberCount = {
      ...club,
      membersCount: club._count.core_members
    };
    
    res.json(clubWithMemberCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch club" });
  }
};

export const addClub = async (req, res) => {

  const { club_name, description, logo_image, type } = req.body; 


  const { membersCount } = req.body; 


  if (!club_name || !description || !logo_image || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newClub = await prisma.club.create({
      data: {
        club_name,
        description,
        membersCount: membersCount || 0, 
        logo_image,
        type,
      },
    });
    res.status(201).json(newClub);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add club" });
  }
};