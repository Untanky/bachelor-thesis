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

    static function compareById($a, $b)
    {
        return $a->getId() - $b->getId();
    }

    function findAll()
    {
        $postRepository = $this->entityManager->getRepository('\model\Post');
        $list = $postRepository->findAll();
        usort($list, '\dao\PostDBDAO::compareById');
        return $list;
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
        $managedPost = $this->entityManager->find('\model\Post', $post->getId());

        if (!$managedPost) {
            throw new \exception\IllegalArgumentException();
        }

        $this->entityManager->merge($post);
        $this->entityManager->flush();
    }

    function delete(int $id)
    {
        $managedPost = $this->entityManager->find('\model\Post', $id);

        if (!$managedPost) {
            throw new \exception\IllegalArgumentException();
        }

        $this->entityManager->remove($managedPost);
        $this->entityManager->flush();
    }
}