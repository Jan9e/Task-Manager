const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const registerUser = async(req, res)=>{
    const {name, email, password}= req.body;
    if(!name || !email || !password)return res.status(400).json({message: 'All fields are required'});

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await prisma.user.findUnique({where:{email}});

    if(existingUser) return res.status(400).json({message:'Email already registered'});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        },
    });

    res.status(201).json({message: 'User registered successfully', user: {id:user.id, email:user.email}});
};

const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password)
        return res.status(400).json({message:'Email and password are required'});

    const user = await prisma.user.findUnique({where: {email}});

    if(!user) return res.status(400).json({message:'Email doesn/t exists.'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: 'Incorrect password'});

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn:'1d'});
    res.json({message: 'Login successful', token});
};

module.exports = {registerUser, loginUser};