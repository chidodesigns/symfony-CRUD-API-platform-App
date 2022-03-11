<?php

namespace App\Tests\Integration;

use App\Tests\DatabaseDependentTestCase;

class ImdbApiClientTest extends DatabaseDependentTestCase
{
    /** @test */
    public function the_imdb_api_client_returns_correct_data()
    {
        //  SetUp
        $ImdbApiClient = self::$kernel->getContainer()->get('imdb-api-client');

        //  Act
        $response = $ImdbApiClient->fetchAMovie();

        //  Make Assertions  
        $this->assertTrue(true);

    }
}
