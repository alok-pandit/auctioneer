package utils

import (
	"auctioneer/src/db"
	"auctioneer/src/db/gen"
	"errors"
	"fmt"
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
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
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

func GetClaims(c echo.Context) *JwtCustomClaims {
	user := c.Get("user").(*jwt.Token)
	return user.Claims.(*JwtCustomClaims)
}

func GetAccessTokenFromRefreshToken(c echo.Context, rt string) (string, error) {

	fmt.Println(rt)
	encryptedRTFromDB, err := db.Sqlc.GetRefreshTokenByID(c.Request().Context(), GetClaims(c).ID)

	if err != nil {
		return "", err
	}

	fmt.Println(encryptedRTFromDB)

	tokenFromDB, decryptionErr := Decrypt(encryptedRTFromDB.String, os.Getenv("ENCRYPTION_KEY"))

	if decryptionErr != nil {
		return "", decryptionErr
	}

	fmt.Println(tokenFromDB)
	if rt == tokenFromDB {

		claimsFromRT := GetClaims(c)

		claims := &JwtCustomClaims{
			claimsFromRT.Username,
			claimsFromRT.ID,
			claimsFromRT.Roles,
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
