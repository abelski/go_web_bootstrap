package api

import (
	"encoding/json"
	"encoding/xml"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

//GetWork return converted datafile
func GetWork(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	projectID := params["projectid"]
	b, err := ioutil.ReadFile("./data/" + projectID) // just pass the file name
	check(err)
	var project Project
	xml.Unmarshal(b, &project)
	check(err)
	json.NewEncoder(w).Encode(project)
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
