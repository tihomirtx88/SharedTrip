const express = require(`express`);
const {create: handlebars} = require(`express-handlebars`);
const sessiton = require(`express-session`);
const { startSession } = require("mongoose");

module.exports = (app) => {
    app.engine(`.hbs`, handlebars({
        extname: `.hbs`,
    }).engine);
    app.set(`view engine`,`.hbs`);

    app.use(`/static`, express.static(`static`));
    app.use(sessiton({
        secret: `secret`,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: `auto`
        }
    }));
    app.use(express.urlencoded({extended: true}));
}

   