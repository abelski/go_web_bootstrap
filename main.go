package main

import (
	"log"
	"net/http"

	project "github.com/abelski/webpr/api"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/projects", project.GetProjectsEndpoint).Methods("GET")

	s := http.StripPrefix("", http.FileServer(http.Dir("./static/")))
	router.PathPrefix("").Handler(s)
	http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":8080", router))
}
