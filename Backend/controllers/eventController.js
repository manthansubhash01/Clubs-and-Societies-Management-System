import prisma from "../DB/db.config.js";

export const getAllEvents = async (req, res) => {
  try {
    // public: return all events
    const events = await prisma.events.findMany();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const eventId = parseInt(id);
    const event = await prisma.events.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ error: "Event not found" });

    // include registration count and seats left if capacity present
    const attendees = await prisma.registration.count({ where: { event_id: eventId } });
    const seatsLeft = typeof event.capacity === 'number' ? event.capacity - attendees : null;
    res.status(200).json({ ...event, attendees, seatsLeft });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export const createEvent = async (req, res) => {
  const {
    name,
    description,
    venue,
    start_time,
    end_time,
    poc,
    club_id,
    capacity,
    restrict_email_domain,
    allowed_email_domain,
    thumbnail_url,
  } = req.body;

  try {
    // Only SUPER_ADMIN can create events for other clubs
    const targetClubId = req.user.role === 'SUPER_ADMIN' && club_id ? Number(club_id) : req.user.club_id;
    // Defensive: trim long descriptions to avoid DB errors while schema migrations are pending
    const safeDescription = typeof description === 'string' ? description.slice(0, 5000) : description;

    const newEvent = await prisma.events.create({
      data: {
        name,
        description: safeDescription,
        venue,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        poc,
        thumbnail_url: thumbnail_url || null,
        club_id: targetClubId,
        capacity: capacity != null ? Number(capacity) : undefined,
        restrict_email_domain: !!restrict_email_domain,
        allowed_email_domain: restrict_email_domain ? allowed_email_domain || null : null,
      },
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create event" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, ...otherData } = req.body;

  const data = { ...otherData };
  if (start_time) {
    data.start_time = new Date(start_time);
  }
  if (end_time) {
    data.end_time = new Date(end_time);
  }

  try {
    // enforce club ownership unless SUPER_ADMIN
    const eventId = Number(id);
    const existing = await prisma.events.findUnique({ where: { id: eventId } });
    if (!existing) return res.status(404).json({ error: 'Event not found' });
    if (req.user.role !== 'SUPER_ADMIN' && existing.club_id !== req.user.club_id) {
      return res.status(403).json({ error: 'Not permitted' });
    }
    const updatedEvent = await prisma.events.update({ where: { id: eventId }, data });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update event" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const eventId = Number(id);
    const existing = await prisma.events.findUnique({ where: { id: eventId } });
    if (!existing) return res.status(404).json({ error: 'Event not found' });
    if (req.user.role !== 'SUPER_ADMIN' && existing.club_id !== req.user.club_id) {
      return res.status(403).json({ error: 'Not permitted' });
    }
    await prisma.events.delete({ where: { id: eventId } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};
