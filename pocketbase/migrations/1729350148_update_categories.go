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

		// update
		edit_category := &schema.SchemaField{}
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
					"wizzbangery",
					"package",
					"migration"
				]
			}
		}`), edit_category); err != nil {
			return err
		}
		collection.Schema.AddField(edit_category)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("upq8it6379mtkkp")
		if err != nil {
			return err
		}

		// update
		edit_category := &schema.SchemaField{}
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
					"migration-magician"
				]
			}
		}`), edit_category); err != nil {
			return err
		}
		collection.Schema.AddField(edit_category)

		return dao.SaveCollection(collection)
	})
}
