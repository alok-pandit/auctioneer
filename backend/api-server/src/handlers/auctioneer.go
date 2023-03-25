package handlers

import (
	"auctioneer/src/db"
	"auctioneer/src/db/gen"
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

func Login(c echo.Context) error {

	login := &models.LoginInput{}

	if err := c.Bind(&login); err != nil {

		resp := models.Response{
			Success: false,
			Message: err.Error(),
		}

		return c.JSON(http.StatusInternalServerError, resp)

	}

	err := utils.ValidateStruct(login)

	if err != nil {

		resp := models.Response{
			Success: false,
			Message: err.Error(),
		}

		return c.JSON(http.StatusInternalServerError, resp)

	}

	resp := models.Response{}

	user, err := db.Sqlc.GetAuctioneer(c.Request().Context(), login.Username)

	if err != nil {
		resp := models.Response{
			Success: false,
			Message: err.Error(),
		}

		return c.JSON(http.StatusInternalServerError, resp)
	}

	if len(user.Password) < 1 {
		resp := models.Response{
			Success: false,
			Message: err.Error(),
		}

		return c.JSON(http.StatusInternalServerError, resp)
	}

	ok := utils.ComparePasswordHash(login.Password, user.Password)

	if !ok {
		resp := models.Response{
			Success: false,
			Message: "Passwords Do Not Match!",
		}

		return c.JSON(http.StatusInternalServerError, resp)
	}

	t, rt, err, errRefresh := utils.GetTokens(user, login.Username)

	if errRefresh != nil {
		resp.Success = false
		resp.Message = "JWT Creation Failed"
	} else if err != nil {
		resp.Success = false
		resp.Message = "JWT Creation Failed"
	} else {
		resp.Success = true
		resp.Message = "User Logged In"
		m := make(map[string]string)
		m["JWT"] = t
		m["RefreshToken"] = rt
		m["UserID"] = user.ID
		resp.Data = m
	}

	return c.JSON(http.StatusOK, resp)

}

func RenewToken(c echo.Context) error {
	claims := utils.GetClaims(c)
	return c.JSON(http.StatusOK, claims)
}
