const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const peopleRoute = require('./routes/PeopleRoutes');
const planetsRoute = require('./routes/PlanetRoutes')

app.use('/people',peopleRoute)
app.use('/planets',planetsRoute)

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
