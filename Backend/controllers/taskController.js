const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const createTask = async (req, res)=>{
    const {title, description}= req.body;
    const userId = req.user.userId;

    if(!title || !description){
        return res.status(400).json({message:'title and description are required'});
    }

    try{
        const task = await prisma.task.create({
            data:{
                title,
                description,
                userId,
            },
    });
    res.status(201).json(task);
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error saving task'});
    }
};

const getTasks=async(req, res)=>{
    try{
        const tasks = await prisma.task.findMany({
            where:{
                userId:req.userId,
            },
            orderBy:{
                createdAt: 'desc',
            },
        });
        res.json({tasks});
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
};

module.exports={createTask, getTasks};