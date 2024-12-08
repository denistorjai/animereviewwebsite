"use client";

import { useAuth } from '../context/AuthContext';
import { useState } from "react";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db, addDoc, collection, serverTimestamp } from '../firebaseConfig';

export default function ReviewPoster( { animeId, refreshReviewsList } ) {

  // States
  const { user, loading } = useAuth();
  const [reviewText, setReviewText] = useState("");

  // Prompt Login
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // Handle Post
  const handlePost = async () => {
    // Review is empty
    if (!reviewText.trim()) {
      alert("Review cannot be empty!");
      return;
    }

    try {
      await addDoc(collection(db, "animes", animeId, "reviews"), {
        username: user.displayName,
        profilePicture: user.photoURL,
        reviewText,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });
      setReviewText("")
      refreshReviewsList();
    } catch (error) {
      console.log(error);
    }
  };

  // Loading
  if (loading) {
    return <h1 className="text-white text-xl"> Authenticating... </h1>
  }

  // If User is Not Logged in, Return Login Button
  if (!user) {
    return (
      <div className='w-[44rem] flex items-center justify-center mt-10'>
        <button className="border border-[#1f2635] p-2 rounded-lg w-64 bg-[#1f2635] text-[#b0c4de]" onClick={handleLogin} > login to a post review </button>
      </div>
    )
  }

  // Else, Let user Post
  return (
    <div className="flex flex-col" >  
      <textarea
        className="w-[44rem] h-[8rem] mt-7 rounded-lg bg-[#1f2635] text-[#d5e0f9] placeholder-[#51566F] p-4 text-left focus:outline-none"
        placeholder="Write a good review!"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button className="mt-4 p-2 w-36 rounded-lg bg-[#1f2635] text-[#b0c4de] self-end border-[#2e3746]" onClick={handlePost} > Post review </button>
    </div>
  );
}
