const privacyPolicy = {
    title: "Tiba Rent A Car - Privacy Policy",
    introduction: "At Tiba Rent A Car, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website, mobile app, or services.",
  
    sections: [
      {
        id: "information-collected",
        title: "Information We Collect",
        subsections: [
          {
            title: " Personal Information",
            content: [
              "Full name",
              "Contact details (email, phone number, address)",
              "Emirates ID / Passport details",
              "Driving license information",
              "Payment details (processed securely via Stripe)"
            ]
          },
          {
            title: " Booking & Rental Information",
            content: [
              "Vehicle preferences",
              "Rental duration",
              "Pickup & drop-off locations",
              "Insurance selections"
            ]
          },
          {
            title: " Technical & Usage Data",
            content: [
              "IP address, browser type, device information",
              "Cookies & tracking technologies (for website analytics)"
            ]
          }
        ]
      },
      {
        id: "data-usage",
        title: "How We Use Your Information",
        content: [
          "To process bookings & payments",
          "To verify identity & prevent fraud",
          "To communicate booking confirmations, updates, and offers",
          "To improve our services & customer experience",
          "To comply with legal & regulatory requirements"
        ]
      },
      {
        id: "data-sharing",
        title: "Data Sharing & Disclosure",
        content: [
          "Payment processors (Stripe) – For secure transactions",
          "Insurance providers – If applicable to your rental",
          "Government authorities – When required by UAE law",
          "Service providers – For IT, customer support, and marketing (under strict confidentiality agreements)"
        ],
        note: "We do not sell your personal data."
      },
      {
        id: "data-security",
        title: "Data Security",
        content: [
          "Encryption (SSL/TLS) for online transactions",
          "Secure storage of personal data",
          "Regular security audits"
        ]
      },
      {
        id: "cookies",
        title: "Cookies & Tracking Technologies",
        content: [
          "Enhance website functionality",
          "Analyze user behavior (Google Analytics)",
          "Personalize ads (optional, with consent)"
        ],
        note: "You can manage cookie preferences in your browser settings."
      },
      {
        id: "your-rights",
        title: " Your Rights (UAE Data Protection Law)",
        content: [
          "Access your personal data",
          "Request corrections or deletions",
          "Opt out of marketing communications",
          "Withdraw consent (where applicable)"
        ]
      },
      {
        id: "policy-updates",
        title: "Policy Updates",
        content: [
          "We may update this Privacy Policy periodically. Changes will be posted on our website with the last updated date."
        ]
      }
    ],
  
    
  
    closing: "By using our services, you agree to the terms outlined in this policy.",
    lastUpdated: "01/01/2025"
  };
  
  export default privacyPolicy;


  export const deliveryTerms = {
    title: "Delivery & Pickup Terms",
    sections: [
      {
        id: "delivery-options",
        title: " Delivery Options",
        options: [
          {
            type: "Showroom Pickup",
            icon: "✅",
            fee: "Free",
            details: "Collect your vehicle at any of our 4 UAE locations during working hours (8:00 AM - 10:00 PM)."
          },
          {
            type: "Home/Office Delivery",
            icon: "✅",
            fee: "100 AED (Standard)",
            details: "Within city limits, 24-hour advance booking required."
          },
          {
            type: "Express Delivery",
            icon: "🚀",
            fee: "200 AED",
            details: "Within 4 hours, subject to availability."
          },
          {
            type: "Airport Delivery",
            icon: "✈️",
            fee: "150 AED",
            details: "Dubai/Abu Dhabi airports only."
          }
        ]
      },
      {
        id: "delivery-requirements",
        title: "Delivery Requirements",
        items: [
          "Valid ID & Documents (Emirates ID/Passport, Driving License) must be presented",
          "Payment Confirmation required before delivery",
          "Inspection Mandatory – Customer must verify vehicle condition at delivery"
        ]
      },
      {
        id: "delivery-areas",
        title: " Delivery Areas",
        items: [
          {
            text: "Covered Cities: Dubai, Abu Dhabi, Sharjah, Ajman",
            icon: "📍"
          },
          {
            text: "Exclusions: Remote areas (e.g., Liwa, Hatta) may incur extra fees",
            icon: "⚠️"
          }
        ]
      },
      {
        id: "return-policy",
        title: "Return Policy",
        items: [
          "Free Return: To original pickup location",
          "Alternate Location Return: 200 AED fee (subject to approval)",
          "After-Hours Drop-off: Not permitted for security reasons"
        ]
      },
      {
        id: "late-deliveries",
        title: "Late/Missed Deliveries",
        items: [
          "Late Pickup: >1 hour delay = 50 AED/hour penalty",
          "No-Show: Full rental charges apply if customer fails to receive vehicle"
        ]
      }      
    ]
  };
  
