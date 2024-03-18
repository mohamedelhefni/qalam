package utils

import "os"

type File struct {
	Name         string `json:"name"`
	Size         int64  `json:"size"`
	IsDir        bool   `json:"isDir"`
	Children     []File `json:"children,omitempty"`
	Content      string `json:"content,omitempty"`
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
			Name:         file.Name(),
			Size:         fileInfo.Size(),
			LastModified: fileInfo.ModTime().String(),
			IsDir:        fileInfo.IsDir(),
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

	return dirFiles, nil
}

func GetFile(name string) (File, error) {
	file, err := os.ReadFile(name)
	if err != nil {
		return File{}, err
	}
	fileInfo, err := os.Stat(name)
	if err != nil {
		return File{}, err
	}
	return File{
		Name:         name,
		Size:         fileInfo.Size(),
		LastModified: fileInfo.ModTime().String(),
		Content:      string(file),
		IsDir:        fileInfo.IsDir(),
	}, nil
}

func WriteFile(name string, content string) error {
	return os.WriteFile(name, []byte(content), 0644)
}
