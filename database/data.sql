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
   '100 100th Ave NE, Bellevue, WA 98004, USA',
  '10214 NE 8th St, Bellevue, WA 98004, USA',
  '1111 110th Ave NE, Bellevue, WA 98004, USA',
  '2.4 mi',
  '49 minutes',
  '["ChIJYVqRI4dskFQRVWnuu-Qjk0E","ChIJTdIWiYVskFQRGVoHhMIyhXg","ChIJAf2ta4xskFQRMkLmAk-vP7o","ChIJP6vf-2BtkFQReluuaGJrqDY","ChIJycsFgDZtkFQRsTHN40YMGro"]',
   'Thu Apr 15 2021 13:00:00 GMT-0700 (Pacific Daylight Time)',
   'Sat Apr 24 2022 14:00:00 GMT-0700 (Pacific Daylight Time)',
   '["Misty","Joy"]'
);

insert into "users" ("userId", "friends", "friendsRouteIds")
values ('1','["Misty","Brock","Ash","Jessie","James","Jenny","Joy","Gary"]','[]');

insert into "friendsRoutes" ("locationA", "locationB", "locationC", "distance", "duration", "placeIds", "nextWalk")
values(
  '100 100th Ave NE, Bellevue, WA 98004, USA',
  '10214 NE 8th St, Bellevue, WA 98004, USA',
  '1111 110th Ave NE, Bellevue, WA 98004, USA',
  '2.4 mi',
  '49 minutes',
  '["ChIJYVqRI4dskFQRVWnuu-Qjk0E","ChIJTdIWiYVskFQRGVoHhMIyhXg","ChIJAf2ta4xskFQRMkLmAk-vP7o","ChIJP6vf-2BtkFQReluuaGJrqDY","ChIJycsFgDZtkFQRsTHN40YMGro"]',
  'Sat Apr 24 2022 14:00:00 GMT-0700 (Pacific Daylight Time)',
);
