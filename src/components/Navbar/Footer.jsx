import { useLogo } from "@/Utils/LogoEx";
import React, { useState } from "react";

import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoWhatsapp,
} from "react-icons/bi";
import { Link } from "react-router-dom";

const socilaMedia = [
  {
    icon: BiLogoFacebook,
    link: "",
  },
  {
    icon: BiLogoInstagram,
    link: "",
  },
  {
    icon: BiLogoWhatsapp,
    link: "",
  },
];

const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About Us",
    link: "/about",
  },
  {
    title: "Car List",
    link: "/cars",
  },
  {
    title: "Contact Us",
    link: "/contact",
  },
];

const links2 = [
  {
    title: "Customer Support",
    link: "/contact",
  },
  {
    title: "Delivery Details",
    link: "/delivery",
  },
  {
    title: "Privacy Policy",
    link: "/privacy",
  },
  {
    title: "Terms & Conditions",
    link: "/terms",
  },
];

const Footer = () => {
  const logo = useLogo()
  return (
    <section className="py-10 bg-zinc-100 dark:bg-zinc-900 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-[85rem]">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <img className="w-auto h-14" src={logo} alt="" />

            <p className="text-sm leading-relaxed text-muted-foreground mt-7">
            At Tiba Rent a Car, we don’t just rent cars—we deliver peace of mind, comfort, and unforgettable experiences
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              {socilaMedia.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-zinc-800"
                    >
                      <item.icon size={20} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-3">
              {links.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className="flex text-sm text-foreground transition-all duration-200 hover:text-muted-foreground focus:text-muted-foreground"
                    > 
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-3">
              {links2.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="flex text-sm text-foreground transition-all duration-200 hover:text-muted-foreground focus:text-muted-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Subscribe to newsletter
            </p>

            <div className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full px-4 py-3 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-zinc-600 caret-zinc-600"
                />
              </div>

              <button
                className="inline-flex items-center justify-center px-6 py-3 mt-3 font-semibold text-white transition-all duration-200 bg-zinc-600 rounded-md hover:bg-zinc-700 focus:bg-zinc-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="mt-16 mb-10 " />

        <p className="text-xs text-center text-muted-foreground">
          © Copyright {new Date().getFullYear()}, All Rights Reserved by
          <span className="hover:underline"> Tiba rent a car</span>
        </p>
      </div>
    </section>
  );
};
export default Footer;
