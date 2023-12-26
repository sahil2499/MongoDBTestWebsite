const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://admin123:admin123@cluster0.f5kvwmf.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Schema for Hoists
const hoistSchema = new mongoose.Schema({
  name: String,
  machinename: String,
  isAvailable: String,
  motarId: String,
  pannelId: String
});

const Hoist = mongoose.model('Hoist', hoistSchema);

// Schema for Tools
const toolSchema = new mongoose.Schema({
  name: String,
  toolname: String,
  toolBarCode: String,
  toolQuantity: String
});

const Tool = mongoose.model('Tool', toolSchema);

const materialSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    location: String,
  });
  
  // Create Material model
const Material = mongoose.model('Material', materialSchema);
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  // Fetch hoists and tools from the database
  const hoists = await Hoist.find();
  const tools = await Tool.find();

  // Render the index page with hoists and tools
  res.render('index', { hoists, tools });
});

app.post('/addHoist', async (req, res) => {
  const { name, machinename, isAvailable, motarId, pannelId } = req.body;

  if (!name || !machinename || !isAvailable || !motarId || !pannelId) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newHoist = new Hoist({ name, machinename, isAvailable, motarId, pannelId });

  try {
    await newHoist.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding hoist.' });
  }
});

app.get('/hoists', async (req, res) => {
    try {
      const hoists = await Hoist.find();
      res.render('hoists', { hoists });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching hoists.' });
    }
  });

  app.get('/addHoist', (req, res) => {
    res.render('addHoist');
  });
  
  // Handle form submission for adding a hoist
  app.post('/addHoist', (req, res) => {
    const newHoist = req.body; // Assuming form fields match the hoist data structure
    hoists.push(newHoist);
    res.redirect('/hoists');
  });
  
  // Tools page
  

  
  // Fetch and display tools
  app.get('/tools', async (req, res) => {
    try {
      const tools = await Tool.find();
      res.render('tools', { tools });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching tools.' });
    }
  });
  
app.get('/addTool', async(req,res)=>{
    res.render('addTool')

});
app.post('/addTool', async (req, res) => {
    const { toolname, toolBarCode, toolQuantity } = req.body;
  
    if (!toolname || !toolBarCode || !toolQuantity) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    const newTool = new Tool({ name: 'tools', toolname, toolBarCode, toolQuantity });
  
    try {
      await newTool.save();
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error adding tool.' });
    }
  });

  // ... (existing code)

// Render the update hoist page
app.get('/updateHoist/:id', async (req, res) => {
    try {
      const hoist = await Hoist.findById(req.params.id);
      res.render('updateHoist', { hoist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching hoist for update.' });
    }
  });
  
  // Render the update tool page
  app.get('/updateTool/:id', async (req, res) => {
    try {
      const tool = await Tool.findById(req.params.id);
      res.render('updateTool', { tool });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching tool for update.' });
    }
  });
  
  // ... (existing code)
  

  app.post('/updateHoist/:id', async (req, res) => {
    const { name, machinename, isAvailable, motarId, pannelId } = req.body;
  
    
  
    try {
      await Hoist.findByIdAndUpdate(req.params.id, { name, machinename, isAvailable, motarId, pannelId });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating hoist.' });
    }
  });
  
  app.post('/updateTool/:id', async (req, res) => {
    const { name, toolname, toolBarCode, toolQuantity } = req.body;
  
    
    try {
      await Tool.findByIdAndUpdate(req.params.id, { name, toolname, toolBarCode, toolQuantity });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating tool.' });
    }
  });

 // ... (existing code)

app.get('/updateHoist/:id', async (req, res) => {
    try {
      const hoist = await Hoist.findById(req.params.id);
      res.render('updateHoist', { hoist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching hoist for update.' });
    }
  });
  
  app.post('/updateHoist/:id', async (req, res) => {
    const { name, machinename, isAvailable, motarId, pannelId } = req.body;
  
    if (!name || !machinename || !isAvailable || !motarId || !pannelId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      await Hoist.findByIdAndUpdate(req.params.id, { name, machinename, isAvailable, motarId, pannelId });
      res.redirect('/hoists');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating hoist.' });
    }
  });
  
  app.get('/updateTool/:id', async (req, res) => {
    try {
      const tool = await Tool.findById(req.params.id);
      res.render('updateTool', { tool });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching tool for update.' });
    }
  });
  
  app.post('/updateTool/:id', async (req, res) => {
    const { name, toolname, toolBarCode, toolQuantity } = req.body;
  
    if (!name || !toolname || !toolBarCode || !toolQuantity) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      await Tool.findByIdAndUpdate(req.params.id, { name, toolname, toolBarCode, toolQuantity });
      res.redirect('/tools');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating tool.' });
    }
  });
  
  // ... (existing code)

  app.get('/materials', async (req, res) => {
    try {
        const materials = await Material.find();
        // if (materials ==null){
        //     res.send
        // }
        res.render('materials', { materials });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching materials.' });
      }
  });
  
  // Display the form to add a new material
  app.get('/addMaterial', (req, res) => {
    res.render('addMaterials');
  });
  
  // Handle the submission of the form to add a new material
  app.post('/addMaterial', async (req, res) => {
    const { name, quantity, location } = req.body;
  
    // if (!toolname || !toolBarCode || !toolQuantity) {
    //   return res.status(400).json({ error: 'All fields are required.' });
    // }
  
    const newMaterial = new Material({ name: 'materials', name, quantity, location });
  
    try {
      await newMaterial.save();
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error adding material.' });
    }
  });
  
  // Display the form to update a material
  app.get('/updateMaterial/:id', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        res.render('updateMaterials', { material });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching tool for update.' });
      }
  });
  
  // Handle the submission of the form to update a material
  app.post('/updateMaterial/:id', async (req, res) => {
    const { name, quantity, location } = req.body;
  
    // if (!name || !toolname || !toolBarCode || !toolQuantity) {
    //   return res.status(400).json({ error: 'All fields are required.' });
    // }
  
    try {
      await Material.findByIdAndUpdate(req.params.id, { name, quantity, location });
      res.redirect('/materials');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating materails.' });
    }
  });
   
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
