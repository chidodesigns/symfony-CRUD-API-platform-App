<?php

namespace App\Tests\Integration;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Movie;

class MovieApiTest extends ApiTestCase
{
    /** @test */
    public function testGetCollection(): void
    {
        $response = static::createClient()->request('GET', '/api/movies');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame(
            'content-type',
            'application/ld+json; charset=utf-8'
        );

        $this->assertJsonContains([
            "@context" => "/api/contexts/Movie",
            "@id" => "/api/movies",
            "@type" => "hydra:Collection",
            'hydra:totalItems' => 20,
        ]);

        $this->assertCount(20, $response->toArray()['hydra:member']);

        $this->assertMatchesResourceCollectionJsonSchema((Movie::class));
    }

    /** @test */
    public function testCreateMovie(): void
    {
        $response =  static::createClient()->request('POST', '/api/movies', [
            'json' => [
                'imdbId' => 'tt0068646',
                'title' => 'The GodFather',
                'image' => 'https://imdb-api.com/images/original/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7046_AL_.jpg',
                'keywords' => "crime family,mafia,patriarch,organized crime,gambling syndicate",
                'runtime' => '175',
                'releaseDate' => '1972-03-24',
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/api/contexts/Movie',
            '@type' => 'Movie',
            'imdbId' => 'tt0068646',
            'title' => 'The GodFather',
            'image' => 'https://imdb-api.com/images/original/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7046_AL_.jpg',
            'keywords' => "crime family,mafia,patriarch,organized crime,gambling syndicate",
            'runtime' => '175',
            'releaseDate' => '1972-03-24',
        ]);
        $this->assertMatchesResourceItemJsonSchema(Movie::class);
    }

    /** @test */
    public function testCreateInvalidMovie(): void
    {
        static::createClient()->request('POST', '/api/movies', [
            'json' => [
                'imdbId' => '',
                'title' => 'The GodFather',
                'image' => 'https://imdb-api.com/images/original/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7046_AL_.jpg',
                'keywords' => "crime family,mafia,patriarch,organized crime,gambling syndicate",
                'runtime' => '175',
                'releaseDate' => '1972-03-24',
            ]
        ]);

        $this->assertResponseStatusCodeSame(422);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/api/contexts/ConstraintViolationList',
            '@type' => 'ConstraintViolationList',
            'hydra:title' => 'An error occurred',
            'hydra:description' => 'imdb_id: This value should not be blank.',
        ]);
    }

    /** @test */
    public function testUpdateMovie(): void
    {
        $client = static::createClient();
        //@TODO change this back to 1 -> Test DB was starting from 21
        $client->request('PUT', '/api/movies/21', [
            'json' => [
                'title' => 'The GodFather'
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
              //@TODO change this back to 1 -> Test DB was starting from 21
            '@id' => '/api/movies/21',
            'title' => 'The GodFather'
        ]);
    }

    /** @test */
    public function testDeleteMovie(): void
    {
        $client = static::createClient();

        //  As the Test DB has random fixture names 
        //  Edited DB row title 'The GodFather' to make it easy to pick up 

        $movieToDelete = static::$container->get('doctrine')->getRepository(Movie::class)->findOneBy(['title' => 'The GodFather']);

        $client->request('DELETE', '/api/movies/'.$movieToDelete->getId());

        $this->assertResponseStatusCodeSame(204); 
        $this->assertNull(static::$container->get('doctrine')->getRepository(Movie::class)->findOneBy(['title' => 'The GodFather']));

    }
}
