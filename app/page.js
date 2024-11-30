"use client";
import Image from "next/image";
import websitelogo from "../public/websitelogo.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function Home() {

  // Variables
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  // Fetch Data when Searching
  useEffect(() => {

    const fetchData = async () => {
      
      // Don't search if query is 0
      if (query.length === 0) {
        setResults([]);
        return;
      }

      // Try Catch Data
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${query}&limit=5`
        );
        
        // Await Data Response
        const data = await response.json();
        setResults(data.data);

      } catch (error) {
        // display error
        console.error(error);
      }

    };

    // Timeout in case
    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);

  }, [query]);

  // Push towards dynamic route
  const handleSelect = (animeID) => {
    router.push(`/animes/${animeID}`);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="flex items-center flex-col">
        <Image src={websitelogo} alt="Review Website" />
        <input
          type="text"
          placeholder="Search Animes"
          className="mt-10 p-3 rounded w-96 bg-[#509EC7] text-white placeholder-slate-300 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-5 w-96">
          {results.length > 0 ? (
            results.map((anime) => (
              <div key={anime.mal_id} className="pb-3" style={{cursor: 'pointer'}} onClick={() => handleSelect(anime.mal_id)} >
                <h3 className="text-black text-m hover:underline">{anime.title}</h3>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
