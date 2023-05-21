'use client';
import Card from "@/app/components/Card";
import { useEffect, useState } from "react"
import { Character } from "../page";

export default function Page({searchParams}: {searchParams: {name: string}}) {
  const [character, setCharacter] = useState<Character>({} as Character);
  useEffect(() => {
    async function fetchCharacter(){
    const response = await fetch(`api/character?name=${searchParams.name}`, {method: "GET",  cache: 'no-store' })
    const response_object = await response.json()
    if(response.ok){
      // const response_character: Character =  
      setCharacter(response_object.character_data);
    }
  }
    fetchCharacter();
  }, [])
  
  return(
      <div className="w-1/2  xs:w-[80%] md:w-[55%] lg:w-[55%]">
        <Card result={character}/> 
      </div>
  )
}