package handlers

import (
	"auctioneer/src/db"
	"auctioneer/src/db/gen"
	"auctioneer/src/models"
	"auctioneer/src/utils"
	"net/http"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
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
		// Save refresh Token to DB
		encToken, err := utils.Encrypt(rt, os.Getenv("ENCRYPTION_KEY"))

		if err != nil {
			resp.Success = false
			resp.Message = err.Error()
		} else {

			db.Sqlc.SaveRefreshTokenToDB(c.Request().Context(), gen.SaveRefreshTokenToDBParams{
				ID:           user.ID,
				RefreshToken: pgtype.Text{String: encToken, Valid: true},
			})

			// Set tokens on Cookies
			tokenCookie := new(http.Cookie)
			tokenCookie.Name = "access-token"
			tokenCookie.Value = t
			tokenCookie.HttpOnly = true
			tokenCookie.Expires = time.Now().Add(time.Minute * 1)
			c.SetCookie(tokenCookie)

			refreshTokenCookie := new(http.Cookie)
			refreshTokenCookie.Name = "refresh-token"
			refreshTokenCookie.Value = rt
			refreshTokenCookie.HttpOnly = true
			refreshTokenCookie.Expires = time.Now().Add(time.Hour * 24 * 365)
			c.SetCookie(refreshTokenCookie)

			resp.Success = true
			resp.Message = "User Logged In"
			m := make(map[string]string)
			m["UserID"] = user.ID
			resp.Data = m
		}
	}

	return c.JSON(http.StatusOK, resp)

}

func GetAllAuctioneers(c echo.Context) error {

	a, err := db.Sqlc.GetAllAuctioneers(c.Request().Context())

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	m := make(map[string]interface{})
	m["Success"] = true
	m["Data"] = a
	return c.JSON(http.StatusOK, m)

}
