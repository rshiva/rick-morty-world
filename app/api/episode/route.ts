import { NextResponse } from "next/server";

import type {Episodes, Episode} from "../../components/Card"

export async function GET(request : Request){
  const {searchParams} = new URL(request.url);
  const episode_numbers = searchParams.get("episode_numbers")
  console.log("episode_numbers",episode_numbers)
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${episode_numbers}`)
  if(response.ok){

    const episodes = await response.json();
    console.log("external response", episodes);
    const episodeArray = Array.isArray(episodes) ? episodes : [episodes];


    return NextResponse.json({ data: episodeArray }, { status: 200 });
  }else{
    return NextResponse.json({error: "something went wrong"},{status: 500})
  }


  
}