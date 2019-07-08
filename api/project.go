package project

import (
	"encoding/json"
	"net/http"
)

type Project struct {
	ID   string `json:"id,omitempty"`
	Name string `json:"firstname,omitempty"`
}

func GetProjectsEndpoint(w http.ResponseWriter, req *http.Request) {
	var result []Project
	var project Project
	project.ID = "ID"
	project.Name = "Name"

	result = append(result, project, project)

	json.NewEncoder(w).Encode(result)
}
