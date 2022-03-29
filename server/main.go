package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/RishabhBajpai97/golang-react-todo/router"
)

func main() {
	port:=os.Getenv("PORT")
	fmt.Println(port)
	r := router.Router()
	fmt.Println("Staring Server on" +port)
	log.Fatal(http.ListenAndServe(":"+port,r))
}