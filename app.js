
const Recipes = require('./models/recipes')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://ghoul:XmF6UIeRuSjpXNry@cluster0-k8jwy.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }).then(
    () => console.log('connection successfuly with mongoose ')
).catch(
    (err) => console.log(` error ${err}`)
)

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api/recipes', async (req, res) => {
    const recipes = await Recipes.find()
    res.status(200).send(recipes)
})

app.get('/api/recipes/:id', async (req, res) => {
    const id = req.params.id
    const recipes = await Recipes.findById(id)
    res.status(200).send(recipes)
})

app.put('/api/recipes/:id', async (req, res) => {
    const id = req.params.id
    const recipes = new Recipes({
        _id: id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
    })
    const result = await Recipes.findByIdAndUpdate({ _id: id }, recipes, { new: true })
    res.status(200).send(result)
})

app.delete('/api/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Recipes.findByIdAndDelete({ _id: id })
    res.status(200).send(result)
})

app.post('/api/recipes', async (req, res, next) => {
    const recipes = new Recipes({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
    })
    const result = await recipes.save()
    return res.status(200).send(result)
})

app.use('/', (req, res, next) => {
    res.json({ message: "hello ghoul" });
    next();
})

app.use((req, res, next) => {
    console.log('request send successfuly', res)
})

app.listen(port, () => { console.log(`server is running at port ${port}`) })
module.exports = app