const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');
const { query } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  }

  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie=> repositorie.id == id );

  if(repositorieIndex < 0) return response.sendStatus(400).json({ message: 'User not found' });

  const user = {
    title,
    url,
    techs
  }

  const repositorie = repositories[repositorieIndex]
    
  for(let info in repositorie) if(user[info]) repositorie[info] = user[info];

  response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if( repositorieIndex < 0 ) return response.sendStatus(400).json({ message: "repositorie not found" });

  repositories.splice(repositorieIndex, 1);

  return response.sendStatus(204);

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie=> repositorie.id == id );

  if(repositorieIndex < 0) return response.sendStatus(400).json({ message: 'Repositorie not found' });

  const repositorie = repositories[repositorieIndex];

  //Irá mudar o valor de likes dinamicamente
  repositorie.likes++;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
