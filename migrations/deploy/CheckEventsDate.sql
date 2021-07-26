-- Deploy rideFolks:CheckEventsDate to pg

BEGIN;

-- Ajout d'un CHECK pour que la date de l'ebut de l'event ne soit pas inferieur à la date de création de l'event.
-- Verifier si le check se met sur la date => now() ou date => Date extract from "created_at" ?

ALTER TABLE "event"
ADD CONSTRAINT check_date_event
CHECK ("date" > NOW());

COMMIT;
