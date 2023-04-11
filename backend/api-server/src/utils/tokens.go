package utils

import (
	"auctioneer/src/db"
	"auctioneer/src/db/gen"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type JwtCustomClaims struct {
	Username string     `json:"username"`
	ID       string     `json:"id"`
	Roles    []gen.Role `json:"roles"`
	jwt.RegisteredClaims
}

func GetTokens(user gen.GetAuctioneerRow, username string) (string, string, error, error) {

	claims := &JwtCustomClaims{
		username,
		user.ID,
		user.Roles,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 1)),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(os.Getenv("HASH_SECRET")))

	refreshClaims := &JwtCustomClaims{
		username,
		user.ID,
		user.Roles,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 365)),
		},
	}

	// Create token with claims
	token = jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)

	// Generate encoded token and send it as response.
	rt, errRefresh := token.SignedString([]byte(os.Getenv("HASH_SECRET")))

	return t, rt, err, errRefresh

}

func GetClaimsFromToken(t string) (jwt.MapClaims, error) {

	tkn, err := jwt.Parse(t, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("HASH_SECRET")), nil
	})

	if err != nil {
		return nil, err
	}

	clms := tkn.Claims.(jwt.MapClaims)

	return clms, nil

}

func GetClaimsFromContext(c echo.Context) *JwtCustomClaims {
	user := c.Get("user").(*jwt.Token)
	return user.Claims.(*JwtCustomClaims)
}

func GetAccessTokenFromRefreshToken(c echo.Context, rt string) (string, error) {

	clms, err := GetClaimsFromToken(rt)

	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}

	encryptedRTFromDB, err := db.Sqlc.GetRefreshTokenByID(c.Request().Context(), clms["id"].(string))

	if err != nil {
		return "", err
	}

	fmt.Println(3)

	tokenFromDB, decryptionErr := Decrypt(encryptedRTFromDB.String, os.Getenv("ENCRYPTION_KEY"))

	if decryptionErr != nil {
		fmt.Println(decryptionErr.Error())
		return "", decryptionErr
	}

	fmt.Println(tokenFromDB)
	fmt.Println(4)

	if rt == tokenFromDB {

		claimsFromRT, clmsErr := GetClaimsFromToken(rt)

		if clmsErr != nil {

			return "", clmsErr

		}
		claims := &JwtCustomClaims{
			claimsFromRT["username"].(string),
			claimsFromRT["id"].(string),
			claimsFromRT["roles"].([]gen.Role),
			jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
			},
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

		// Generate encoded token and send it as response.
		t, tokenGenerationErr := token.SignedString([]byte(os.Getenv("HASH_SECRET")))

		if tokenGenerationErr != nil {
			return "", tokenGenerationErr
		}

		return t, nil

	} else {
		return "", errors.New("Invalid Refresh Token!")
	}

}

// func HandleJWTErrors(c echo.Context, e error) error {
// 	fmt.Println(e.Error())
// 	fmt.Printf("%+v\n", c)
// 	if e.Error() == "missing value in cookies" {
// 		RenewToken(c)
// 	}
// 	return nil
// }

func RenewToken(c echo.Context) error {
	cookie, err := c.Cookie("refresh-token")

	if err != nil {

		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	token, tokenErr := GetAccessTokenFromRefreshToken(c, cookie.Value)

	if tokenErr != nil {
		return c.JSON(http.StatusInternalServerError, tokenErr.Error())
	}

	tokenCookie := new(http.Cookie)
	tokenCookie.Name = "access-token"
	tokenCookie.Value = token
	tokenCookie.HttpOnly = true
	tokenCookie.Expires = time.Now().Add(time.Hour * 24)
	c.SetCookie(tokenCookie)

	m := make(map[string]bool)
	m["Success"] = true
	return c.JSON(http.StatusOK, m)
}
