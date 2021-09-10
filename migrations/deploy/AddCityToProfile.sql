-- Deploy rideFolks:AddCityToProfile to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "user"
ADD "city" TEXT;      -- Pensez à passer en NOT NULL avant deployement 

COMMIT;
