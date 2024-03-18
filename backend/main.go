package main

import (
	"net/http"
	"qalam/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/files", handlers.ListFiles)
	r.Get("/files/{name}", handlers.GetFile)
	r.Put("/files/{name}", handlers.UpdateFile)
	http.ListenAndServe(":3000", r)
}
