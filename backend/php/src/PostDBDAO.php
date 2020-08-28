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

    function create($post)
    {
        // TODO: Implement create() method.
    }

    function update($post)
    {
        // TODO: Implement update() method.
    }

    function delete($post)
    {
        // TODO: Implement delete() method.
    }
}