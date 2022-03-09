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
        $movie->setImdbId(base64_encode(random_bytes(5)));
        $movie->setTitle(base64_encode(random_bytes(10)));
        $movie->setImage('https://images.pexels.com/photos/3825280/pexels-photo-3825280.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500');
        $movie->setKeywords('love,war,chage');
        $movie->setRuntime('240');
        $movie->setReleaseDate('2010-07-16');
        $manager->persist($movie);
        }
        $manager->flush();
    }
}
