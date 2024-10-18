package main

import (
	"log"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "svelte-hack-pb/migrations"
)

func checkAuthors(app *pocketbase.PocketBase, record *models.Record) error {
	for _, field := range []string{"authorOne", "authorTwo", "authorThree"} {
		_, err := app.Dao().FindFirstRecordByFilter(
			"submissions", "id != {:id} && (authorOne = {:email} || authorTwo = {:email} || authorThree = {:email})",
			dbx.Params{"id": record.GetId(), "email": record.GetString(field)},
		)

		if err != nil && err.Error() == "sql: no rows in result set" {
			continue
		}

		if err != nil {
			return err
		}

		return apis.NewBadRequestError(
			"Failed to create record",
			validation.Errors{field: validation.NewError("validation_not_unique", "Author already has a submission")},
		)
	}

	return nil
}

func main() {
	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: true,
	})

	app.OnRecordBeforeCreateRequest("submissions").Add(func(e *core.RecordCreateEvent) error {
		if err := checkAuthors(app, e.Record); err != nil {
			return err
		}

		return nil
	})

	app.OnRecordBeforeUpdateRequest("submissions").Add(func(e *core.RecordUpdateEvent) error {
		if err := checkAuthors(app, e.Record); err != nil {
			return err
		}

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
