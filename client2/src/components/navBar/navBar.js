import { Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";

//https://react-icons.github.io/react-icons/icons?name=gi
import { AiOutlineHome } from "react-icons/ai";
import { GiBiplane } from "react-icons/gi";
import { GiHorizonRoad } from "react-icons/gi";

const NavBar = () => {
  const menuLinks = [
    { name: "Home", to: "/", icon: <AiOutlineHome /> },
    { name: "Schedule", to: "#/Schedule", icon: <GiBiplane /> },
    { name: "Location List", to: "#/LocationList", icon: <GiHorizonRoad /> },
  ];

  return (
    <Navbar fluid={true} rounded={true} className="">
      <Navbar.Toggle />
      <Navbar.Collapse>
        {menuLinks.map((link) => (
          <Navbar.Link key={link.id} href={link.to} active={true}>
            {link.name}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
