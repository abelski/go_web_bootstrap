package project

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

type Project struct {
	ID   string `json:"id,omitempty"`
	Name string `json:"Name,omitempty"`
}

func GetProjectsEndpoint(w http.ResponseWriter, req *http.Request) {

	var result []Project

	files, err := ioutil.ReadDir("./data")
	if err != nil {
		log.Fatal(err)
	}

	for _, f := range files {
		var project Project
		project.ID = f.Name()
		project.Name = strings.TrimSuffix(f.Name(), ".xml")
		result = append(result, project)

	}

	json.NewEncoder(w).Encode(result)
}
