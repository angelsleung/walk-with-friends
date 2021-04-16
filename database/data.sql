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

insert into "users" ("name", "weeklyDistance", "friends", "friendsRouteIds")
values (
  'Misty', '3.4', '["Brock","Ash","Jessie","James","Jenny","Joy","Gary"]','[]'
  ),
  (
  'Brock', '2.8', '["Misty","Ash","Jessie","James","Jenny","Joy","Gary"]','[]'
  ),
  (
  'Ash', '5.2','["Misty","Brock","Jessie","James","Jenny","Joy","Gary"]','[]'
  );


insert into "friendsRoutes" ("friendName", "locationA", "locationB", "locationC", "distance", "duration", "placeIds", "nextWalk")
values (
  'Jessie',
  'Pike Place Market, Pike Street, Seattle, WA, USA',
  'Space Needle, Broad Street, Seattle, WA, USA',
  'Gum Wall, Post Alley, Seattle, WA, USA',
  '2.3 mi',
  '48 minutes',
  '["ChIJPcr187JrkFQRLApO8QKP8ZM","ChIJ-bfVTh8VkFQRDZLQnmioK9s","ChIJaYxSWbJqkFQRIx56JsKqNCA","ChIJPcr187JrkFQRLApO8QKP8ZM"]',
  'Sat Apr 24 2021 14:00:00 GMT-0700 (Pacific Daylight Time)'
),
( 'James',
  'Downtown Park, Northeast 4th Street, Bellevue, WA, USA',
  'Starbucks, Northeast 8th Street, Bellevue, WA, USA',
  'Chipotle Mexican Grill, Northeast 4th Street, Bellevue, WA, USA',
  '1.4 mi',
  '29 minutes',
  '["ChIJYVqRI4dskFQRVWnuu-Qjk0E","ChIJTdIWiYVskFQRGVoHhMIyhXg","ChIJW4VXzodskFQRseSBkOHh9Vg","ChIJYVqRI4dskFQRVWnuu-Qjk0E"]',
  'Sun Apr 25 2021 11:00:00 GMT-0700 (Pacific Daylight Time)'
),
( 'Brock',
  'LearningFuze Coding',
  'Irvine Spectrum Center, Spectrum Center Drive, Irvine, CA, USA',
  'Los Olivos Community Park, Alfonso Dr, Irvine, CA, USA',
  '3.9 mi',
  '1 hr 18 mins',
  '["ChIJKZcT2t_n3IARhA7AdKhMkuQ","ChIJR892-fvn3IARQnnqgTu-Phc","ChIJK1FF_m7n3IARfaMt7B-ljH0","ChIJKZcT2t_n3IARhA7AdKhMkuQ"]',
  'Sat May 01 2021 12:00:00 GMT-0700 (Pacific Daylight Time)'
);
