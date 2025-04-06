export const SelectTravelsList=[
     {
        id:1,
        title:'just me',
        desc:'a sole travels in exploration',
        icon:'✈️',
        people:'1'
     },
     {
        id:2,
        title:'A couple',
        desc:'Two traverlers in tandom',
        icon:'💕',
        people:'2 people'
     },
     {
        id:3,
        title:'A family',
        desc:'A family of four',
        icon:'👨‍👩‍👧‍👦',
        people:'3 to 5 people'
     },
     {
        id:4,
        title:'A group of friends',
        desc:'A group of friends',
        icon:'🍟',
        people:'5+ people'
     }
] 

export const SelectBudgetList=[
    {
        id:1,
        title:'Low',
        desc:'Budget friendly options',
        icon:'💵',
        budget:'$'
    },
    {
        id:2,
        title:'Medium',
        desc:'Mid-range options',
        icon:'💰',
        budget:'$$'
    },
    {
        id:3,
        title:'High',
        desc:'Luxury options',
        icon:'💸',
        budget:'$$$'
    },
]
export const AI_PROMPT = "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";
