const Sequelize = require('sequelize');

const sequelize = new Sequelize('EP', 'root', '', {
    host: 'localhost',
    dialect: 'mysql2' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Model = Sequelize.Model;
class Users extends Model {}
Users.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'Users'
});

//Inserción y actualización de varios registros.
sequelize.sync()
    .then(() => Users.create({
        firstName: 'Pedro',
        lastName: 'Rodriguez'
    }))
    .then(jane => {
        console.log(jane.toJSON());
    })
    .then(() => Users.create({
        firstName: 'Jorge',
        lastName: 'Perez'
    }))
    .then(jane => {
        console.log(jane.toJSON());
    })
    .then(() => Users.create({
        firstName: 'Angel',
        lastName: 'Cutri'
    }))
    .then(jane => {
        console.log(jane.toJSON());
    })

    .then(() => Users.update({
        firstName: "Micaela",
        lastName: "Gutierrez"
    }, {
        where: {
            lastName: 'Rodriguez' && "Perez"

        }
    }).then(() => {
        console.log("Done");
    }));