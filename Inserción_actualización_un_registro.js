const Sequelize = require('sequelize');

const sequelize = new Sequelize('EP', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
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

//Inserción y actualización de un registro.
sequelize.sync()
    .then(() => Users.create({
        firstName: 'Pedro',
        lastName: 'Rodriguez'
    }))
    .then(jane => {
        console.log(jane.toJSON());
    })

    .then(() => Users.update({
        firstName: "Angel",
        lastName: "Cutri"
    }, {
        where: {
            firstName: 'Pedro',
            lastName: 'Rodriguez'
        }
    }).then(() => {
        console.log("Done");
    }));