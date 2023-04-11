package models

import (
	_ "github.com/go-playground/validator"
)

// * Response gives structure to the API response. Generic response template.
// ! Avoid using this.
type Response struct {
	Success bool
	Message string
	Data    map[string]string
}

type LoginInput struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required,gte=4"`
}
