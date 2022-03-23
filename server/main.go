package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/RishabhBajpai97/golang-react-todo/router"
)

func main() {
	r := router.Router()
	fmt.Println("Staring Server on 9000.....")
	log.Fatal(http.ListenAndServe(":9000",r))
}