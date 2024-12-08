"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import websitelogo from "@/public/websitelogo.svg";
import Link from "next/link";

export default function AnimePage({ params: paramsPromise }) {

  // Get ID from passing Params through URL
  const params = use(paramsPromise);
  const { id } = params; 

  // Set States
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data from API
  useEffect(() => {
    const fetchAnimeDetails = async () => {
      // Try Catch
      try {
        setLoading(true);
        // Fetch Data from ID Param from home page.
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const data = await response.json();
        if (data.data) {
          // Set Anime State
          setAnime(data.data);
        } else {
          // Error for Console
          throw new Error("No data found for this anime.");
        }
      } catch (error) {
        // Print Error for debugging
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    // Fetch
    fetchAnimeDetails();

  }, [id]);

  // Loading Message
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-white text-xl"> Loading anime details... </h1>
      </div>
    );
  }

  // Anime
  return (
    <div className="flex items-center justify-center h-screen flex-col" >
      <Link href="/"> <Image src={websitelogo} alt="Review Website" className="w-[17rem] mb-14" /> </Link> 
      <div className="flex border-[0.05rem] border-[#2e3746] rounded-lg w-[44rem] h-72 items-center" >
        <img src={anime.images.jpg.large_image_url} alt={anime.title} className="rounded-lg h-64 ml-3" />
        <div className="h-64 pl-5 mt-2 w-[32rem]" >
          <h1 className="text-[#9cbef0] font-medium text-base w-56 border-[0.05rem] p-2 rounded-lg border-[#9cbef0] text-center " > {anime.status} </h1>
          <div className="flex gap-2 mt-4" >
            <h1 className="text-[#d5e0f9]" > {anime.season + " " + anime.year} </h1>
            <h1 className="text-[#3c4558]" > ~ </h1>
            <h1 className="text-[#d5e0f9]" > {anime.episodes + " episodes"} </h1>
          </div>
          <h1 className="text-[#d5e0f9] text-xl mt-3" > {anime.title} </h1>
          <h1 className="text-[#d5e0f9] text-lg mt-3" > {"# " + anime.rank} </h1>
          <h1 className="text-[#8b99b7] mt-[-0.3rem]" > ranking </h1>
          <div className="flex gap-3 mt-4" >
              {anime.genres && anime.genres.map((genre) => (
                <h1 key={genre.mal_id} className="border border-[#1f2635] p-2 rounded-lg bg-[#1f2635] text-[#b0c4de]">{genre.name}</h1>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
