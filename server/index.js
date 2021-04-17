require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/routes/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    select *
      from "routes"
      join "users"
        on "friends"."friendUserId" = "users"."userId"
     where "friends"."userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/routes/:routeId', (req, res) => {
  const routeId = req.params.routeId;
  const sql = `
  select "routeId",
         "placeIds",
         "lastWalked",
         "nextWalk",
         "sharedWith"
    from "routes"
  where "routeId" = $1
  `;
  const params = [routeId];
  db.query(sql, params)
    .then(result => {
      const [route] = result.rows;
      res.json(route);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/routes', (req, res) => {
  const {
    locationA,
    locationB,
    locationC,
    distance,
    duration,
    placeIds,
    lastWalked,
    nextWalk,
    sharedWith
  } = req.body;
  const sql = `
    insert into "routes" (
      "locationA",
      "locationB",
      "locationC",
      "distance",
      "duration",
      "placeIds",
      "lastWalked",
      "nextWalk",
      "sharedWith"
    )
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *
  `;
  const params = [
    locationA,
    locationB,
    locationC,
    distance,
    duration,
    placeIds,
    lastWalked,
    nextWalk,
    sharedWith
  ];
  db.query(sql, params)
    .then(result => {
      const [route] = result.rows;
      res.status(201).json(route);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.delete('/api/routes/:routeId', (req, res) => {
  const routeId = req.params.routeId;
  const sql = `
  delete from "routes"
        where "routeId" = $1
  `;
  const params = [routeId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred'
      });
    });
});

app.patch('/api/routes/sharedWith/:routeId', (req, res) => {
  const routeId = req.params.routeId;
  const { sharedWith } = req.body;
  const sql = `
  update "routes"
  set "sharedWith" = $1
  where "routeId" = $2
  `;
  const params = [sharedWith, routeId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.patch('/api/routes/walkDate/:routeId', (req, res) => {
  const routeId = req.params.routeId;
  const type = req.body.lastWalked || req.body.lastWalked === ''
    ? 'lastWalked'
    : 'nextWalk';
  const date = req.body[type];
  const sql = `
  update "routes"
  set "${type}" = $1
  where "routeId" = $2
  `;
  const params = [date, routeId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/users', (req, res) => {
  const sql = `
    select *
      from "users"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/friendsRoutes', (req, res) => {
  const sql = `
    select *
      from "friendsRoutes"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/friends/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    select *
      from "friends"
      join "users"
        on "friends"."friendUserId" = "users"."userId"
     where "friends"."userId" = $1
     order by "users"."weeklyDistance" desc
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
