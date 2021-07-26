-- Deploy rideFolks:initialisation to pg

BEGIN;

-- Creation des tables 


-- Table user 
-- NOTE: FAIRE UN INDEX SUR LA TABLE USER (EN CONSTRAINT)
-- NOTE: VOIR POUR LA COLONNE LOCATION POUR LA TRANSFORMER EN ADRESSE PAYS REGION POUR NE PAS ETRE TROP PRECIS
CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL, 
    first_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,  
    "location" POINT NOT NULL, -- Changer le TEXT EN POINT APRES LE TEST 
    "language" TEXT[],
    "description" TEXT,
    "password" TEXT NOT NULL,
    profile_picture TEXT,
    "availability" BOOLEAN NOT NULL DEFAULT FALSE 

);

-- Table event
-- NOTE: METTRE UN CHECK POUR VERIFIER QUE LA DATE DE DEBUT DE L'EVENEMENT N'EST PAS INFERIEUR A LA DATE DE LA CREATION DE L'EVENT
CREATE TABLE "event" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "location" POINT NOT NULL, 
    "date" DATE,
    start_time TIME,
    owner_id INT NOT NULL REFERENCES "user"(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--Table discipline 

CREATE TABLE discipline (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(30)
);

-- Table mode

CREATE TABLE mode (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT
);

-- Table place
-- NOTE: PEUT ETRE AJOUTÉ UNE COLONNE TITRE OU UN TRUC DANS LE GENRE POUR MIEU IDENTIFIER LE LIEUX , ET DU COUP MIEUX LE PRESNETER COTÉE FRONT?

CREATE TABLE place (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "address" POINT NOT NULL
);

-- Table conversation

CREATE TABLE "conversation" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "name" VARCHAR(30),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table network 

CREATE TABLE network (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    source_id INT REFERENCES "user"(id),
    friend_user_id INT REFERENCES "user"(id)
);

-- Table message 

CREATE TABLE "message" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    content TEXT,
    sender_id INT REFERENCES "user"(id),
    conversation_id INT REFERENCES "conversation"(id)
);


-- Table de liaison --

-- Table event_has_disicpline

CREATE TABLE event_has_discipline (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    discipline_id INT REFERENCES discipline(id),
    event_id INT REFERENCES "event"(id)
);


-- Table user_create_event ()

-- CREATE TABLE user_create_event (
--     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     event_id INT REFERENCES "event"(id),
--     "user_id" INT REFERENCES "user"(id)
-- );

-- Table event_has_mode

CREATE TABLE event_has_mode (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    event_id INT REFERENCES "event"(id),
    mode_id INT REFERENCES mode(id)
);

-- Table user_participate_event 

CREATE TABLE user_participate_event (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    event_id INT REFERENCES "event"(id),
    "user_id" INT REFERENCES "user"(id)
);

-- Table user_has_mode

CREATE TABLE user_has_mode (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    mode_id INT REFERENCES mode(id),
    "user_id" INT REFERENCES "user"(id)
);

-- Table user_has_discipline 

CREATE TABLE user_has_discipline (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    discipline_id INT REFERENCES discipline(id),
    "user_id" INT REFERENCES "user"(id)
);

-- Table user_has_place

CREATE TABLE user_has_place (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    place_id INT REFERENCES place(id) ON DELETE CASCADE,
    "user_id" INT REFERENCES "user"(id)
);



-- Table user_has_conversation 
--(NOTE: peut etre modifier en creeant une nouvelle colonne pour prendre l'id de la romm dans socket.io)

CREATE TABLE user_has_conversation (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    conversation_id INT REFERENCES "conversation"(id),
    "user_id" INT NOT NULL REFERENCES "user"("id")
);





COMMIT;
