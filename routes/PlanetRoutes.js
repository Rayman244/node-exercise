const express = require("express");
const axios = require("axios");
const app = express();

app.get("/", async (req, res) => {
  const swapiUrl = "https://swapi.dev/api/planets/?page=1";
  try {
    let finalArr = [];
    let response = await axios.get(swapiUrl);
    while (response.data.next) {
      response = await axios.get(response.data.next);
      // all planets from each page in one variable
      let planets = response.data.results;
      // loop through each planet then through each resident and get the name from the API
      planets.forEach(async (planet) => {
        let resNames = [];
        planet.residents.forEach(async (resident) => {
          // getting the persons name from API
          person = await axios.get(resident).then((res) => res.data.name);
          resNames.push(person);
          planet.residents = resNames;
          // Adding the finished planet to the final array
          finalArr.push(planet);
        });
      });
    }
    return res.status(200).json(finalArr);
  } catch (error) {
    res.status(500).json({ error: "Cant get planets" });
  }
});

module.exports = app;
