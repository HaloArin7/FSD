import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

var users = [
    {
        firstName: "Tom",
        lastName: "Gray",
        age: "23"
    },

    {
        firstName: "Jill",
        lastName: "Kemp",
        age:25
    }
];

router.get('/', (req, res)=>{
    console.log(users);
    res.send(users);
    });

router.post('/', (req, res)=>{
    const user = req.body;
    const userId= uuidv4();
    const userWithId= {...user, id:userId};
    users.push(userWithId);
    res.send(`User with the name ${user.firstName} added to the database`);
});

router.get('/:id', (req, res)=>{
    const {id } = req.params;
    const foundUser = users.find((user)=>user.id == id)
    res.send(foundUser);
});

router.delete('/:id', (req, res)=>{
    const{id} = req.params;
    users = users.filter((user)=>user.id != id);
    
    res.send(`User with the id ${id} deleted from the database`);
});

router.patch('/:id', (req, res)=>{
    const { id } = req.params;
    const {firstName, lastName, age} = req.body;
    const user = users.find((user)=>user.id==id);
    if(firstName){
    user.firstName= firstName;
    }
    if(lastName){
    user.lastName= lastName;
    }
    if(age){
    user.age= age;
    }
    res.send(`User with the id ${id} has been updated`);
});

    export default router;