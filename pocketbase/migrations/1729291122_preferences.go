package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// add
		new_preferedEmail := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "zumfmnjy",
			"name": "preferedEmail",
			"type": "email",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"exceptDomains": [],
				"onlyDomains": []
			}
		}`), new_preferedEmail); err != nil {
			return err
		}
		collection.Schema.AddField(new_preferedEmail)

		// add
		new_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "v6bi1ia9",
			"name": "name",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 64,
				"pattern": ""
			}
		}`), new_name); err != nil {
			return err
		}
		collection.Schema.AddField(new_name)

		// add
		new_pronouns := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "8hqy58xu",
			"name": "pronouns",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 32,
				"pattern": ""
			}
		}`), new_pronouns); err != nil {
			return err
		}
		collection.Schema.AddField(new_pronouns)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("zumfmnjy")

		// remove
		collection.Schema.RemoveField("v6bi1ia9")

		// remove
		collection.Schema.RemoveField("8hqy58xu")

		return dao.SaveCollection(collection)
	})
}
