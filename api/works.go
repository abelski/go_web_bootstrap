package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	xj "github.com/basgys/goxml2json"
	"github.com/gorilla/mux"
)

func GetWork(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	projectID := params["projectid"]

	data, err := ioutil.ReadFile("./data/" + projectID)
	if err != nil {
		fmt.Println("Can't read file:", projectID)
		panic(err)
	}
	xml := strings.NewReader(string(data))

	result, err := xj.Convert(xml)
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(result)
}
