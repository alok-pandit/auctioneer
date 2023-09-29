-- auctioneer.sql
-- name: GetAuctioneer :one
SELECT
  username,
  id,
  password
FROM
  auctioneer
WHERE
  username = $1;


-- name: ListAuctioneers :many
SELECT
  *
FROM
  auctioneer
ORDER BY
  full_name;


-- name: CreateAuctioneer :exec
INSERT INTO
  auctioneer (id, full_name, username, PASSWORD)
VALUES
  ($1, $2, $3, $4);


-- name: DeleteAuctioneer :exec
DELETE FROM
  auctioneer
WHERE
  id = $1;


-- name: SaveRefreshTokenToDB :exec
UPDATE
  auctioneer
SET
  refresh_token = $1
WHERE
  id = $2;


-- name: GetRefreshTokenByID :one
SELECT
  refresh_token
FROM
  auctioneer
WHERE
  id = $1;


-- name: GetAllAuctioneers :many
SELECT
  *
FROM
  auctioneer;