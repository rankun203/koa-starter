/**
 * Created on 1/6/16.
 * @author rankun203
 */
'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const config    = require('../../config').db;

const options = {
  dialect: config.dialect,
  port   : config.port
};

const client = new Sequelize(
  config.database,
  config.username,
  config.password,
  options
);

const models = {};

// read all models and import them into the "db" object
const modelPath = __dirname + '/models';
fs
  .readdirSync(modelPath)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    const model        = client.import(path.join(modelPath, file));
    models[model.name] = model;
  });

// Creates association
Object.keys(models).forEach(function (modelName) {
  if (models[modelName].options.hasOwnProperty('associate')) {
    models[modelName].options.associate(models);
  }
});


module.exports        = models;
module.exports.client = client;
