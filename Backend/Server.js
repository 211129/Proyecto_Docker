const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/clientes');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function() {
  console.log("Conectado exitosamente a MongoDB");
});

app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.usuario,
        password: req.body.password,
    });

    newUser.save()
        .then(user => res.status(201).send({ message: 'Usuario registrado con éxito', userId: user._id }))
        .catch(err => res.status(500).send({ message: 'Error al registrar usuario', error: err }));
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
