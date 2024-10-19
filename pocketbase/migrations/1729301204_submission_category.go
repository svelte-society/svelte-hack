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

		collection, err := dao.FindCollectionByNameOrId("upq8it6379mtkkp")
		if err != nil {
			return err
		}

		// add
		new_category := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "rqjm2yr5",
			"name": "category",
			"type": "select",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"wizzbangery-wizard",
					"rune-revolutionary",
					"migration-master"
				]
			}
		}`), new_category); err != nil {
			return err
		}
		collection.Schema.AddField(new_category)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("upq8it6379mtkkp")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("rqjm2yr5")

		return dao.SaveCollection(collection)
	})
}
