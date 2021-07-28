-- Deploy rideFolks:mode_and_discipline to pg

BEGIN;

-- Ajout des modes 

INSERT INTO "discipline"(name) VALUES 
('Downhill'),
('Enduro'),
('CrossCountry');

INSERT INTO "mode"(label) VALUES
('I like it chill'),
('I like it fast');


COMMIT;
