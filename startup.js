const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();

router.get("/signup", (req, res) => {
  res.send("Hello!");
});
router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { body } = req;
    const user = await prisma.startupManager.create({
      data: {
        city: body.city,

        Username: body.Username,
        fullName: body.fullName,
        email: body.email,
        password: body.password,
        phone: body.phone,
        NID: body.NID,
        highestDegree: body.highestDegree,
        major: body.major,
        expertArea: body.expertArea,
      },
    });

    console.log("User created successfully");
    res.status(200).json({ message: "User created successfully" });
    
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await prisma.startupManager.findUnique({
      where: { Username: req.body.username },
    });

    if (!user || user.password !== req.body.password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user: user });
    console.log("It is called!");
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/upload", async (req, res) => {
    try {
      const { body } = req;
  
      // Assuming 'startupManagerUsername' is the correct field in the request body
      const startupManager = await prisma.startupManager.findUnique({
        where: { Username: body.startupManagerUsername },
      });
  
      if (!startupManager) {
        return res.status(404).json({ error: "Startup manager not found" });
      }
  
      const startupInfo = await prisma.startupInfo.create({
        data: {
          startupName: body.startupName,
          industry: body.industry,
          foundingDate: body.foundingDate,
          location: body.location,
          tinNumber: body.tinNumber,
          cofounderName: body.cofounderName,
          coOccupation: body.coOccupation,
          NID: body.NID,
          initialFund: body.initialFund,
          totalRevenue: body.totalRevenue,
          fundingNeeded: body.fundingNeeded,
          goals: body.goals,
          motivation: body.motivation,
          briefExplain: body.briefExplain,
          Manager: {
            connect: { Username: startupManager.Username },
          },
        },
      });
  
      console.log("StartupInfo created successfully");
      res.status(200).json({ message: "StartupInfo created successfully", startupInfo });
    } catch (error) {
      console.error("Error creating startupInfo:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get('/manager-profile',async(req,res)=>{
    try{
      const username=req.query.username;
      console.log(username)
      
      const startupManager= await prisma.startupManager.findUnique({
        where:{
          Username:username,
        }
      })
      if(!startupManager){
        console.log("Not found any investor");
      }
      console.log("Found")
      return res.status(200).json({
       startupManager
      })
  
    }catch{
      console.log("error");
    }
  })
  router.get('/home/:username', async(req,res)=>{
    try{
        const {username}= req.params;
        console.log('Username got',username)
        const startupProfile = await prisma.startupManager.findUnique({
            where: { Username :username},
            select: { city:true, fullName:true }
        }) 
        if(!startupProfile){
            console.log("Not found");
        }

        res.status(200).json(startupProfile);

    }catch(error)
    {
      console.error('Error retrieving startup manager data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
  router.get('/mystartups',async(req,res)=>{
    try{
        const managerUsername = req.query.username;
        const startups= await prisma.startupInfo.findMany({
          where:{startupManagerUsername:managerUsername}
        }) 
        if(!startups){
          console.log("No startups");
        }
        res.status(200).json({ startups });
        
    }catch(error)
    {
      console.log("error",error);
    }
  })

module.exports = router;
