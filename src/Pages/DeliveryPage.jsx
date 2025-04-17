import React from 'react';
import { deliveryTerms } from '@/Utils/content';
import UserNav from '@/components/User/UserNav';
import Footer from '@/components/Navbar/Footer';

const DeliveryTerms = () => {
  return (
    <div >
        <UserNav/>
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <h1 className="text-2xl font-bold mb-8 text-center">{deliveryTerms.title}</h1>
      
      {deliveryTerms.sections.map((section) => (
        <section key={section.id} id={section.id} className="delivery-section">
          <h2 className="text-xl font-medium my-4">{section.title}</h2>
          
          {section.options ? (
            <div className="border border-gray-300 p-4 rounded-md space-y-3">
              {section.options.map((option, index) => (
                <div key={index} className=" flex gap-3">
                        <span className="option-icon">{option.icon}</span>
                    <div className=''>
                        <h3 className='font-medium ' >{option.type} <span className="fee">{option.fee}</span></h3>
                  <p className='text-sm text-muted-foreground'>{option.details}</p>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="terms-list">
              {section.items.map((item, index) => (
                <p className='text-sm text-muted-foreground' key={index}>
                  {/* {item.icon && <span className="item-icon">{item.icon}</span>} */}
                  {item.text || item}
                </p>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
    <Footer/>
    </div>
  );
};

export default DeliveryTerms;