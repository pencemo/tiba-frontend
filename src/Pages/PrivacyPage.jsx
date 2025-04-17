import privacyPolicy from "@/Utils/content";
import Footer from "@/components/Navbar/Footer";
import UserNav from "@/components/User/UserNav";

const PrivacyPage = () => {
  return (
    <div>
        <UserNav />
    <div className=" max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
      <h1 className="text-3xl font-bold ">{privacyPolicy.title}</h1>
      <p className="text text-muted-foreground max-w-4xl">{privacyPolicy.introduction}</p>
      
      {privacyPolicy.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-3">
          <h2 className="text-xl font-medium">{section.title}</h2>
          
          {section.subsections ? (
            section.subsections.map((subsection, i) => (
              <div className="my-2 ml-1" key={i}>
                <h3 className="font-medium ">{subsection.title}</h3>
                
                  {subsection.content.map((item, j) => (
                    <p className="pl-5 text-muted-foreground" key={j}>{item}</p>
                  ))}
              </div>
            ))
          ) : (
            <div>
              {section.content.map((item, i) => (
                <p className="pl-5 text-muted-foreground" key={i}>{item}</p>
              ))}
              </div>
          )}
          {section.note && <p className="mt-1 text-sm pl-5">Note : {section.note}</p>}
        </section>
      ))}
      
      
      <footer className="mt-10">
        <p>{privacyPolicy.closing}</p>
        <p>Last Updated: {privacyPolicy.lastUpdated}</p>
      </footer>
    </div>
    <Footer/>
    </div>
  );
};

export default PrivacyPage;