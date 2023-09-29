package utils

import (
	"time"

	"github.com/go-playground/validator"
)

func BirthDateFormatter(d string) string {

	// "2006-01-02 15:04"
	// https://yourbasic.org/golang/format-parse-string-time-date-example/#:~:text=layout%20string)%20string-,Standard,-time%20and%20date
	format := "02/01/2006"

	myDate, _ := time.Parse(format, d)

	return myDate.Format(format)

}

func ValidateStruct(s interface{}) error {

	validate := validator.New()

	err := validate.Struct(s)

	if err != nil {

		return err

	}

	return nil

}
