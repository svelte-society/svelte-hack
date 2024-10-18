package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `[
			{
				"id": "_pb_users_auth_",
				"created": "2024-10-12 01:48:41.468Z",
				"updated": "2024-10-14 02:46:25.905Z",
				"name": "users",
				"type": "auth",
				"system": false,
				"schema": [],
				"indexes": [],
				"listRule": "id = @request.auth.id",
				"viewRule": "id = @request.auth.id",
				"createRule": "",
				"updateRule": "id = @request.auth.id",
				"deleteRule": "id = @request.auth.id",
				"options": {
					"allowEmailAuth": false,
					"allowOAuth2Auth": true,
					"allowUsernameAuth": false,
					"exceptEmailDomains": null,
					"manageRule": null,
					"minPasswordLength": 8,
					"onlyEmailDomains": null,
					"onlyVerified": true,
					"requireEmail": true
				}
			},
			{
				"id": "upq8it6379mtkkp",
				"created": "2024-10-12 01:50:10.041Z",
				"updated": "2024-10-17 06:11:20.651Z",
				"name": "submissions",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "ar2kg8dx",
						"name": "submitter",
						"type": "relation",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "_pb_users_auth_",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "j1jtgagu",
						"name": "authorOne",
						"type": "email",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"exceptDomains": null,
							"onlyDomains": null
						}
					},
					{
						"system": false,
						"id": "zrcajfuc",
						"name": "authorTwo",
						"type": "email",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"exceptDomains": [],
							"onlyDomains": []
						}
					},
					{
						"system": false,
						"id": "jd6ivthm",
						"name": "authorThree",
						"type": "email",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"exceptDomains": null,
							"onlyDomains": null
						}
					},
					{
						"system": false,
						"id": "6dmwn8wn",
						"name": "title",
						"type": "text",
						"required": true,
						"presentable": true,
						"unique": false,
						"options": {
							"min": 1,
							"max": 64,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "wke9inrj",
						"name": "description",
						"type": "editor",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"convertUrls": false
						}
					},
					{
						"system": false,
						"id": "rmsx7cjk",
						"name": "github",
						"type": "url",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"exceptDomains": null,
							"onlyDomains": null
						}
					},
					{
						"system": false,
						"id": "pnbjwhwt",
						"name": "demo",
						"type": "url",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"exceptDomains": null,
							"onlyDomains": null
						}
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_HViDiww` + "`" + ` ON ` + "`" + `submissions` + "`" + ` (` + "`" + `submitter` + "`" + `)"
				],
				"listRule": "authorOne = @request.auth.email ||\nauthorTwo = @request.auth.email ||\nauthorThree = @request.auth.email",
				"viewRule": "authorOne = @request.auth.email ||\nauthorTwo = @request.auth.email ||\nauthorThree = @request.auth.email",
				"createRule": "submitter.id = @request.auth.id &&\nauthorOne = @request.auth.email",
				"updateRule": "@request.data.submitter:isset = false &&\n@request.data.authorOne:isset = false &&\nsubmitter.id = @request.auth.id",
				"deleteRule": null,
				"options": {}
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		return nil
	})
}
