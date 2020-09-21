package main

import (
	"dao/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"testing"
)

var post1, post2, post3 *models.Post

func setupDatabase(t *testing.T) (*gorm.DB, postDAO) {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Error(err)
	}

	err = db.AutoMigrate(&models.Post{})
	if err != nil {
		dropTable(db)
		t.Error(err)
	}

	fillDatabase(db)

	dao := postDAO{db: db}
	return db, dao
}

func fillDatabase(db *gorm.DB) {
	post1 = &models.Post{
		Title:       "First post",
		Description: "Test description",
	}
	db.Create(post1)
	post2 = &models.Post{
		Title:       "Second post",
		Description: "Test description",
	}
	db.Create(post2)
	post3 = &models.Post{
		Title:       "Third post",
		Description: "Test description",
	}
	db.Create(post3)
}

func dropTable(db *gorm.DB) {
	db.Migrator().DropTable(&models.Post{})
}

func TestFindAll(t *testing.T) {
	db, dao := setupDatabase(t)

	fetchedPosts, err := dao.FindAll()
	if err != nil {
		dropTable(db)
		t.Error(err)
		return
	}

	postList := []*models.Post{post1, post2, post3}

	for index, actualPost := range fetchedPosts {
		expectedPost := postList[index]
		if *actualPost != *expectedPost {
			dropTable(db)
			t.Fail()
			return
		}
	}

	dropTable(db)
}

func TestCreate(t *testing.T) {
	db, dao := setupDatabase(t)

	post4 := &models.Post{
		Title:       "Fourth post",
		Description: "Test description",
	}

	err := dao.Create(post4)
	if err != nil {
		dropTable(db)
		t.Error(err)
		return
	}

	actualPost := &models.Post{}
	db.Find(actualPost, post4.ID)

	if *actualPost != *post4 {
		dropTable(db)
		t.Fail()
		return
	}

	dropTable(db)
}

func TestCreateWithSetId(t *testing.T) {
	db, dao := setupDatabase(t)

	post4 := &models.Post {
		ID: 5,
		Title:       "Fourth post",
		Description: "Test description",
	}

	err := dao.Create(post4)
	if err == nil || err != IllegalArgumentError{
		dropTable(db)
		t.Error(err)
		return
	}

	actualPost := &models.Post{}
	result := db.Find(actualPost, post4.ID)

	if result.RowsAffected != 0 {
		dropTable(db)
		t.Fail()
		return
	}

	dropTable(db)
}

func TestUpdate(t *testing.T) {
	db, dao := setupDatabase(t)

	updatedPost3 := &models.Post{
		ID:          3,
		Title:       "Dritter Post",
		Description: "Test Beschreibung",
	}

	err := dao.Update(updatedPost3)
	if err != nil {
		dropTable(db)
		t.Error(err)
		return
	}

	actualPost := &models.Post{}
	db.Find(actualPost, updatedPost3.ID)

	if *actualPost != *updatedPost3 {
		dropTable(db)
		t.Fail()
		return
	}

	dropTable(db)
}

func TestUpdateWithUnknownId(t *testing.T) {
	db, dao := setupDatabase(t)

	updatedPost4 := &models.Post{
		ID:          4,
		Title:       "Vierter Post",
		Description: "Test Beschreibung",
	}

	err := dao.Update(updatedPost4)
	if err == nil || err != IllegalArgumentError {
		dropTable(db)
		t.Error(err)
		return
	}

	actualPost := &models.Post{}
	result := db.Find(actualPost, updatedPost4.ID)

	if result.RowsAffected != 0 {
		dropTable(db)
		t.Fail()
	}

	dropTable(db)
}

func TestDelete(t *testing.T) {
	db, dao := setupDatabase(t)

	deleteId := int64(3)

	err := dao.Delete(deleteId)
	if err != nil {
		dropTable(db)
		t.Error(err)
		return
	}

	actualPost := &models.Post{}
	result := db.Find(actualPost, deleteId)

	if result.RowsAffected != 0 {
		dropTable(db)
		t.Fail()
		return
	}

	dropTable(db)
}

func TestDeleteWithUnknownId(t *testing.T) {
	db, dao := setupDatabase(t)

	deleteId := int64(5)

	err := dao.Delete(deleteId)
	if err == nil || err != IllegalArgumentError {
		dropTable(db)
		t.Error(err)
		return
	}

	dropTable(db)
}

