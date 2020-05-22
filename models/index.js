"use strict";

import { readdirSync } from "fs";
import dotenv from 'dotenv';
import { basename as _basename, join } from "path";
import Sequelize from "sequelize";

dotenv.config();

const basename = _basename(__filename);
const env = process.env.APP_ENV;

const config = require("../config/config").default[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config, {
    pool: {
        max: 30,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

readdirSync(__dirname)
    .filter(file => {
        return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    })
    .forEach(file => {
        const model = sequelize["import"](join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//sync database
sequelize.sync()
    .then(function () {
        console.log("Database looks fine");
    })
    .catch(function (err) {
        console.log(err, "Something went wrong with database.");
    });

//authenticate db
sequelize
    .authenticate()
    .then(function () {
        console.log("DB Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

export default db;
