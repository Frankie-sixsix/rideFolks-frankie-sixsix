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
 'https://64.media.tumblr.com/f97561c1c9f1ee197de6c71f902de89c/8872ee4a69c0b70b-ba/s640x960/b44b4365ab36070a4ca9c4de182cb57a6bf4c8c2.jpg' ),

('Snowden',
 'Edward', 
 'cia@oclock.nsa',
 '0.0002, 2.0000',
 'Pegasus',
 'https://img.huffingtonpost.com/asset/5e70ef3e2600000f34b66d0d.png?cache=xdmr7WhLOp&ops=1778_1000' ),

 ('Shakur',
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