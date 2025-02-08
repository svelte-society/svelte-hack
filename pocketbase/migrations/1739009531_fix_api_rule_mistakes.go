package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upq8it6379mtkkp")
		if err != nil {
			return err
		}

		collection.ListRule = types.Pointer("(authorOne != \"\" && authorOne = @request.auth.email) ||\n(authorTwo != \"\" && authorTwo = @request.auth.email) ||\n(authorThree != \"\" && authorThree = @request.auth.email)")

		collection.ViewRule = types.Pointer("(authorOne != \"\" && authorOne = @request.auth.email) ||\n(authorTwo != \"\" && authorTwo = @request.auth.email) ||\n(authorThree != \"\" && authorThree = @request.auth.email)")

		collection.CreateRule = types.Pointer("@request.auth.id:isset = true &&\nsubmitter.id = @request.auth.id &&\nauthorOne = @request.auth.email")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upq8it6379mtkkp")
		if err != nil {
			return err
		}

		collection.ListRule = types.Pointer("authorOne = @request.auth.email ||\nauthorTwo = @request.auth.email ||\nauthorThree = @request.auth.email")

		collection.ViewRule = types.Pointer("authorOne = @request.auth.email ||\nauthorTwo = @request.auth.email ||\nauthorThree = @request.auth.email")

		collection.CreateRule = types.Pointer("submitter.id = @request.auth.id &&\nauthorOne = @request.auth.email")

		return dao.SaveCollection(collection)
	})
}
