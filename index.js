var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", async (req, res) => {
  console.log("Received signup request:", req.body);
  try {
    const { body } = req;
    const user = await prisma.investor.create({
      data: {
        Username: body.Username,
        fullName: body.fullName,
        email: body.email,
        password: body.password,
        phone: body.phone,
        DoB: body.DoB,
        city: body.city,
        country: body.country,
        occupation: body.occupation,
        industry: body.industry,
        investmentType: body.investmentType,
        NID: body.NID,
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
    const user = await prisma.investor.findUnique({
      where: { Username: req.body.Username },
    });

    if (!user || user.password != req.body.password) {
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

router.get("/investor-home", async (req, res) => {
  try {
    const startupInfo = await prisma.startupInfo.findMany();

    if (!startupInfo || startupInfo.length === 0) {
      console.log("Nothing Found!");
    }
    res.status(200).json({ startupInfo });
  } catch (error) {
    console.log(error);
  }
});

router.get("/startup-info/:tinNumber", async (req, res) => {
  try {
    const { tinNumber } = req.params;
    const startupInfo = await prisma.startupInfo.findUnique({
      where: { tinNumber: tinNumber },
    });
    if (!startupInfo) {
      console.log("Not Found");
    }
    res.status(200).json(startupInfo);
  } catch (error) {
    console.log(error);
  }
});

router.get("/startup/profile/:tinNumber", async (req, res) => {
  try {
    console.log("paise");
    const { tinNumber } = req.params;
    const startupInfo = await prisma.startupInfo.findUnique({
      where: { tinNumber: tinNumber },
      include: { Manager: true },
    });
    if (!startupInfo) {
      console.log("Not Found");
    }
    console.log(startupInfo);
    const managerInfo = startupInfo.Manager;
    console.log(tinNumber);
    console.log(managerInfo.startups);
    res.status(200).json({ ...managerInfo, startups: [startupInfo] });
  } catch (error) {
    console.log(error);
  }
});
router.post("/set-meeting/:username", async (req, res) => {
  const { time, date, tinNumber } = req.body;
  const { username } = req.params;

  try {
    if (!time || !date || !tinNumber) {
      console.log("Some fields are missing!");
      return res.status(400).json({ message: "Some fields are missing" });
    }
    // Find the investor
    const investor = await prisma.investor.findUnique({
      where: { Username: username },
    });

    if (!investor) {
      console.log("Investor not found!");
      return res.status(404).json({ error: "Investor not found" });
    }

    // Find the associated startup with its manager
    const startup = await prisma.startupInfo.findUnique({
      where: { tinNumber: tinNumber },
      include: {
        Manager: true,
      },
    });

    if (!startup) {
      console.log("Startup not found!");
      return res.status(404).json({ message: "Startup not found" });
    }

    // Access the associated StartupManager
    const startupManager = startup.Manager;

    console.log("Associated StartupManager:", startupManager);

    // Add your logic to store the meeting in the database, e.g., using Prisma
    // ...

    // Send a success response
    const updatedSchedule = await prisma.schedule.create({
      data: {
        // Assuming 'time' is a valid time string
        date: new Date(`${date}T${time}`), // Assuming 'date' is a valid date string
        investor: {
          connect: { Username: username },
        },
        startupManager: {
          connect: { Username: startupManager.Username },
        },
        startupInfo: {
          connect: { tinNumber: tinNumber },
        },
      },
    });

    console.log("Updated Schedule:", updatedSchedule);

    // Send a success response
    return res
      .status(200)
      .json({ success: true, message: "Meeting set successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/meeting-searched/:code", async (req, res) => {
  try {
    const { code } = req.params;
    console.log(code)

    const meeting = await prisma.schedule.findMany({
      where: {
        tinNumber: code,
      },
      select: {
        date: true,
      },
    });

    if (meeting.length === 0) {
      console.log("There is no meeting found!");
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }

    const meetingData = meeting[0].date; // Assuming you want to send data for the first meeting found

    return res.status(200).json({
      
      meetingData,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});


router.get('/search-by-name/:name',async(req,res)=>{
  try{
    const {name}= req.params;
    const startup = await prisma.startupInfo.findMany({
      where: {startupName:name}
    })
    if(startup.length===0){
      return res.status(404).json({
        message: "No Startup Found"
      })
    }
    return res.status(200).json({
      startup
    })

  }catch(error){
    console.log("error");
  }
})

router.get('/investor-profile',async(req,res)=>{
  try{
    const username=req.query.username;
    const investor= await prisma.investor.findUnique({
      where:{
        Username:username,
      }
    })
    if(!investor){
      console.log("Not found any investor");
    }
    console.log("Found")
    return res.status(200).json({
      investor
    })

  }catch{
    console.log("error");
  }
})


router.put('/update-investor-profile',async(req,res)=>{
  const { username, ...updatedData } = req.body;
  
  try{
    const updatedProfile = await prisma.investor.update({
      where:{Username:username},
      data:updatedData
    })
    res.json(updatedProfile)
  }catch(error){
    console.log("error")
  }
})

router.get("/bar", async (req, res) => {
  try {
    console.log("paise");

    const startupInfo = await prisma.startupInfo.findMany();

    const startupCounts = {};
    startupInfo.forEach((startup) => {
      const industry = startup.industry || "Others";
      startupCounts[industry] = (startupCounts[industry] || 0) + 1;
    });

    const result = Object.entries(startupCounts).map(([fieldName, count]) => ({
      fieldName,
      count,
    }));
    result.sort((a, b) => {
      if (a.fieldName === "Others") return 1;
      if (b.fieldName === "Others") return -1;
      return 0;
    });
    res.json(result);
  } catch (error) {
    console.log("error status", res.status);
  }
});

module.exports = router;
