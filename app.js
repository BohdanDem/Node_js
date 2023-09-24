const express = require('express');

const app = express();
const fsService = require('./fs.service')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res)=> {
    const users = await fsService.reader()
    res.json(users)
})

app.get('/users/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const users = await fsService.reader()
        const user = users.find(user => user.id === (+id))
        if (!user) {
            throw new Error('User does not exist')
        }
        res.json(user)
    }catch (e) {
        res.status(404).json(e.message);
    }
})

app.post('/users', async (req, res)=>{
    try {
        const { name, age, email } = req.body

        if (!name || name.length < 2) {
            throw new Error('The name is too small')
        }
        if (!age || age < 1 || age > 120) {
            throw new Error('The age should be in range from 1 to 120')
        }
        if (!email || !email.includes('@')) {
            throw new Error('The email is wrong')
        }

        const users = await fsService.reader()
        const lastId = users[users.length - 1].id
        const newUser = { id: lastId + 1, name, age, email }

        users.push(newUser)
        await fsService.writer(users)
        res.status(201).json({message: "User created"});
    }catch (e) {
        res.status(404).json(e.message);
    }
})

app.put('/users/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { name, age, email } = req.body;

        if (!name || name.length < 2) {
            throw new Error('Name is too small')
        }
        if (!age || age < 1 || age > 120) {
            throw new Error('The age should be in range from 1 to 120')
        }
        if (!email || !email.includes('@')) {
            throw new Error('The email is wrong')
        }

        const users = await fsService.reader()
        const user = users.find(user => user.id === (+id))
        user.name = name
        user.age = age
        user.email = email

        await fsService.writer(users)
        res.status(201).json({message: 'User is updated'})
    }catch (e) {
        res.status(404).json(e.message);
    }
})

app.delete('/users/:id', async (req, res)=>{
    try {
        const { id } = req.params;

        const users = await fsService.reader()
        const index = users.findIndex(user => user.id === (+id))

        if (index === -1) {
            throw new Error('User does not exist')
        }

        users.splice(index, 1)
        await fsService.writer(users)
        res.sendStatus(204);
    }catch (e) {
        res.status(404).json(e.message);
    }
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server has successfully started on PORT ${PORT}`);
})