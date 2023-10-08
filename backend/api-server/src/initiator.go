package initiator

import (
	"auctioneer/src/db"
	"auctioneer/src/db/gen"
	"auctioneer/src/handlers"
	"auctioneer/src/utils"
	"context"
	"os"

	"github.com/golang-jwt/jwt/v4"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// Initiate inits the server and sets all the routes with appropriate handlers after initiating DB and optionally setting schemas
func Initiate() {

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
		AllowOrigins: []string{"*"},
	}))

	conn := db.Connect()

	defer conn.Close(context.Background())

	db.Sqlc = gen.New(conn)

	// e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
	// 	return func(c echo.Context) error {
	// 		c.Set("DB", db.Sqlc)
	// 		return next(c)
	// 	}
	// })

	e.Use(middleware.Logger())

	e.Use(middleware.Recover())

	api := e.Group("/api")

	api.POST("/register", handlers.Register)

	api.POST("/login", handlers.Login)

	api.GET("/renew-token", utils.RenewToken)

	secure := api.Group("/secure")

	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(utils.JwtCustomClaims)
		},
		TokenLookup: "cookie:access-token",
		SigningKey:  []byte(os.Getenv("HASH_SECRET")),
	}

	secure.Use(echojwt.WithConfig(config))

	secure.GET("/auctioneers", handlers.GetAllAuctioneers)

	e.Logger.Fatal(e.Start(":" + os.Getenv("API_SERVER_PORT")))

}
