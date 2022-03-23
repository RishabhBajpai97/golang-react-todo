package router

import (
	"github.com/RishabhBajpai97/golang-react-todo/middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/task", middleware.GetAllTasks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", middleware.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/task/{id}", middleware.TaskCompleted).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/task/undo/{id}", middleware.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/task/{id}", middleware.DeleteTasks).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/task", middleware.DeleteAllTasks).Methods("DELETE", "OPTIONS")
	return router
}
