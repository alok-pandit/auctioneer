package initiator

import (
	"auctioneer/src/db"
	"auctioneer/src/db/generated"
	"auctioneer/src/handlers"
	"database/sql"
	"fmt"
	"net/http"
	"os"

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

	fmt.Println("Before DB Init", os.Getenv("DB_URL"))
	// db.Initialize()

	d, err := sql.Open("postgres", "user=postgres password=readyset dbname=auctioneer sslmode=disable")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	db.Sqlc = generated.New(d)

	e.Use(middleware.Logger())

	e.Use(middleware.Recover())

	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Hello, World!")
	})

	e.POST("/register", handlers.Register)

	// e.PATCH("/register", handlers.UpdateRegistration)

	// e.POST("/login", handlers.Login)

	// secure := e.Group("/secure")

	// secure.Use(middleware.JWT([]byte(os.Getenv("HASH_SECRET"))))

	// secure.POST("/booking", handlers.AddBooking)

	// secure.GET("/my-booking", handlers.GetMyBookings)

	// secure.POST("/slotsfordate", handlers.GetSlotCountForDate)

	// secure.GET("/get-city-by-country", handlers.GetCityByCountry)

	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))

}
