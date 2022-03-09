<?php

namespace App\Http;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ImdbApiClient
{
    /**
     * @param HttpClientInterface
     */
    private HttpClientInterface $httpClient;

    /**
     * @param IMDB_API_KEY $imdbApiKey
     */
    private $imdbApiKey;

    public function __construct(HttpClientInterface $httpClient, $imdbApiKey)
    {
        $this->httpClient = $httpClient;
        $this->imdbApiKey = $imdbApiKey;
    }

    public function fetchAMovie() :JsonResponse
    {
        
    }

}
