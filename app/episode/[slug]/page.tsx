'use client';
import { Suspense, useEffect, useState } from "react"
import Image from 'next/image'
import Link from "next/link";
// import Loading from "./loading";
  
  
  export default function Page({ params }: { params: { slug: string }}) {
    const [characters, setCharacters] = useState([{}]);
    const [episode, setEpisode] = useState({})

    useEffect(() => {
      async function fetchEpisode(){
        const response =  await fetch(`/api/episode?episode_numbers=${params.slug}`)
        if(response.ok){
          const jsonResponse = await  response.json()
          const arrayEpisode = jsonResponse.data
          setEpisode(arrayEpisode[0])
          const characters = arrayEpisode[0].characters.map(character => character.split('/').pop());
          const characterNumbers = characters.join(",").trim()
          const charactersListResponse =  await fetch(`https://rickandmortyapi.com/api/character/${characterNumbers}`)
          if(charactersListResponse.ok){
            const characterListJsonResponse = await  charactersListResponse.json()
            setCharacters(characterListJsonResponse)
          }
       }
     }
     fetchEpisode()
      
    }, [params.slug])

    function Loading() {
      // You can add any UI inside Loading, including a Skeleton.
      return (
        <div className=" flex flex-col items-center m-16">
          <h1 className="text-4xl "> </h1>
          <Link href="/" className="bg-yellow-200 border border-gray-500 p-2  rounded-md">Home</Link>
          <div className="grid grid-cols-4 gap-10 p-5" >
            {[...Array(10)].map((_, step) => (
            <div className="flex flex-col  items-center bg-gray-300 " key={step} ></div>
            ))}
          </div>
        </div>
      );
    }

    
  return(
    <Suspense fallback={<Loading/>}>
      <div className=" flex flex-col items-center m-16">
        {episode.name && 
        <h1 className="text-4xl ">Characters from {episode.name} {episode.episode} </h1>
        }
        <Link href="/" className="bg-yellow-200 border border-gray-500 p-2  rounded-md">Home</Link>
        <div className="grid grid-cols-4 gap-10 p-5" >
          {characters.map((character,index) => {
            return (
            <div className="flex flex-col  items-center" key={index}>
              <Link href={`/api/character/name=${character.name}`}>{character.name}</Link>
              <Image
                src={character!.image}
                width={500}
                height={500}
                alt="Character Image"
                className='object-cover rounded-full hover:scale-90'
              />
              <div>{character.name}</div> 
            </div>
            );
          })}
        </div>
      </div>
      </Suspense>
  )
}