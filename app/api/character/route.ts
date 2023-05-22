import { Character } from "@/app/page";
import { NextResponse } from "next/server";

export async function GET(request: Request){
  const {searchParams} = new URL(request.url);
  const query_name = searchParams.get('name')
  console.log("api route -->", query_name)
  const response = await fetch(`https://rickandmortyapi.com/api/character?name=${query_name}`,{ cache: 'no-store' })

  if(response.ok){
    const json_response = await response.json()
    const firstCharacter = json_response.results[0];
    const { name, status, species, origin, location, image, episode } = firstCharacter;
    const character_data: Character = {
      name,
      status,
      species,
      origin: origin.name,
      location: location.name,
      image,
      episodes: episode
    };
    return NextResponse.json({character_data}, {
      status: 200,
    });
  }else{
    return NextResponse.json({error: "Character Not found"},{status: 404})
  }
}