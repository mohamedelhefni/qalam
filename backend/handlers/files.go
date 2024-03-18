package handlers

import (
	"net/http"
	"qalam/utils"

	"github.com/go-chi/render"
)

type FileRequest struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}

func ListFiles(w http.ResponseWriter, r *http.Request) {

	path := r.URL.Query().Get("path")
	if path != "" {
		file, err := utils.GetFile(path)
		if err != nil {
			render.Status(r, http.StatusInternalServerError)
			render.JSON(w, r, map[string]string{"error": err.Error()})
			return

		}
		render.JSON(w, r, map[string]interface{}{"file": file})
		return
	}

	dirFiles, err := utils.BuildDirTree(".")
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, map[string]string{"error": err.Error()})
		return
	}
	render.JSON(w, r, map[string]interface{}{"files": dirFiles})
}

func UpdateFile(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	if path == "" {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, map[string]string{"error": "path is required"})
		return
	}
	var fileReq FileRequest
	if err := render.Decode(r, &fileReq); err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, map[string]string{"error": err.Error()})
		return
	}
	err := utils.WriteFile(path, fileReq.Content)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, map[string]string{"error": err.Error()})
		return
	}
	render.JSON(w, r, map[string]string{"message": "file written"})
}

func DeleteFile(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	if path == "" {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, map[string]string{"error": "path is required"})
		return
	}
	err := utils.DeleteFile(path)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, map[string]string{"error": err.Error()})
		return
	}
	render.JSON(w, r, map[string]string{"message": "file deleted"})
}
