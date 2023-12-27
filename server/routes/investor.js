var express = require('express');
var router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/home',(req,res)=>{
    res.json('hello')
})