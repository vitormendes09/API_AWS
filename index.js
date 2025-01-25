import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();


app.use(express.json());


app.post('/user', async (req, res) => {

  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      },
  });

  res.status(201).json(req.body);
});


app.get('/user', async (req, res) => {

  const users = await prisma.user.findMany();
  res.status(200).json(users);
}); 


app.put('/user/:id', async (req, res) => { 

    await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
      
  });

  res.status(200).json(user);
});
app.listen(3000, () => {        
    console.log('Server is running on http://localhost:3000');
    }); 