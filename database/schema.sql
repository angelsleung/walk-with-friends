set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "routes" (
  "routeId"          serial,
  "locationA"        text    not null,
  "locationB"        text    not null,
  "locationC"        text    not null,
  "distance"         text    not null,
  "duration"         text    not null,
  "placeIds"         text    not null,
  "lastWalked"       text    not null,
  "nextWalk"         text    not null,
  "sharedWith"       text    not null,
  "createdAt"   timestamptz(6) not null default now(),
  primary key ("routeId")
);

create table "users" (
  "userId"           serial,
  "friends"          text    not null,
  "friendsRouteIds"  text    not null
);

create table "friendsRoutes" (
  "routeId"          serial,
  "friendName"       text    not null,
  "locationA"        text    not null,
  "locationB"        text    not null,
  "locationC"        text    not null,
  "distance"         text    not null,
  "duration"         text    not null,
  "placeIds"         text    not null,
  "nextWalk"         text    not null
);
