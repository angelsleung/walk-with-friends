set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "users" (
  "userId"           serial,
  "name"             text    not null,
  "weeklyDistance"   float   not null,
  primary key ("userId")
);

create table "routes" (
  "routeId"         serial,
  "userId"          integer  not null,
  "locationA"        text    not null,
  "locationB"        text    not null,
  "locationC"        text    not null,
  "distance"         text    not null,
  "duration"         text    not null,
  "placeIds"         text    not null,
  "lastWalked"       text    not null,
  "nextWalk"         text    not null,
  "createdAt"   timestamptz(6) not null default now(),
  primary key ("routeId")
);

create table "friends" (
  "userId"          integer  not null,
  "friendUserId"    integer  not null
);

create table "sharedRoutes" (
  "routeId"          serial,
  "userId"          integer  not null
);
