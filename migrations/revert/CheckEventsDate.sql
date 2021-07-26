-- Revert rideFolks:CheckEventsDate from pg

BEGIN;

-- Suppression du CHECK check_event_date

ALTER TABLE "event"
DROP CONSTRAINT check_date_event;


COMMIT;
