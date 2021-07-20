-- Revert rideFolks:privilege from pg

BEGIN;

-- XXX Add DDLs here.
-- REVOKE ALL PRIVILEGES ON DATABASE "d59vot48lcn6fa" TO frankie;
-- DROP USER 'frankie';

COMMIT;
