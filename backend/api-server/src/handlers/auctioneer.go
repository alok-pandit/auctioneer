package handlers

import (
	"auctioneer/src/db"
	gen "auctioneer/src/db/generated"
	"auctioneer/src/models"
	"auctioneer/src/utils"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/segmentio/ksuid"
)

func Register(c echo.Context) error {

	newUser := gen.Auctioneer{}

	if err := c.Bind(&newUser); err != nil {

		resp := models.Response{
			Success: false,
			Message: err.Error(),
		}

		return c.JSON(http.StatusInternalServerError, resp)

	}

	id := ksuid.New()

	hashedPassword, err := utils.HashPassword(newUser.Password)

	if err != nil {

		resp := models.Response{
			Success: false,
			Message: err.Error(),
		}

		return c.JSON(http.StatusInternalServerError, resp)

	}

	err = db.Sqlc.CreateAuctioneer(c.Request().Context(), gen.CreateAuctioneerParams{
		ID:       id.String(),
		FullName: newUser.FullName,
		Username: newUser.Username,
		Password: hashedPassword,
	})

	if err != nil {

		resp := models.Response{
			Success: false,
			Message: err.Error(),
		}

		return c.JSON(http.StatusInternalServerError, resp)

	}

	resp := models.Response{
		Success: true,
		Message: "",
	}

	return c.JSON(http.StatusOK, resp)

}
