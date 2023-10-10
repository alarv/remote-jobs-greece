import JobListings from "@/app/components/job-listings";
import Footer from "./components/Footer";
import React from "react";
import Header from "@/app/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')

</style>     
 <main className="flex min-h-screen flex-col items-center justify-between p-24 _className_Poppins">
        <JobListings />
      </main>
      <Footer />
    </>
  );
}
