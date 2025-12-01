import prisma from "../DB/db.config.js";

export const createRegistration = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const eventId = Number(id);
    const event = await prisma.events.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.capacity != null) {
      const count = await prisma.registration.count({
        where: { event_id: eventId },
      });
      if (count >= event.capacity)
        return res.status(400).json({ error: "Event is full" });
    }

    if (event.restrict_email_domain) {
      const allowed = (event.allowed_email_domain || "").toLowerCase();
      if (!allowed)
        return res
          .status(400)
          .json({
            error:
              "Event restricts registrations but no allowed domain is configured",
          });
      const emailLower = (email || "").toLowerCase();
      if (!emailLower.endsWith(`@${allowed}`)) {
        return res
          .status(400)
          .json({
            error: `Registrations are restricted to @${allowed} email addresses`,
          });
      }
    }

    const reg = await prisma.registration.create({
      data: {
        name,
        email,
        phone,
        event_id: eventId,
      },
    });
    res.status(201).json(reg);
  } catch (err) {
    console.error(err);
    if (err?.code === "P2002") {
      return res
        .status(409)
        .json({ error: "You have already registered for this event" });
    }
    res.status(500).json({ error: "Failed to create registration" });
  }
};

export const getRegistrationsForEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const eventId = parseInt(id);
    const event = await prisma.events.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (req.user?.role !== "SUPER_ADMIN") {
      if (event.club_id !== req.user.club_id)
        return res.status(403).json({ error: "Forbidden" });
    }

    const regs = await prisma.registration.findMany({
      where: { event_id: eventId },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(regs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};
