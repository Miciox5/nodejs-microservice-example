/* Logic Application */

const express = require('express')
const axios = require('axios')
const ejs = require('ejs')

const app = express();
const key_api = "02464ad5bcc64c79a947413ebc72a510"

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
  res.render('index')
})

app.post('/search', async (req,res) => {
  const {query} = req.body;
  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key_api}`)
  const recipes = response.data.results;

  res.render('results', {recipes})
})

app.get('/recipe/:id', async(req,res) => {
  const {id} = req.params;
  const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key_api}`)
  const recipe = response.data
  res.render('response', {recipe})
})

const PORT = 3000

app.listen(PORT, ()=> {
  console.log('Server is running')
})