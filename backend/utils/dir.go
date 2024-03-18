package utils

import (
	"os"
	"slices"
)

type File struct {
	Path         string `json:"path"`
	Name         string `json:"name"`
	Size         int64  `json:"size"`
	IsFolder     bool   `json:"isFolder"`
	Children     []File `json:"children"`
	Content      string `json:"content"`
	LastModified string `json:"lastModified"`
}

func BuildDirTree(dirPath string) ([]File, error) {
	var dirFiles []File
	dir, err := os.ReadDir(dirPath)
	if err != nil {
		return []File{}, err
	}
	for _, file := range dir {
		fileInfo, err := file.Info()
		if err != nil {
			return []File{}, err
		}

		newFile := File{
			Path:         dirPath + "/" + file.Name(),
			Name:         file.Name(),
			Size:         fileInfo.Size(),
			LastModified: fileInfo.ModTime().String(),
			IsFolder:     fileInfo.IsDir(),
		}

		if fileInfo.IsDir() {
			children, err := BuildDirTree(dirPath + "/" + file.Name())
			if err != nil {
				return []File{}, err
			}
			newFile.Children = children
		}
		dirFiles = append(dirFiles, newFile)
	}
	slices.Reverse(dirFiles)
	return dirFiles, nil
}

func GetFile(path string) (File, error) {
	file, err := os.ReadFile(path)
	if err != nil {
		return File{}, err
	}
	fileInfo, err := os.Stat(path)
	if err != nil {
		return File{}, err
	}
	return File{
		Path:         path,
		Name:         fileInfo.Name(),
		Size:         fileInfo.Size(),
		LastModified: fileInfo.ModTime().String(),
		Content:      string(file),
		IsFolder:     fileInfo.IsDir(),
	}, nil
}

func WriteFile(name string, content string) error {
	return os.WriteFile(name, []byte(content), 0644)
}
func DeleteFile(name string) error {
	return os.Remove(name)
}
