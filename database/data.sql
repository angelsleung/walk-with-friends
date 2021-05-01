insert into "users" ("name", "weeklyDistance", "username", "hashedPassword")
values ('Ash', 5.2, 'ash', 'password'),
       ('Misty', 3.4, 'misty', 'password'),
       ('Brock', 2.8, 'brock', 'password'),
       ('Jenny', 1.2, 'jenny', 'password'),
       ('Joy', 1.1, 'joy', 'password'),
       ('Gary', 2.5, 'gary', 'password'),
       ('James', 0.7, 'james', 'password'),
       ('Jessie', 0.8, 'jessie', 'password'),
       ('Demo', 0, 'demo', '$argon2i$v=19$m=4096,t=3,p=1$g1u0nVBdf+nxbTS4/GLiHg$WzuRnCk6rs6NyaC0ApmXSUuEwooM55AVQ74zxTGQ0ZE');

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
  9,
  'Pike Place Market, Pike Street, Seattle, WA, USA',
  'Space Needle, Broad Street, Seattle, WA, USA',
  'Gum Wall, Post Alley, Seattle, WA, USA',
  2.3,
  '48 minutes',
  '["ChIJPcr187JrkFQRLApO8QKP8ZM","ChIJ-bfVTh8VkFQRDZLQnmioK9s","ChIJaYxSWbJqkFQRIx56JsKqNCA","ChIJPcr187JrkFQRLApO8QKP8ZM"]',
  'Sat Apr 24 2021 14:00:00 GMT-0700 (Pacific Daylight Time)',
  'Sun Jul 25 2021 12:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  9,
  'Disneyland Park, Disneyland Drive, Anaheim, CA, USA',
  'Anaheim Convention Center, West Katella Avenue, Anaheim, CA, USA',
  'Stoddard Park, 9th Street, Anaheim, CA, USA',
  3.7,
  '1 hr 15 mins',
  '["ChIJa147K9HX3IAR-lwiGIQv9i4","ChIJPSkYXt7X3IARFClnE7qisj4","ChIJdQM2fiMo3YARCMLPgLCm9XQ","ChIJa147K9HX3IAR-lwiGIQv9i4"]',
  'Sun Apr 11 2021 13:00:00 GMT-0700 (Pacific Daylight Time)',
  'Sat Jul 31 2021 11:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  9,
  'Hollywood Walk of Fame, Vine Street, Los Angeles, CA, USA',
  'World of Illusions, Hollywood Boulevard, Los Angeles, CA, USA',
  'Sunset Las Palmas Studios, North Las Palmas Avenue, Los Angeles, CA, USA',
  3.1,
  '1 hr 3 mins',
  '["ChIJXyC7WTu_woARPvVMCHBXd4U","ChIJD0CDniO_woARL4Y93Bw1yNw","ChIJF22Lwy2_woARMgHpFeoVNRQ","ChIJXyC7WTu_woARPvVMCHBXd4U"]',
  'Sun Apr 18 2021 14:00:00 GMT-0700 (Pacific Daylight Time)',
  'Sat Jul 24 2021 10:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  9,
  'Fremont Troll, North 36th Street, Seattle, WA, USA',
  'Woodland Park Zoo, Phinney Avenue North, Seattle, WA, USA',
  'Fremont Peak Park, Palatine Avenue North, Seattle, WA, USA',
  2.5,
  '54 minutes',
  '["ChIJl8b_mgAVkFQR9r1vmrKACpo","ChIJydSuSkkUkFQRsqhB-cEtYnw","ChIJHYrunbIVkFQR1jMy4kiywDE","ChIJ-Q_5sKkVkFQRdS8JqXmzaKc","ChIJW5Mq6gAVkFQRJMYLYydsJPE"]',
  'Sat Apr 17 2021 11:00:00 GMT-0700 (Pacific Daylight Time)',
  'Sun Jul 25 2021 15:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  1,
  'Fremont Troll, North 36th Street, Seattle, WA, USA',
  'Woodland Park Zoo, Phinney Avenue North, Seattle, WA, USA',
  'Fremont Peak Park, Palatine Avenue North, Seattle, WA, USA',
  2.4,
  '51 minutes',
  '["ChIJvYSnKAEVkFQR35lxzvEE250","ChIJydSuSkkUkFQRsqhB-cEtYnw","ChIJHYrunbIVkFQR1jMy4kiywDE","ChIJvYSnKAEVkFQR35lxzvEE250"]',
  '',
  'Sat Jun 26 2021 14:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  2,
  'LearningFuze Coding',
  'Irvine Spectrum Center, Spectrum Center Drive, Irvine, CA, USA',
  'Los Olivos Community Park, Alfonso Dr, Irvine, CA, USA',
  3.9,
  '1 hr 18 mins',
  '["ChIJKZcT2t_n3IARhA7AdKhMkuQ","ChIJR892-fvn3IARQnnqgTu-Phc","ChIJK1FF_m7n3IARfaMt7B-ljH0","ChIJKZcT2t_n3IARhA7AdKhMkuQ"]',
  '',
  'Sun Jun 27 2021 12:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  3,
  'Downtown Park, Northeast 4th Street, Bellevue, WA, USA',
  'Starbucks, Northeast 8th Street, Bellevue, WA, USA',
  'Chipotle Mexican Grill, Northeast 4th Street, Bellevue, WA, USA',
  1.4,
  '29 minutes',
  '["ChIJYVqRI4dskFQRVWnuu-Qjk0E","ChIJTdIWiYVskFQRGVoHhMIyhXg","ChIJW4VXzodskFQRseSBkOHh9Vg","ChIJYVqRI4dskFQRVWnuu-Qjk0E"]',
  '',
  'Sat Jul 03 2021 14:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  4,
  'Wynn Las Vegas, South Las Vegas Boulevard, Las Vegas, NV, USA',
  'Tacos El Gordo, South Las Vegas Boulevard, Las Vegas, NV, USA',
  'Caesars Palace, South Las Vegas Boulevard, Las Vegas, NV, USA',
  2.5,
  '51 minutes',
  '["ChIJlYYq3iLEyIAR7W-7y3M7wbE","ChIJuZ22zmzEyIARH1U2pl31Nes","ChIJleDKRDzEyIAR9z-vovLIyXc","ChIJlYYq3iLEyIAR7W-7y3M7wbE"]',
  '',
  'Sun Jul 04 2021 13:00:00 GMT-0700 (Pacific Daylight Time)'
), (
  5,
  'Hollywood Walk of Fame, Vine Street, Los Angeles, CA, USA',
  'TCL Chinese Theatre, Hollywood Boulevard, Hollywood, CA, USA',
  'Funko Hollywood, Hollywood Boulevard, Los Angeles, CA, USA',
  2.7,
  '54 minutes',
  '["ChIJXyC7WTu_woARPvVMCHBXd4U","ChIJw4DCAdrX3IAR-1_GYNuCOfc","ChIJv1-IVVW_woAReuX1pRWmIdk","ChIJXyC7WTu_woARPvVMCHBXd4U"]',
  '',
  'Sat Jul 07 2021 11:00:00 GMT-0700 (Pacific Daylight Time)'
);

insert into "sharedRoutes" ("routeId", "userId")
values (1, 1),
       (1, 2),
       (1, 3),
       (2, 3),
       (2, 4),
       (2, 5),
       (3, 1),
       (3, 2),
       (3, 3),
       (4, 3),
       (4, 4),
       (4, 5),
       (5, 9),
       (6, 9),
       (7, 9),
       (8, 9);

insert into "friends" ("userId", "friendUserId")
values (9, 1),
       (9, 2),
       (9, 3),
       (9, 4),
       (9, 5);

insert into "friendRequests" ("userId", "requesterUserId")
values (9, 6),
       (9, 7),
       (9, 8);
