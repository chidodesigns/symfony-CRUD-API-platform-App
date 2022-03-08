<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MovieRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=MovieRepository::class)
 */
class Movie
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $imdb_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image;

    /**
     * @ORM\Column(type="string", length=555)
     */
    private $keywords;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $runtime;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $release_date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImdbId(): ?string
    {
        return $this->imdb_id;
    }

    public function setImdbId(string $imdb_id): self
    {
        $this->imdb_id = $imdb_id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getKeywords(): ?string
    {
        return $this->keywords;
    }

    public function setKeywords(string $keywords): self
    {
        $this->keywords = $keywords;

        return $this;
    }

    public function getRuntime(): ?string
    {
        return $this->runtime;
    }

    public function setRuntime(string $runtime): self
    {
        $this->runtime = $runtime;

        return $this;
    }

    public function getReleaseDate(): ?string
    {
        return $this->release_date;
    }

    public function setReleaseDate(string $release_date): self
    {
        $this->release_date = $release_date;

        return $this;
    }
}
