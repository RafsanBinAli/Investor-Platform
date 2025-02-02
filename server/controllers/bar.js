const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getBarInfo=async (req, res) => {
    try {
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
  };