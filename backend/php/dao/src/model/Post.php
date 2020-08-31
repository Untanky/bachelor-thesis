<?php

namespace model;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity @ORM\Table(name="post")
 */
class Post implements \JsonSerializable
{
    /** @ORM\ID @ORM\Column(type="integer") @ORM\GeneratedValue */
    private $id;

    /** @ORM\Column(type="string") */
    private $title;

    /** @ORM\Column(type="string") */
    private $description;

    public function __construct()
    {
    }

    public static function fromArray($data) {
        $post = new Post();
        if(property_exists($data, 'id')) {
            $post->id = $data->id;
        }
        if(property_exists($data, 'title')) {
            $post->title = $data->title;
        }
        if(property_exists($data, 'description')) {
            $post->description = $data->description;
        }
        return $post;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getUrl() {
        return "/api/blog/post/" . $this->getId();
    }

    public function jsonSerialize()
    {
        return
            [
                'id'   => $this->getId(),
                'title' => $this->getTitle(),
                'description' => $this->getDescription(),
                'url' => $this->getUrl()
            ];
    }
}