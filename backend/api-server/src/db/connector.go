package db

import (
	db "auctioneer/src/db/generated"
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4"
)

var Sqlc *db.Queries

func Initialize() {

	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_MIGRATION_URL"))

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	Sqlc = db.New(conn)

}
