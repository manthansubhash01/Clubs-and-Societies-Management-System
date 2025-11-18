import prisma from "../DB/db.config.js";

export const addImage = async (req,res)=>{
    const { url, text, club_id } = req.body;
    try{
        const newImage = await prisma.gallery.create({
            data:{
                url,
                text,
                club_id
            }
        })
        res.status(201).json(newImage)
    } catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to add image" });
    }
}

export const getGallery = async (req, res) => {
  try {
    const gallery = await prisma.gallery.findMany();
    res.json(gallery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
};


