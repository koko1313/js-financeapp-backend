CREATE TABLE "user" (
    "id" uuid NOT NULL PRIMARY KEY,
    "email" text,
    "name" text,
    "password" text
);

CREATE TABLE "income" (
    "id" uuid NOT NULL PRIMARY KEY,
    "date" text,
    "amount" numeric,
    "comment" text,
    "user_id" uuid,
    CONSTRAINT income_user
        FOREIGN KEY(user_id) 
        REFERENCES "user"(id)
);

CREATE TABLE "expense" (
    "id" uuid NOT NULL PRIMARY KEY,
    "date" text,
    "amount" numeric,
    "comment" text,
    "user_id" uuid,
    CONSTRAINT income_user
        FOREIGN KEY(user_id) 
        REFERENCES "user"(id)
);