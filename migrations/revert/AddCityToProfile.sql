-- Revert rideFolks:AddCityToProfile from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "user"   
DROP "city";

COMMIT;
