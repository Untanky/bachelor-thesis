<?php

use Doctrine\ORM\EntityManager;

class PostDBDAO implements PostDAO
{

    private $entityManager;

    function __construct(EntityManager $entityManager) {
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
        // TODO: Implement update() method.
    }

    function delete(Post $post)
    {
        // TODO: Implement delete() method.
    }
}