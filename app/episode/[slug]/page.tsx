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
      
      <div className=" flex flex-col items-center m-16 xs:w-[80%]">
        {episode.name && 
        <h1 className="text-3xl xs:text-sm">Characters from Episode:
        <br/>
        <RoughNotation type="highlight" show={true} color="#fff176" className="px-2 text-4xl xs:text-sm sm:bold"> 
          {episode.name} 
        </RoughNotation>
         - {episode.episode} </h1>
        }
        <div className="lg:grid lg:grid-cols-4 lg:gap-10 lg:p-5 xs:flex xs:flex-col" >
          {characters.map((character,index) => {
            return (
            <div className="flex flex-col items-center" key={index} >
              
              <a href={`/character?name=${character.name}`}>

                <Image
                  src={character!.image}
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
    </>
  )
}