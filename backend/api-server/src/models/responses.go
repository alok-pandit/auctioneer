package models

// * Response gives structure to the API response. Generic response template.
// ! Avoid using this.
type Response struct {
	Success bool
	Message string
	Data    map[string]string
}
