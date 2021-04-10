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
  "directions"       text    not null,
  "createdAt"   timestamptz(6) not null default now(),
  primary key ("routeId")
)
