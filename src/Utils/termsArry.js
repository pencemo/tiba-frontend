const termsAndConditions = [
    {
      section: "Rental Terms",
      items: [
        {
          title: "Rental Duration",
          description: [
            "Minimum rental period: 2 days.",
            "Rental options: Per Day, Per Week (7 days), Per Month (30 days)."
          ]
        },
        {
          title: "Deposit Requirement",
          description: [
            "A refundable security deposit of 1,500 AED is required for all rentals.",
            "The deposit will be refunded after vehicle inspection if no damages or violations are found."
          ]
        },
        {
          title: "Mileage (KM) Limit",
          description: [
            "Daily Limit: 250 KM/day (excess charged per KM).",
            "Weekly Limit: 1,750 KM/week (excess charged per KM).",
            "Monthly Limit: 3,000 KM/month (excess charged per KM)."
          ]
        },
        {
          title: "Additional KM Charges",
          description: [
            "Basic Cars: 0.50 AED per additional KM.",
            "Middle-Class Cars: 1.00 AED per additional KM.",
            "Luxury Cars: 2.00 AED per additional KM."
          ]
        }
      ]
    },
    {
      section: "Payment Terms",
      items: [
        {
          title: "Payment Methods",
          description: [
            "Payments are processed via Stripe (credit/debit card).",
            "Full payment is required at the time of booking."
          ]
        },
        {
          title: "Refund Policy",
          description: [
            "No refunds for cancellations made through the app.",
            "For cancellations, customers must visit the nearest Tiba Rent A Car showroom."
          ]
        },
        {
          title: "Late Return Policy",
          description: [
            "Late returns will incur additional charges (1.5x the daily rate).",
            "Failure to return the vehicle on time without prior notice may result in legal action."
          ]
        }
      ]
    },
    {
      section: "Booking & Cancellation Policy",
      items: [
        {
          title: "Booking Confirmation",
          description: [
            "Bookings are confirmed only after full payment.",
            "A booking confirmation email/SMS will be sent with rental details."
          ]
        },
        {
          title: "Cancellation Policy",
          description: [
            "Cancellation is not available via the app.",
            "To cancel, visit any Tiba Rent A Car showroom in the UAE.",
            "No refunds for no-shows or early returns."
          ]
        }
      ]
    },
    {
      section: "Required Documents",
      items: [
        {
          title: "Documents Needed",
          description: [
            "Original Emirates ID (for UAE residents).",
            "Original Passport & Visa Copy (for tourists).",
            "Valid UAE Driving License (or International Driving Permit for tourists).",
            "Credit Card in the renter’s name (for deposit hold)."
          ]
        }
      ]
    },
    {
      section: "Customer Responsibilities",
      items: [
        {
          title: "Vehicle Condition",
          description: [
            "The vehicle must be returned in the same condition as received.",
            "Customers are responsible for fuel costs (return policy: same fuel level as pickup)."
          ]
        },
        {
          title: "Prohibited Use",
          description: [
            "Smoking inside the vehicle is not allowed.",
            "Off-road driving, racing, or illegal activities are strictly prohibited.",
            "Penalty: Violations may result in additional fines or legal action."
          ]
        },
        {
          title: "Traffic Fines & Violations",
          description: [
            "All traffic fines during the rental period are the customer’s responsibility.",
            "Fines will be deducted from the security deposit if not settled."
          ]
        }
      ]
    },
    {
      section: "Insurance & Accidents",
      items: [
        {
          title: "Basic Insurance Coverage",
          description: [
            "Third-party liability insurance is included.",
            "Collision Damage Waiver (CDW) is optional (additional charges apply)."
          ]
        },
        {
          title: "Accident Procedure",
          description: [
            "In case of an accident:",
            "1. Inform Tiba Rent A Car immediately.",
            "2. File a police report (mandatory for insurance claims).",
            "3. Do not admit fault or settle privately."
          ]
        }
      ]
    },
    // {
    //   section: "Showroom Locations (UAE)",
    //   items: [
    //     {
    //       title: "Available Showrooms",
    //       description: [
    //         "1. Dubai: [Address]",
    //         "2. Abu Dhabi: [Address]",
    //         "3. Sharjah: [Address]",
    //         "4. Ajman: [Address]"
    //       ]
    //     }
    //   ]
    // },
    {
      section: "General Terms",
      items: [
        {
          title: "Company Policies",
          description: [
            "Tiba Rent A Car reserves the right to refuse service without explanation.",
            "The company is not liable for personal belongings left in the vehicle.",
            "Rates and terms are subject to change without prior notice."
          ]
        }
      ]
    }
  ];
  
  export default termsAndConditions;