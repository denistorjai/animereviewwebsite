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

  // Handle Fetching Data
  useEffect(() => {
    const fetchData = async () => {
      if (query.length === 0) {
        setResults([]);
        return;
      }
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${query}&limit=5`
        );
        const data = await response.json();
        setResults(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Timeout just in case
    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);

  }, [query]);

  // Push towards dynamic route
  const handleSelect = (animeID) => {
    router.push(`/animes/${animeID}`);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="flex items-center flex-col mt-[8rem]">
        <Image src={websitelogo} alt="Review Website" className="w-[17rem]" />
        <input
          type="text"
          placeholder="Search Animes"
          className="mt-10 p-3 rounded-lg w-[22rem] bg-[#1f2635] text-[#d5e0f9] placeholder-[#51566F] focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-5 w-[21rem] h-[200px] overflow-y-hidden">
          {results.length > 0 ? (
            results.map((anime) => (
              <div
                key={anime.mal_id}
                className="pb-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelect(anime.mal_id)}
              >
                <h3 className="text-[#d5e0f9] text-m hover:underline">{anime.title}</h3>
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
