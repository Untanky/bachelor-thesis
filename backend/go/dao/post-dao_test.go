package main

import (
	"dao/models"
	"fmt"
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
	}

	postList := []*models.Post{post1, post2, post3}

	for index, actualPost := range fetchedPosts {
		expectedPost := postList[index]
		if *actualPost != *expectedPost {
			dropTable(db)
			t.Fail()
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
	}

	actualPost := &models.Post{}
	db.Find(actualPost, post4.ID)

	if *actualPost != *post4 {
		dropTable(db)
		t.Fail()
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
	}

	actualPost := &models.Post{}
	result := db.Find(actualPost, post4.ID)

	if result.RowsAffected != 0 {
		dropTable(db)
		t.Fail()
	}

	dropTable(db)
}

func TestUpdate(t *testing.T) {
	fmt.Println("Test")
}

func TestUpdateWithUnknownId(t *testing.T) {
	fmt.Println("Test")
}

func TestDelete(t *testing.T) {
	fmt.Println("Test")
}

func TestDeleteWithUnknownId(t *testing.T) {
	fmt.Println("Test")
}

