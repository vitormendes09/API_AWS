const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const promBundle = require("express-prom-bundle");
const config = require('./system-life');
const middlewares = require('./middleware');
const models = require('./models/user');


require('dotenv').config();

const APP_PORT = process.env.APP_PORT || "3001";

const metricsMiddleware = promBundle({
    includeMethod: true, 
    includePath: true, 
    includeStatusCode: true, 
    includeUp: true,
    promClient: {
        collectDefaultMetrics: {}
    }
});

app.use(middlewares.countRequests);
app.use(metricsMiddleware);
app.use(config.middlewares.healthMid);
app.use('/', config.routers);
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/users/new', (req, res) => {
    res.render('add-user');
});

app.post('/users', async (req, res) => {
    let valid = req.body.name.length > 0 && req.body.quantity > 0;

    if (valid) {
        await models.User.create({ name: req.body.name, quantity: req.body.quantity });
        res.redirect('/');
    } else {
        res.render('add-users', { user: { name: req.body.name, quantity: req.body.quantity }, valido: false });
    }
});

app.get('/', async (req, res) => {
    const users = await models.User.findAll();
    res.render('index', { users: users });
});

app.get('/users/:id', async (req, res) => {
    const user = await models.User.findByPk(req.params.id);
    
    if (!user) {
        return res.status(404).json({ message: 'usuário não encontrado' });
    }
    
    res.render('user-detail', { user: user });
});

app.post('/users/:id', async (req, res) => {
    const user = await models.User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'user não encontrado' });
    }

    await models.User.destroy({ where: { id: req.params.id } });
    res.redirect('/');
});

models.initDatabase();
app.listen(APP_PORT);

console.log('Aplicação rodando na porta --> ' + APP_PORT);