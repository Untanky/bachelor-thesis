<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use dao\PostDAO;
use exception\IllegalArgumentException;
use model\Post;


class BlogController extends ResourceController
{
    protected $format = 'json;';

    /**
     * @var PostDAO
     */
    private $dao;

    public function __construct()
    {
        $this->dao = Services::dao();
    }

    function fetchAll()
    {
        return $this->respond($this->dao->findAll());
    }

    function createPost()
    {
        try {
            $body = $this->request->getBody();
            $decodedContent = json_decode($body);
            $post = Post::fromArray($decodedContent);
            $this->dao->create($post);
            return $this->respond(null, ResponseInterface::HTTP_NO_CONTENT);
        } catch (IllegalArgumentException $e) {
            return $this->respond(null, ResponseInterface::HTTP_BAD_REQUEST);
        }
    }

    function updatePost($id)
    {
        try {
            $content = $this->request->getBody();
            $decodedContent = json_decode($content);
            $post = Post::fromArray($decodedContent);

            if ($post->getId() != $id) {
                return $this->respond(null, ResponseInterface::HTTP_BAD_REQUEST);
            }

            $this->dao->update($post);
            return $this->respond(null, ResponseInterface::HTTP_NO_CONTENT);
        } catch (IllegalArgumentException $e) {
            return $this->respond(null, ResponseInterface::HTTP_NOT_FOUND);
        }
    }

    function deletePost($id)
    {
        try {
            $this->dao->delete($id);
            return $this->respond(null, ResponseInterface::HTTP_NO_CONTENT);
        } catch (IllegalArgumentException $e) {
            return $this->respond(null, ResponseInterface::HTTP_NOT_FOUND);
        }
    }
}