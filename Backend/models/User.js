const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Cambiado a bcryptjs
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Asegura que cada usuario tenga un nombre único
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = bcrypt.genSaltSync(saltRounds); // Usar bcryptjs para generar sal
        this.password = bcrypt.hashSync(this.password, salt); // Usar bcryptjs para hashear
        next();
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    const isMatch = bcrypt.compareSync(candidatePassword, this.password); 
    callback(null, isMatch);
};

module.exports = mongoose.model('User', userSchema);

