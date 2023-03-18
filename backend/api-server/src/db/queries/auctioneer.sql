-- name: GetAuctioneer :one
SELECT
  *
FROM
  auctioneer
WHERE
  id = $1
LIMIT
  1;


-- name: ListAuctioneers :many
SELECT
  *
FROM
  auctioneer
ORDER BY
  name;


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