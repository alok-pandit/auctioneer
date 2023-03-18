-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
-- Table Definition
CREATE TABLE "public"."auctioneer" (
    "id" varchar NOT NULL,
    "full_name" varchar,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    "auction_preferences" json,
    PRIMARY KEY ("id")
);

