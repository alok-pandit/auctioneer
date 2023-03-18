CREATE TABLE
  IF NOT EXISTS AUCTIONEER (
    id varchar PRIMARY KEY NOT NULL,
    full_name varchar NOT NULL DEFAULT '',
    username varchar UNIQUE NOT NULL,
    password VARCHAR NOT NULL
  );