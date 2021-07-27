-- Revert rideFolks:mode_and_discipline from pg

BEGIN;

-- Suppression des modes et de l atable discipline

DROP TABLE "mode";

DROP TABLE "discipline";

COMMIT;
