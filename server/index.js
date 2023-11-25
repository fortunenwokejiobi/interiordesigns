import path from 'path';
import fs from 'fs';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from '../components/App';
import { MongoClient } from 'mongodb';

const PORT = process.env.PORT || 3000;
const app = express();

const uri = "mongodb+srv://fnwokeji:born2004@finalproject.1hb1ura.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/api/boards', async (req, res) => {
  try {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db('companies');
    const collection = database.collection('companies-collection');

    const companies = await collection.find({}).toArray();

    res.status(200).json({ boards: companies });
  } catch (error) {
    console.error('Error fetching boards:', error); // Log the specific error
    res.status(500).json({ message: 'Error fetching boards' });
  }
});

app.get('/', async (req, res) => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db('companies');
    const collection = database.collection('companies-collection');

    // Fetch data from the 'companies-collection'
    const companies = await collection.find({}).toArray();

    await client.close();

    // Render your React app with fetched data
    const appContent = ReactDOMServer.renderToString(<App companies={companies} />);

    fs.readFile(path.resolve(__dirname, '..', 'dist', 'index.html'), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading index.html:', err);
        return res.status(500).send('Internal Server Error');
      }

      const renderedHtml = data.replace('<div id="root"></div>', `<div id="root">${appContent}</div>`);
      res.send(renderedHtml);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/addCompany', async (req, res) => {
  try {
    const { name, description, colors, designs, phone, email } = req.body;

    console.log("server we have ", name)
    console.log("server we have ", description)
    console.log("server we have ", colors)
    console.log("server we have ", designs)
    console.log("server we have ", phone)
    console.log("server we have ", email)
    // Your MongoDB connection setup
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db('companies');
    const collection = database.collection('companies-collection');

    const companyData = {
      name,
      description,
      designs,
      colors,
      phone,
      email,
      score: 0, // Assuming you might want to set a default value for score
    };

    await collection.insertOne(companyData);

  


    await client.close();

    res.status(200).json({ message: 'Company added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
