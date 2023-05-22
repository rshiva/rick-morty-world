'use client';
import Card from "@/app/components/Card";
import { useEffect, useState } from "react"
import { Character } from "../page";

export default function Page({searchParams}: {searchParams: {name: string}}) {
  const [character, setCharacter] = useState<Character>({} as Character);
  useEffect(() => {
    async function fetchCharacter(){
      console.log("--->",searchParams)
    const characterName = searchParams.name
    const response = await fetch(`api/character?name=${characterName}`, {method: "GET",  cache: 'no-store' })
    const response_object = await response.json()
    if(response.ok){
      setCharacter(response_object.character_data);
    }
  }
    fetchCharacter();
  }, [searchParams.name])
  
  return(
      <div className="w-1/2  xs:w-[80%] md:w-[55%] lg:w-[55%]">
        <Card result={character}/> 
      </div>
  )
}