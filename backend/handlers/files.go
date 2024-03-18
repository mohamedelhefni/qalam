package handlers

import (
	"net/http"
	"qalam/utils"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type FileRequest struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}

func ListFiles(w http.ResponseWriter, r *http.Request) {
	dirFiles, err := utils.BuildDirTree(".")
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, map[string]string{"error": err.Error()})
		return
	}
	render.JSON(w, r, map[string]interface{}{"files": dirFiles})
}

func GetFile(w http.ResponseWriter, r *http.Request) {
	name := chi.URLParam(r, "name")
	file, err := utils.GetFile(name)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, map[string]string{"error": err.Error()})
		return

	}
	render.JSON(w, r, map[string]interface{}{"file": file})
}

func UpdateFile(w http.ResponseWriter, r *http.Request) {
	name := chi.URLParam(r, "name")
	var fileReq FileRequest
	if err := render.Decode(r, &fileReq); err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, map[string]string{"error": err.Error()})
		return
	}
	err := utils.WriteFile(name, fileReq.Content)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, map[string]string{"error": err.Error()})
		return
	}
	render.JSON(w, r, map[string]string{"message": "file written"})
}
