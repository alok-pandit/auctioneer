package utils

import (
	"github.com/go-playground/validator"
)

func ValidateStruct(s interface{}) error {

	validate := validator.New()

	err := validate.Struct(s)

	if err != nil {

		return err

	}

	return nil

}
