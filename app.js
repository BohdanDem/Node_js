const express = require('express');
const app = express();
const path = require("node:path");
const fs = require("node:fs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersDataBase = path.join(__dirname, 'db.json')
let users = [];

fs.readFile(usersDataBase, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    users = JSON.parse(data)
});

app.get('/users', (req, res)=>{
    res.json({data: users})
})

app.get('/users/:id', (req, res)=>{
    const { id } = req.params;
    res.json({data: users[+id - 1]})
})

app.post('/users', (req, res)=>{
    users.push(req.body)
    const updatedUsers = JSON.stringify(users)
    fs.writeFile(path.join(usersDataBase), updatedUsers, () => {});
    res.status(201).json({message: "User created"});
})

app.put('/users/:id', (req, res)=>{
    const { id } = req.params;
    const nUsers = users.map(user => (user.id === id) ? req.body : user)

    console.log(nUsers);

    const updUsers = JSON.stringify(nUsers)
    fs.writeFile(path.join(usersDataBase), updUsers, () => {});

    res.json({message: 'User updated'})
})

app.delete('/users/:id', (req, res)=>{
    const { id } = req.params;
    users.splice(+id - 1, 1);

    res.sendStatus(204);
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server has successfully started on PORT ${PORT}`);
})