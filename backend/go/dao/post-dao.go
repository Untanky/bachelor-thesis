package main

import (
	"dao/models"
	"errors"
	"gorm.io/gorm"
)

var IllegalArgumentError = errors.New("illegal argument error")

type PostDAO interface {
	FindAll() ([]*models.Post, error)
	Create(post *models.Post) error
	Update(post *models.Post) error
	Delete(id int64) error
}

type postDAO struct {
	db *gorm.DB
}

func (dao *postDAO) FindAll() ([]*models.Post, error) {
	var posts []*models.Post
	result := dao.db.Find(&posts)

	if result.Error != nil {
		return nil, result.Error
	}
	return posts, nil
}

func (dao *postDAO) Create(post *models.Post) error {
	if post.ID != 0 {
		return IllegalArgumentError
	}

	result := dao.db.Create(post)
	return result.Error
}

func (dao *postDAO) Update(post *models.Post) error {
	result := dao.db.Updates(post)

	if result.RowsAffected == 0 && result.Error == nil{
		return IllegalArgumentError
	}

	return result.Error
}

func (dao *postDAO) Delete(id int64) error {
	postToBeDeleted := &models.Post{
		ID: id,
	}
	result := dao.db.Delete(postToBeDeleted)

	if result.RowsAffected == 0 && result.Error == nil{
		return IllegalArgumentError
	}

	return result.Error
}
