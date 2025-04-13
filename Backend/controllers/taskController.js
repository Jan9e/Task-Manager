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
                userId:req.user.userId,
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

const updateTask = async(req , res)=>{
    const {id} = req.params;
    const {completed} = req.body;
    try{
        const task = await prisma.task.update({
            where:{id:Number(id)},
            data:{completed},
        });
        res.json({message: 'Task updated', task});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'update failed'});
    }
}

const deleteTask = async(req, res) =>{
    const {id} = req.params;

    try{
        const task = await prisma.task.findUnique({
            where:{id: Number(id)},
        });

        if(!task){
            return res.status(404).json({error: 'Task not found'})
        }

        await prisma.task.delete({
            where:{id:Number(id)},
        });
        res.status(200).json({message:'Task deleted successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({error:'server error'});
    }
};

module.exports={createTask, getTasks, updateTask, deleteTask};