"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";

export default function Reviews({ animeId, refreshReviews }) {
  
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  // Fetch Review Data
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, "animes", animeId, "reviews");
        const reviewSnapshot = await getDocs(reviewsCollection);
        const reviewList = reviewSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [animeId, refreshReviews]);

  // Delete Review
  const handleDelete = async (reviewId) => {
    try {
      await deleteDoc(doc(db, "animes", animeId, "reviews", reviewId));
      refreshReviews();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8 pb-32">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border rounded-lg border-[#2e3746] mt-4">
            <div className="p-5">
              <div className="flex items-center gap-3">
                <img
                  src={review.profilePicture}
                  alt={review.username}
                  width="50"
                  className="rounded-full"
                />
                <p className="text-[#d5e0f9]">{review.username}</p>
                {user && user.uid === review.userId && (
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-[#b0c4de] ml-auto self-start"
                  >
                    ...
                  </button>
                )}
              </div>
              <p className="mt-5 pb-1 text-[#d5e0f9]">{review.reviewText}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-[#d5e0f9]">No reviews yet.</p>
      )}
    </div>
  );
}
