const express = require("express");
const { json } = require('express');
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const {title} = request.query;


  const result = title
  ? repositories.filter(repository => repository.title.includes(title))
  : repositories;


  return response.json(result);

  // TODO
});

app.post("/repositories", (request, response) => {

  const repository = {id: uuid(), title: 'Desafio Node.js', url: 'https://github.com/joaowalter/Bootcamp01', techs: ["Node.js", "..."], likes: 0};

  repositories.push(repository);

  return response.json(repository);

  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const projectIndex = repositories.findIndex(repository => repository.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error:'Project not found!' })
}

  const repository = {
    id,
    title,
    url,
    techs,
};

repositories[projectIndex] = repository;

return response.json(repository);
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
   const { id } =  request.params;

   const projectIndex = repositories.findIndex(repository => repository.id == id);

   if (projectIndex < 0) {
    return response.status(400).json({ error:'Project not found!' })
}

   repositories.splice(projectIndex, 1);

   return response.status(204).send();

  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } =  request.params;
  
  const projectIndex = repositories.findIndex(repository => repository.id == id);

  repositories[projectIndex].likes++;

  return response.status(204).send();

  // TODO
});

module.exports = app;
