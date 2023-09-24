const fs = require("node:fs/promises")
const path = require("node:path")

const usersDataBase = path.join(__dirname, 'db.json')

const reader = async () => {
    const users = await fs.readFile(usersDataBase, "utf-8")
    return JSON.parse(users)
}

const writer = async (users) => {
    await fs.writeFile(usersDataBase, JSON.stringify(users));
}

module.exports = {
    reader,
    writer
}