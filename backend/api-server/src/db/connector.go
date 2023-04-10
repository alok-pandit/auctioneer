package db

// import (
import "auctioneer/src/db/gen"

// 	"context"
// 	"fmt"
// 	"os"

// 	_ "github.com/jackc/pgx/v4"
// )

// var Conn *pgx.Conn

var Sqlc *gen.Queries

// func Initialize() {

// 	fmt.Println(os.Getenv("DB_URL"))

// 	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))

// 	if err != nil {
// 		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
// 		os.Exit(1)
// 	}

// 	Conn = conn
// }
