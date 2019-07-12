package api

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

//ProjectModel dto for filelist
type ProjectModel struct {
	ID   string `json:"id,omitempty"`
	Name string `json:"Name,omitempty"`
}

//GetProjectsEndpoint - return existing projects
func GetProjectsEndpoint(w http.ResponseWriter, req *http.Request) {

	var result []ProjectModel

	files, err := ioutil.ReadDir("./data")
	if err != nil {
		log.Fatal(err)
	}

	for _, f := range files {
		var pr ProjectModel
		pr.ID = f.Name()
		pr.Name = strings.TrimSuffix(f.Name(), ".xml")
		result = append(result, pr)

	}

	json.NewEncoder(w).Encode(result)
}
