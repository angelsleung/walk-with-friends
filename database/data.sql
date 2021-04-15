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
) values (
   'Downtown Park, 10201 NE 4th St',
  '10503 NE 4th St #200',
  '575 Bellevue Square',
  '0.9 mi',
  '19 mins',
  '["ChIJYVqRI4dskFQRVWnuu-Qjk0E","ChIJW4VXzodskFQRseSBkOHh9Vg","ChIJF7Wdd4ZskFQRhk02OceIcdo","ChIJYVqRI4dskFQRVWnuu-Qjk0E"]',
   '4/1/21 @ 11:00am',
   '4/17/21 @ 12:00pm',
   ''
);

insert into "users" ("userId", "friends", "friendsRouteIds")
values ('1','["Misty","Brock","Ash","Jessie","James","Jenny","Joy","Gary"]','[]');
