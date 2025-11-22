import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { name, email, password, club_id } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.coreMember.create({
      data: {
        name,
        email,
        password: hash,
        club_id: club_id ? parseInt(club_id) : undefined,
      },
    });
    res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email, club_id: newUser.club_id, role: newUser.role });
  } catch (err) {
    console.error(err);
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Failed to add user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.coreMember.findMany({ select: { id: true, name: true, email: true, role: true, club_id: true } });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


