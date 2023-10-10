"use client";


import React from "react";



export function Footer (){
    const links = [
        { text: 'Home', url: '/' },
        { text: 'About', url: '/about' },
        { text: 'Contact', url: '/contact' },
        // Add more links as needed
      ];
    const d = new Date();
    let year = d.getFullYear();
    return(
<footer className="bg-gray-50">
<div className="container flex-center">
    <div className="flex">
    <ul>
          {links.map((link, index) => (
            <li key={index} className="hover:underline">
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
        </div>
        <div className="flex">
<p>Remote Jobs Greece @{year}</p> 
</div>
</div>

</footer>
    );
}

export default Footer