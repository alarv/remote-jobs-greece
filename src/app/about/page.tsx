import Footer from "../components/Footer";
import React from "react";
import Header from "@/app/components/Header";
import JobListings from "../components/job-listings";

export default function About() {
  return (
    <>
      <Header />
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')
      </style>

      <main className="flex min-h-screen flex-col items-center _className_Poppins">
        <div className="p-20" >
        <h1 className="text-5xl">About us</h1>

</div>
<div className="m-20">
  <h3 > Welcome to Remote Jobs Greece, your dedicated platform for discovering and securing remote job opportunities within the beautiful backdrop of Greece. At Remote Jobs Greece, we believe in the transformative power of remote work, and we are passionate about connecting job seekers with exciting opportunities in this dynamic and evolving job landscape.
  </h3>
</div>
      </main>
      <Footer />
    </>
  );
}
