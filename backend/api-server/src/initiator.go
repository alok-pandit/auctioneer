package initiator

import (
	"auctioneer/src/db"
	"auctioneer/src/db/gen"
	"auctioneer/src/handlers"
	"auctioneer/src/utils"
	"database/sql"
	"fmt"
	"os"

	"github.com/golang-jwt/jwt/v4"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
)

// Initiate inits the server and sets all the routes with appropriate handlers after initiating DB and optionally setting schemas
func Initiate() {

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
		AllowOrigins: []string{"*"},
	}))

	d, err := sql.Open("postgres", "user=postgres password=readyset dbname=auctioneer sslmode=disable")

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	db.Sqlc = gen.New(d)

	e.Use(middleware.Logger())

	e.Use(middleware.Recover())

	e.POST("/register", handlers.Register)

	e.POST("/login", handlers.Login)

	secure := e.Group("/secure")

	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(utils.JwtCustomClaims)
		},
		TokenLookup: "cookie:access-token,cookie:refresh-token",
		SigningKey:  []byte(os.Getenv("HASH_SECRET")),
	}

	secure.Use(echojwt.WithConfig(config))

	secure.GET("/renew-token", handlers.RenewToken)

	e.Logger.Fatal(e.Start(":" + os.Getenv("API_SERVER_PORT")))

}
