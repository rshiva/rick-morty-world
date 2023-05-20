'use client';
import Card from "@/app/components/Card";
import { useEffect, useState } from "react"

export default function Page({searchParams}: {searchParams: {name: string}}) {
  const [character, setCharacter] = useState({});
  useEffect(() => {
    async function fetchCharacter(){
    const response = await fetch(`api/character?name=${searchParams.name}`, {method: "GET",  cache: 'no-store' })
    const response_object = await response.json()
    if(response.ok){
      setCharacter(response_object.character_data);
    }
  }
  
    fetchCharacter();
  }, [])
  
  return(
    <>
      <div className="w-1/2">
        <Card result={character}/> 
      </div>
    </>
  )
}