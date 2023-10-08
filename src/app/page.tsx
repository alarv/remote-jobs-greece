import Image from "next/image";
import JobListings from "@/app/components/job-listings";
import Footer from "./components/Footer";
import React from "react";
import Header from "@/app/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <JobListings />
      </main>
      <Footer />
    </>
  );
}
