BEGIN;

INSERT INTO "user"(
	last_name,
	first_name,
	mail,
	"location",
	"password",
	profile_picture)
	VALUES
('Bennett',
 'Rue', 
 'dmt@oclock.io',
 '66.66667, 2.33333',
 'oxy',
 'https://i0.wp.com/www.usmagazine.com/wp-content/uploads/2019/08/Euphoria-Makeup-Zendaya.jpg?quality=86&strip=all' ),

('Bennett',
 'Rue - 02', 
 'dmt@oclock.io',
 '66.66667, 2.33333',
 'oxy',
 'https://fr.web.img6.acsta.net/r_1280_720/newsv7/20/12/07/17/58/1442788.jpg' ),

 ('Bennett',
 'Rue - 03', 
 'dmt@oclock.io',
 '66.66667, 2.33333',
 'oxy',
 'https://www.refinery29.com/images/8606512.jpg?format=webp&width=1090&height=1308&quality=85&crop=5%3A6' ),

('Snowden',
 'Tupac', 
 'makaveli@oclock.io',
 '0.0002, 2.0000',
 'Thug life',
 'https://newsclic.info/wp-content/uploads/2020/09/e1b8c13458d4f3c09b0235450094541f.jpg' ),

 ('Tesla',
 'Nikola', 
 '369@oclock.io',
 '3.693, 6.9369',
 '369',
 'https://www.numerama.com/content/uploads/2019/01/nikola-tesla.jpg'),

 ('Abloh',
 'Virgil', 
 'offWhite@oclock.io',
 '3.693, 6.9369',
 'OFF WHITE BRU',
 'https://media.artsper.com/artwork/1031682_1_m.jpg');

COMMIT;