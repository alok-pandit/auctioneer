// Code gen by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2
// source: auctioneer.sql

package gen

import (
	"context"

	"github.com/lib/pq"
)

const createAuctioneer = `-- name: CreateAuctioneer :exec
INSERT INTO
  auctioneer (id, full_name, username, PASSWORD)
VALUES
  ($1, $2, $3, $4)
`

type CreateAuctioneerParams struct {
	ID       string `db:"id" json:"id"`
	FullName string `db:"full_name" json:"fullName"`
	Username string `db:"username" json:"username"`
	Password string `db:"password" json:"password"`
}

func (q *Queries) CreateAuctioneer(ctx context.Context, arg CreateAuctioneerParams) error {
	_, err := q.db.ExecContext(ctx, createAuctioneer,
		arg.ID,
		arg.FullName,
		arg.Username,
		arg.Password,
	)
	return err
}

const deleteAuctioneer = `-- name: DeleteAuctioneer :exec
DELETE FROM
  auctioneer
WHERE
  id = $1
`

func (q *Queries) DeleteAuctioneer(ctx context.Context, id string) error {
	_, err := q.db.ExecContext(ctx, deleteAuctioneer, id)
	return err
}

const getAuctioneer = `-- name: GetAuctioneer :one
SELECT
  password,
  id,
  roles
FROM
  auctioneer
WHERE
  username = $1
`

type GetAuctioneerRow struct {
	Password string `db:"password" json:"password"`
	ID       string `db:"id" json:"id"`
	Roles    []Role `db:"roles" json:"roles"`
}

func (q *Queries) GetAuctioneer(ctx context.Context, username string) (GetAuctioneerRow, error) {
	row := q.db.QueryRowContext(ctx, getAuctioneer, username)
	var i GetAuctioneerRow
	err := row.Scan(&i.Password, &i.ID, pq.Array(&i.Roles))
	return i, err
}

const listAuctioneers = `-- name: ListAuctioneers :many
SELECT
  id, full_name, username, password, auction_preferences, roles
FROM
  auctioneer
ORDER BY
  name
`

func (q *Queries) ListAuctioneers(ctx context.Context) ([]Auctioneer, error) {
	rows, err := q.db.QueryContext(ctx, listAuctioneers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Auctioneer{}
	for rows.Next() {
		var i Auctioneer
		if err := rows.Scan(
			&i.ID,
			&i.FullName,
			&i.Username,
			&i.Password,
			&i.AuctionPreferences,
			pq.Array(&i.Roles),
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
