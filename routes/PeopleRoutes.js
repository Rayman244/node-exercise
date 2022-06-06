const express = require("express");
const axios = require("axios");
const app = express();

// All people route
app.get("/", async (req, res) => {
  const baseUrl = "https://swapi.dev/api/people/?page=1";
  try {
    let finalArr = [];
    let response = await axios.get(baseUrl);
    while (response.data.next) {
      response = await axios.get(response.data.next);
      // all people from each page in one variable
      let people = response.data.results;
      // adding each list of people to the final array
      finalArr = finalArr.concat(people);
    }
    return res.status(200).json(finalArr);
  } catch (error) {
    res.status(500).json({ error: "Cant get planets" });
  }
});
// Sorted route
app.get("/:sortBy", async (req, res) => {
  const sortBy = req.params.sortBy;

  try {
    let finalArr = [];
    const swapiUrl = "https://swapi.dev/api/people/";
    let response = await axios.get(swapiUrl);
    // if the data has a next property than keep adding to the final array 
    while (response.data.next) {
      response = await axios.get(response.data.next);
      // all people from each page in one variable
      let people = response.data.results;
      finalArr = finalArr.concat(people);
    }
    //   conditional to handle the different sort options
    if (sortBy === "name") {
      let sorted = finalArr.sort((a, b) => (a.name < b.name ? -1 : 1));
      return res.status(200).json(sorted);
    } else if (sortBy === "height") {
      let sorted = finalArr.sort((a, b) => a.height - b.height);
      return res.status(200).json(sorted);
    } else if (sortBy === "mass") {
      let sorted = finalArr.sort((a, b) => a.mass - b.mass);
      return res.status(200).json(sorted);
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting people" });
  }
});

module.exports = app;
