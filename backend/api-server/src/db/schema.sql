CREATE TABLE
  "public"."auctioneer" (
    "id" varchar NOT NULL,
    "full_name" varchar NOT NULL DEFAULT '':: character varying,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    "auction_preferences" json,
    "roles" role [] NOT NULL DEFAULT '{user}':: role [],
    PRIMARY KEY ("id")
  );


CREATE TYPE role AS ENUM ('host', 'user', 'admin', 'moderator');