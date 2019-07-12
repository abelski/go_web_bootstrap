package api

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
		var pr Project
		pr.ID = f.Name()
		pr.Name = strings.TrimSuffix(f.Name(), ".xml")
		result = append(result, pr)

	}

	json.NewEncoder(w).Encode(result)
}
