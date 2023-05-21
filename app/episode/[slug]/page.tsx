'use client';
import { Suspense, useEffect, useState } from "react"
import Image from 'next/image'
import { RoughNotation } from "react-rough-notation";
import { Character } from "@/app/page";
  
// { id: 17, name: "The Ricks Must Be Crazy", air_date: "August 30, 2015", episode: "S02E06", characters: (19) […], url: "https://rickandmortyapi.com/api/episode/17", created: "2017-11-10T12:56:35.467Z" }

interface EpisodeType {
  name: string;
  episode: string;
} 
  
  export default function Page({ params }: { params: { slug: string }}) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [episode, setEpisode] = useState<EpisodeType | undefined>(undefined);

    useEffect(() => {
      async function fetchEpisode(){
        const response =  await fetch(`/api/episode?episode_numbers=${params.slug}`)
        if(response.ok){
          const jsonResponse = await  response.json()
          const arrayEpisode = jsonResponse.data
          setEpisode(arrayEpisode[0])
          const characters = arrayEpisode[0].characters.map((c: string) => c.split('/').pop());
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

    
  return(
    <>
      {episode?.name && characters.length > 0 && 
      <div className=" flex flex-col items-center m-16 xs:w-[80%]">
        {episode?.name && 
        <h1 className="text-3xl xs:text-sm">Characters from Episode:
        <br/>
        <div className="px-2 text-4xl xs:text-sm sm:bold">
          <RoughNotation type="highlight" show={true} color="#fff176"> 
            {episode.name} 
          </RoughNotation>
        </div>
         - {episode.episode} </h1>
        }
        <div className="lg:grid lg:grid-cols-4 lg:gap-10 lg:p-5 xs:flex xs:flex-col" >
          {characters.map((character,index) => {
            return (
            <div className="flex flex-col items-center" key={index} >
              
              <a href={`/character?name=${character.name}`}>

                <Image
                  src={character?.image}
                  width={500}
                  height={500}
                  alt={character.name}
                  className='object-cover rounded-full hover:scale-90 xs:rounded-full xs:w-[85%] my-4'
                />
                </a>
              <div>{character.name}</div> 
            </div>
            );
          })}
        </div>
      </div>
      }
    </>
  )
}