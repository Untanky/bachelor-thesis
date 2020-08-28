<?php

namespace dao;

use Doctrine\ORM\EntityManager;
use model\Post;
use dao\PostDAO;

class PostDBDAO implements PostDAO
{

    private $entityManager;

    function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    function findAll()
    {
        $postRepository = $this->entityManager->getRepository('Post');
        return $postRepository->findAll();
    }

    function create(Post $post)
    {
        if ($post->getId()) {
            throw new \exception\IllegalArgumentException();
        }

        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }

    function update(Post $post)
    {
        $managedPost = $this->entityManager->find('Post', $post->getId());

        if (!$managedPost) {
            throw new \exception\IllegalArgumentException();
        }

        $managedPost->setTitle($post->getTitle());
        $managedPost->setDescription($post->getDescription());

        $this->entityManager->refresh($managedPost);
        $this->entityManager->flush();
    }

    function delete(int $id)
    {
        $managedPost = $this->entityManager->find('Post', $id);

        if (!$managedPost) {
            throw new \exception\IllegalArgumentException();
        }

        $this->entityManager->remove($managedPost);
        $this->entityManager->flush();
    }
}