insert into "users" ("name", "weeklyDistance")
values ('Me', 0),
       ('Ash', 5.2),
       ('Misty', 3.4),
       ('Brock', 2.8),
       ('Jessie', 0.8),
       ('James', 0.7),
       ('Jenny', 1.2),
       ('Joy', 1.1),
       ('Gary', 2.5);

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
) values (
  1,
  'Pike Place Market, Pike Street, Seattle, WA, USA',
  'Space Needle, Broad Street, Seattle, WA, USA',
  'Gum Wall, Post Alley, Seattle, WA, USA',
  '2.3 mi',
  '48 minutes',
  '["ChIJPcr187JrkFQRLApO8QKP8ZM","ChIJ-bfVTh8VkFQRDZLQnmioK9s","ChIJaYxSWbJqkFQRIx56JsKqNCA","ChIJPcr187JrkFQRLApO8QKP8ZM"]',
  'Sat Apr 10 2021 14:00:00 GMT-0700 (Pacific Daylight Time)',
  ''
), (
  2,
  'Downtown Park, Northeast 4th Street, Bellevue, WA, USA',
  'Starbucks, Northeast 8th Street, Bellevue, WA, USA',
  'Chipotle Mexican Grill, Northeast 4th Street, Bellevue, WA, USA',
  '1.4 mi',
  '29 minutes',
  '["ChIJYVqRI4dskFQRVWnuu-Qjk0E","ChIJTdIWiYVskFQRGVoHhMIyhXg","ChIJW4VXzodskFQRseSBkOHh9Vg","ChIJYVqRI4dskFQRVWnuu-Qjk0E"]',
  '',
  'Sun Apr 25 2021 11:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  3,
  'Fremont Troll, North 36th Street, Seattle, WA, USA',
  'Woodland Park Zoo, Phinney Avenue North, Seattle, WA, USA',
  'Fremont Peak Park, Palatine Avenue North, Seattle, WA, USA',
  '2.4 mi',
  '51 minutes',
  '["ChIJvYSnKAEVkFQR35lxzvEE250","ChIJydSuSkkUkFQRsqhB-cEtYnw","ChIJHYrunbIVkFQR1jMy4kiywDE","ChIJvYSnKAEVkFQR35lxzvEE250"]',
  'Thu Apr 15 2021 13:00:00 GMT-0700 (Pacific Daylight Time)',
  'Sat Apr 24 2022 14:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  4,
  'LearningFuze Coding',
  'Irvine Spectrum Center, Spectrum Center Drive, Irvine, CA, USA',
  'Los Olivos Community Park, Alfonso Dr, Irvine, CA, USA',
  '3.9 mi',
  '1 hr 18 mins',
  '["ChIJKZcT2t_n3IARhA7AdKhMkuQ","ChIJR892-fvn3IARQnnqgTu-Phc","ChIJK1FF_m7n3IARfaMt7B-ljH0","ChIJKZcT2t_n3IARhA7AdKhMkuQ"]',
  '',
  'Sat May 01 2021 12:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  5,
  'Disneyland Park, Disneyland Drive, Anaheim, CA, USA',
  'Anaheim Convention Center, West Katella Avenue, Anaheim, CA, USA',
  'Stoddard Park, 9th Street, Anaheim, CA, USA',
  '3.7 mi',
  '1 hr 15 mins',
  '["ChIJa147K9HX3IAR-lwiGIQv9i4","ChIJPSkYXt7X3IARFClnE7qisj4","ChIJdQM2fiMo3YARCMLPgLCm9XQ","ChIJa147K9HX3IAR-lwiGIQv9i4"]',
  '',
  'Sun May 02 2021 13:00:00 GMT-0700 (Pacific Daylight Time)'
);

insert into "friends" ("userId", "friendUserId")
values (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (1, 6),
       (1, 7),
       (1, 8),
       (1, 9);

insert into "sharedRoutes" ("routeId", "userId")
values (1, 2),
       (1, 3),
       (2, 4),
       (2, 7),
       (3, 1),
       (4, 1),
       (5, 1);
