package utils

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

func BirthDateFormatter(d string) string {

	// "2006-01-02 15:04"
	// https://yourbasic.org/golang/format-parse-string-time-date-example/#:~:text=layout%20string)%20string-,Standard,-time%20and%20date
	format := "02/01/2006"

	myDate, _ := time.Parse(format, d)

	return myDate.Format(format)

}

func HashPassword(pwd string) (string, error) {
	password := []byte(pwd)

	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

func ComparePasswordHash(upwd string, dbpwd string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(dbpwd), []byte(upwd)); err != nil {

		return false

	}
	return true
}
