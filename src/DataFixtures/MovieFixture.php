<?php

namespace App\DataFixtures;

use App\Entity\Movie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class MovieFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 20; $i++) {
        $movie = new Movie();
        $movie->setImdbId('tt0068646');
        $movie->setTitle('The GodFather');
        $movie->setImage('https://imdb-api.com/images/original/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7046_AL_.jpg');
        $movie->setKeywords('crime family,mafia,patriarch,organized crime,gambling syndicate');
        $movie->setRuntime('175');
        $movie->setReleaseDate('1972-03-24');
        $manager->persist($movie);
        }
        $manager->flush();
    }
}
