'use client';
import { Suspense, useEffect, useState } from "react"
import Image from 'next/image'
import Link from "next/link";
import { RoughNotation } from "react-rough-notation";
  
  
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

    
  return(
    <>
      
      <div className=" flex flex-col items-center m-16">
        {episode.name && 
        <h1 className="text-3xl">Characters from Episode:
        <br/>
        <RoughNotation type="highlight" show={true} color="#fff176" className="px-2 text-4xl"> 
          {episode.name} 
        </RoughNotation>
         - {episode.episode} </h1>
        }
        <div className="grid grid-cols-4 gap-10 p-5" >
          {characters.map((character,index) => {
            return (
            <div className="flex flex-col  items-center" key={index}>
              
              <a href={`/character?name=${character.name}`}>

                <Image
                  src={character!.image}
                  width={500}
                  height={500}
                  alt={characterZ}
                  className='object-cover rounded-full hover:scale-90'
                />
                </a>
              <div>{character.name}</div> 
            </div>
            );
          })}
        </div>
      </div>
    </>
  )
}