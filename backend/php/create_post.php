<?php

use model\Post;

require_once "bootstrap.php";

$newPosName = $argv[1];
$newPostDescription = $argv[2];

$post = new Post();
$post->setTitle($newPosName);
$post->setDescription($newPostDescription);

$entityManager->persist($post);
$entityManager->flush();

echo "Created Product with ID " . $post->getId() . "\n";
