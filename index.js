import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());


app.post('/user', async (req, res) => {
  try {
    console.log(req)
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.get('/user', async (req, res) => {
  try {
    let users = [];
    if (req.query.name) {
      users = await prisma.user.findMany({
        where: {
          name: req.query.name,
        },
      });
    } else {
      users = await prisma.user.findMany();
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});