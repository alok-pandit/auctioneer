package db

import (
	"auctioneer/src/db/gen"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var Sqlc *gen.Queries

func Connect() *sql.DB {

	fmt.Println(os.Getenv("DB_URL"))
	conn, err := sql.Open("pgx", "postgres://postgres:postgres@localhost:5432/auctioneer?ssl_mode=disable")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	return conn
}
