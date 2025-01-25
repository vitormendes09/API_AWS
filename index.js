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

  let users = [];
  
  if(req.query){  
      users = await prisma.user.findMany({
        where: {
          name: req.query.name
        }
      })
    
  }else{
     users = await prisma.user.findMany();
  }
  
  res.status(200).json(users);
}); 

app.put('/user/:id', async (req, res) => {
  
  await prisma.user.update({
    where: { id: req.params.id

     },
    data: {
      name: req.body.name,
      email: req.body.email,
      },
  });

  res.status(201).json(req.body);
});


app.delete('/user/:id', async (req, res) => {

  await prisma.user.delete({
    where: { 
      id: req.params.id 
    }});

  res.status(200).json({ message: 'User deleted successfully' });
});


app.listen(3000, () => {        
    console.log('Server is running on http://localhost:3000');
    }); 