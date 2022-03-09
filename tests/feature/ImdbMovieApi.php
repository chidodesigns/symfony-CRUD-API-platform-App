<?php

namespace App\Tests\Feature;

use App\Tests\DatabasePrimer;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ImdbMovieApi extends KernelTestCase
{
    /**
     * 
     *@var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var Movie 
     */
    protected $movie;

    public function setUp():void
    {
        $kernel = self::bootKernel();

        DatabasePrimer::prime($kernel);

        $this->entityManager = $kernel->getContainer()->get('doctrine')->getManager();


    }

    

}
