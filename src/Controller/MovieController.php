<?php

namespace App\Controller;

use App\Entity\Movie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;
//  Forms 
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
//  Handling Image upload
use Symfony\Component\String\Slugger\SluggerInterface;


class MovieController extends AbstractController
{
    /**
     * @Route("/movies", name="movie_list")
     * @Method({"GET"})
     */
    public function index(): Response
    {

        $movies = $this->getDoctrine()->getRepository(Movie::class)->findAll();

        return $this->render('movie/index.html.twig', array('movies' => $movies));
    }

    /**
     * @Route("/movies/new", name="new_movie")
     * @Method({"GET", "POST"})
     */
    public function newMovie(Request $request)
    {
        //  @TODO - Move this form to its own buildForm file 
        $movie = new Movie();
        //  Grab Movie Data From FrontEnd Form
        $form = $this->createFormBuilder($movie)
        ->add('title', TextType::class, array(
            'attr' => array('class' => 'form-control mb-2')
        ))
        ->add('imdb_id', TextType::class, array(
            'attr' => array('class' => 'form-control mb-2')
        ))
        //  @TODO Add/Save TO S3 Bucket so its easily retrievable
        ->add('image', FileType::class, array(
            'attr' => array('class' => 'form-control mb-2'),
            'allow_file_upload' => 'webPath',
            'data_class' => null
        ))
        ->add('keywords', TextType::class, array(
            'attr' => array('class' => 'form-control mb-2')
        ))
        ->add('runtime', TextType::class, array(
            'attr' => array('class' => 'form-control mb-2')
        ))
        ->add('release_date', TextType::class, array(
            'attr' => array('class' => 'form-control mb-2')
        ))
        ->add('save', SubmitType::class, array(
            'label' => 'Create Movie',
            'attr' => array('class' => 'btn btn-primary mt-3')
        ))
        ->getForm();

            //  Get The Form To Handle Requests
            $form->handleRequest($request);

            //  As This route is a GET and POST req -> This set of code is handling the POST Request
            if($form->isSubmitted() && $form->isValid()){
                $movie = $form->getData();

                $movieImageFileName = $form->get('image')->getData();

                if($movieImageFileName){

                    $originalFilename = pathinfo($movieImageFileName->getClientOriginalName(), PATHINFO_FILENAME);

                    $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);

                    $newFilename = $safeFilename.'-'.uniqid().'.'.$movieImageFileName->guessExtension();

                    try{
                        $movieImageFileName->move(
                            $this->getParameter('movies_images_directory'),
                            $newFilename
                        );
                    }catch (FileException $e){
                        //  @TODO better way to gracefully handle Error Execeptions 
                        echo 'Message: ' .$e->getMessage();
                    }

                    $movie->setImage($newFilename);

                }

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($movie);
                $entityManager->flush();
    
                return $this->redirectToRoute('movie_list');
            }

           return $this->render('movie/new.html.twig', array(
               'form' => $form->createView()
           )); 
    }

    /**
     * @Route("/movie/edit/{id}", name="edit_article")
     * Method({"GET", "POST"})
     */
    public function edit(Request $request, $id) {

        $movie = $this->getDoctrine()->getRepository(Movie::class)->find($id);

        $form = $this->createFormBuilder($movie)
        ->add('title', TextType::class, array(
            'attr' => array('class' => 'form-control')
        ))
        ->add('imdb_id', TextType::class, array(
            'attr' => array('class' => 'form-control')
        ))
        ->add('keywords', TextType::class, array(
            'attr' => array('class' => 'form-control')
        ))
        ->add('runtime', TextType::class, array(
            'attr' => array('class' => 'form-control')
        ))
        ->add('release_date', TextType::class, array(
            'attr' => array('class' => 'form-control')
        ))
        ->add('save', SubmitType::class, array(
            'label' => 'Create Movie',
            'attr' => array('class' => 'btn btn-primary mt-3')
        ))
        ->getForm();
        
        //  Get The Form To Handle Requests
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();

            return $this->redirectToRoute('movie_list');
        }

        return $this->render('movie/edit.html.twig', array(
            'form' => $form->createView()
        ));

    }

    /**
     * @Route("/movie/{id}", name="movie_show")
     * @Method({"GET"})
     */
    public function show($id)
    {
        $movie = $this->getDoctrine()->getRepository(Movie::class)->find($id);

        return $this->render('movie/show.html.twig', array(
            'movie' => $movie
        ));
    }

     /**
     * @Route("/movie/delete/{id}")
     * @Method({"DELETE"})
     */
    public function delete(Request $request, $id)
    {
        $movie = $this->getDoctrine()->getRepository(Movie::class)->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($movie);
        $entityManager->flush();

        $response = new Response();

        $response->send();
    }

}
