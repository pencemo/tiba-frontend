import React, { useRef } from "react";
import termsAndConditions from "@/Utils/termsArry";
import UserNav from "@/components/User/UserNav";
import Footer from "@/components/Navbar/Footer";
import { HiChevronRight } from "react-icons/hi2";

const TermsPage = () => {
  const sectionRefs = useRef([]);

  // Function to scroll to a section
  const scrollToSection = (index) => {
    sectionRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <UserNav />

      <div className="max-w-[85rem] relative flex gap-10 mx-auto px-4 sm:px-6 lg:px-8 pt-10 pt5 pb-24">
        <div className="border min-w-72 h-full min-h-svh p-3 rounded-md max-md:hidden  sticky top-0 bg-muted">
          <div className="flex flex-col ">
            {termsAndConditions.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className="py-2 px-4 bg-muted rounded-md hover:bg-muted-foreground/30 text-sm flex items-center justify-between"
              >
                {section.section}
                <HiChevronRight />
              </button>
            ))}
          </div>
        </div>
        {/* <div className="md:col-span-4"></div> */}
        <div className="w-full divide-y">
          <h1 className="text-2xl font-bold">
            Tiba Rent A Car - Terms & Conditions
          </h1>
          {termsAndConditions.map((section, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="mt-5 p-3 md:p-5 "
            >
              <h2 className="text-xl font-semibold">{section.section}</h2>
              {/* <div className="border-b-2 border-foreground/80 pb-1 inline-block"> */}
              
              {/* </div> */}
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="pl-2">
                  <h3 className=" font-medium mt-3 mb-2">{item.title}</h3>
                  {item.description.map((desc, descIndex) => (
                    <p
                      className="text- text-muted-foreground pl-2"
                      key={descIndex}
                    >
                      - {desc}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
