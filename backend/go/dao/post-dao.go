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
	fetchedPost := &models.Post{}
	result := dao.db.Find(fetchedPost, post.ID)
	if result.RowsAffected == 0 {
		return IllegalArgumentError
	}

	result = dao.db.Updates(post)
	return result.Error
}

func (dao *postDAO) Delete(id int64) error {
	return errors.New("not implemented")
}
