package api

import (
	"encoding/json"
	"encoding/xml"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

//UpdateWork mark selected work as done in selected file
func UpdateWork(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	projectID := params["projectid"]
	//workID := params["workid"]
	b, err := ioutil.ReadFile("./data/" + projectID) // just pass the file name
	check(err)
	var project Project
	xml.Unmarshal(b, &project)
	check(err)

	//todo update work by ID

	bytes, _ := xml.Marshal(project)
	// b, err := ioutil.ReadFile()
	ioutil.WriteFile("./data/"+projectID+"1", []byte(bytes), 0644)
	handleCrossO(&w)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

//GetWork return converted datafile
func GetWork(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	projectID := params["projectid"]
	b, err := ioutil.ReadFile("./data/" + projectID) // just pass the file name
	check(err)
	var project Project
	xml.Unmarshal(b, &project)
	check(err)
	handleCrossO(&w)
	json.NewEncoder(w).Encode(project)
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
