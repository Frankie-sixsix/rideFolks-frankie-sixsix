-- Revert rideFolks:initialisation from pg

BEGIN;

-- Supprime les tables 

DROP TABLE user_has_conversation;

DROP TABLE user_has_place;

DROP TABLE user_has_discipline;

DROP TABLE user_has_mode;

DROP TABLE user_participate_event;

DROP TABLE event_has_mode;

DROP TABLE event_has_discipline;

DROP TABLE "message";

DROP TABLE "network";

DROP TABLE "conversation";

DROP TABLE "place";

DROP TABLE "mode";

DROP TABLE "discipline";

DROP TABLE "event";

DROP TABLE "user";

















COMMIT;
