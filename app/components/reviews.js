"use client"

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

export default function Reviews({ animeId, refreshReviews }) {

  // States
  const [reviews, setReviews] = useState([]);

  // Fetch Review Data
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, "animes", animeId, "reviews");
        const reviewSnapshot = await getDocs(reviewsCollection);
        const reviewList = reviewSnapshot.docs.map(doc => doc.data());
        setReviews(reviewList);
      } catch (error) {
        console.log(error)
      }
    };

    fetchReviews();
    
  }, [animeId, refreshReviews]);

  return (
    <div className="mt-8 pb-32" >
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className=" border rounded-lg border-[#2e3746] mt-4" >
            <div className="p-5" > 
                <div className="flex items-center gap-3" > 
                    <img src={review.profilePicture} alt={review.username} width="50" className="rounded-full" />
                    <p className="text-[#d5e0f9]">{review.username}</p>
                </div>
                <p className="mt-5 pb-1 text-[#d5e0f9]" >{review.reviewText}</p>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}