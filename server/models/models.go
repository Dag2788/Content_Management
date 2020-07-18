package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ToDoList struct {
 
	ID     		  primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FB_id   	  string             `json:"fb_id,omitempty"`
	Username 	  string              `json:"username,omitempty"`
	Password 	  string              `json:"password,omitempty"`
	Subscriptions []subscriptions	  `json:"subscriptions,omitempty"`
	Status		  bool 				  `json:"status,omitempty"`
	Task		  string			  `json:"task,omitempty"`
  }

type subscriptions struct {
	Name 			string `json:"name,omitempty"`
	IsSubscribed 	bool `json:"isSubscribed,omitempty"`
	NewPost			string `json:"newPost,omitempty"`
	OldPost			string `json:"oldPost,omitempty"`
	Time			string `json:"time,omitempty`
}
