package main

import (
	"net/http"
	"qalam/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Use(middleware.Logger)
	r.Get("/files", handlers.ListFiles)
	r.Get("/files/{path}", handlers.ListFiles)
	r.Put("/files/{path}", handlers.UpdateFile)
	r.Delete("/files/{path}", handlers.DeleteFile)
	http.ListenAndServe(":3000", r)
}
