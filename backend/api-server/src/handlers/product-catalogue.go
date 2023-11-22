package handlers

import (
	"auctioneer/src/db"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetAllProducts(c echo.Context) error {

	p, err := db.Sqlc.GetAllProducts(c.Request().Context())

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	m := make(map[string]interface{})
	m["Success"] = true
	m["Data"] = p
	return c.JSON(http.StatusOK, m)

}