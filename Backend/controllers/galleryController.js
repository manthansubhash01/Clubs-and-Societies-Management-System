import prisma from "../DB/db.config.js";

export const addImage = async (req, res) => {
  const { url, text, club_id } = req.body;

  try {
    const allowedRoles = ["SUPER_ADMIN", "PRESIDENT", "HANDLER"];
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Not authorized to add gallery images" });
    }

    const targetClubId =
      req.user.role === "SUPER_ADMIN" ? Number(club_id) : req.user.club_id;

    if (!targetClubId) {
      return res.status(400).json({ error: "Club ID is required" });
    }

    const newImage = await prisma.gallery.create({
      data: {
        url,
        text: text || null,
        club_id: targetClubId,
      },
      include: {
        club: true,
      },
    });
    res.status(201).json(newImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add image" });
  }
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const allowedRoles = ["SUPER_ADMIN", "PRESIDENT", "HANDLER"];
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete gallery images" });
    }

    const imageId = Number(id);
    const image = await prisma.gallery.findUnique({ where: { id: imageId } });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    if (req.user.role !== "SUPER_ADMIN" && image.club_id !== req.user.club_id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this image" });
    }

    await prisma.gallery.delete({ where: { id: imageId } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

export const getGallery = async (req, res) => {
  try {
    const gallery = await prisma.gallery.findMany({
      include: {
        club: true,
      },
    });
    res.json(gallery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
};

export const getGalleryByClub = async (req, res) => {
  const { club_id } = req.params;

  try {
    const clubId = Number(club_id);
    const gallery = await prisma.gallery.findMany({
      where: { club_id: clubId },
      include: {
        club: true,
      },
    });
    res.json(gallery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch gallery for club" });
  }
};
