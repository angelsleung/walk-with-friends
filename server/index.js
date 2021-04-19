require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

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

app.get('/api/routes/:routeId', (req, res) => {
  const { routeId } = req.params;
  const sql = `
  select *
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
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.post('/api/routes', (req, res) => {
  const {
    userId,
    locationA,
    locationB,
    locationC,
    distance,
    duration,
    placeIds,
    lastWalked,
    nextWalk
  } = req.body;
  const sql = `
    insert into "routes" (
      "userId",
      "locationA",
      "locationB",
      "locationC",
      "distance",
      "duration",
      "placeIds",
      "lastWalked",
      "nextWalk"
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
  const params = [
    userId,
    locationA,
    locationB,
    locationC,
    distance,
    duration,
    placeIds,
    lastWalked,
    nextWalk
  ];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.patch('/api/routes/:routeId', (req, res) => {
  const { routeId } = req.params;
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
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.delete('/api/routes/:routeId', (req, res) => {
  const { routeId } = req.params;
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
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.get('/api/savedRoutes/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
        select *
          from "routes"
         where "userId" = $1
         order by "createdAt"
      `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.get('/api/sharedRoutes/:routeId', (req, res) => {
  const { routeId } = req.params;
  const sql = `
      select *
        from "sharedRoutes"
        join "users" using ("userId")
       where "routeId" = $1
      `;
  const params = [routeId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.patch('/api/sharedRoutes/:routeId', (req, res) => {
  const { routeId } = req.params;
  const { userId } = req.body;
  const sql = `
  insert into "sharedRoutes" ("routeId", "userId")
    values ($1, $2)
  `;
  const params = [routeId, userId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
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
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.get('/api/friendsRoutes/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
      select *
        from "routes"
        join "sharedRoutes" using ("routeId")
        join "users" on "users"."userId" = "routes"."userId"
       where "sharedRoutes"."userId" = $1
      `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.post('/api/auth/sign-up', (req, res) => {
  const { username, password } = req.body;
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "name", "weeklyDistance")
          values ($1, $2, $3, $4)
          returning *
      `;
      const params = [username, hashedPassword, username, 0.0];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      const { userId } = user;
      const payload = { userId, username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET);
      res.json({ token, user: payload });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.post('/api/auth/log-in', (req, res) => {
  const { username, password } = req.body;
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        res.status(401).json({ error: 'invalid login' });
        return;
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            res.status(401).json({ error: 'invalid login' });
            return;
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'an unexpected error occurred' });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
