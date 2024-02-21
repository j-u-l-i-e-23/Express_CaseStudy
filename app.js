
const express = require('express');

const data = require('./data/data.json');

const app = express();
const PORT= 3000;

app.use(express.json())

//GET
app.get('/',(req,res) =>{
    // res.send('This is a GET request at /');

    res.json(data);
});


//POST
app.post('/create',(req,res) =>{
    data.push(req.body);
    res.json(data);
});


//PUT
app.put('/edit', (req, res) => {
    console.log(req.body);
    try {
        // Check if request body or the "name" field is missing
        if (!req.body || !req.body.Name) {
            return res.status(400).json({ error: 'Name field is required in the request body' });
        }

        const nameToUpdate = req.body.Name;

        // Find the index of the data object with the matching Name
        const indexToUpdate = data.findIndex(item => item.Name === nameToUpdate);

        if (indexToUpdate === -1) {
            return res.status(404).json({ error: `Data with Name "${nameToUpdate}" not found` });
        }

        // Update the data object at the found index
        data[indexToUpdate] = req.body;

        // Optionally, you can log the updated data
        console.log('Data updated:', req.body);

        // Return success response with the updated data
        res.status(200).json({ message: 'Data updated successfully', data: req.body });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//DELETE
app.delete('/delete',(req,res) =>{
    data.pop();
    res.send({message:"Deleted",data})
});



app.listen(PORT, ()=>{
    console.log(`The server is running on ${PORT}`);
    console.log(data);
});