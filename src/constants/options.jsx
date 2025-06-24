export const SelectTravelersList = [
    {
        id: 1,
        name: '1 Adult',
        desc: "Select this option if you are traveling alone.",
        icon: "✈️",
        people:"1"
    },


    {
        id: 2,
        name: '2 Adults',
        desc: "Select this option if you are traveling with one other adult.",
        icon: "👩‍❤️‍👨",
        people:"2"
    },


    {
        id: 3,
        name: 'Family',
        desc: "Select this option if you are traveling with two other adults.",
        icon: "👩‍👩‍👧‍👦",
        people:"3"
    },
    {
        id: 4,
        name: 'Group',
        desc: "Select this option if you are traveling with a group of friends or family.",
        icon: "👯‍♂️",
        people:"4"
        
    }
];
export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Low Budget',
    desc: "Stay comfortable without breaking the bank.",
    icon: "💲", // piggy bank
  },
  {
    id: 2,
    title: 'Medium Budget',
    desc: "Enjoy a balance of comfort and affordability.",
    icon: "👜", // wallet
  },
  {
    id: 3,
    title: 'High Budget',
    desc: "Experience luxury and top-notch amenities.",
    icon: "💎", // diamond
  }
];


// ...existing code...

export const AI_PROMPT = `
Given these user inputs:
{
"location": "{location}",
"days": {days},
"budget": "{budget}", // e.g., budget/mid-range/luxury
"travelers": {
"count": {travelers_count},
"adults": {adults_count},
"children": {children_count},
"interests": ["{interest1}", "{interest2}"] // e.g., adventure, culture
},
"start_date": "{start_date}" // Format: YYYY-MM-DD
}

Generate a JSON response in this structure:
{
"trip_summary": {
"destination": "string",
"duration": "string", // e.g., "5 days, June 15-20"
"budget_category": "string",
"total_travelers": integer,
"overview": "string" // 1-sentence theme
},
"daily_itinerary": [
{
"day": integer,
"date": "YYYY-MM-DD",
"theme": "string", // e.g., "Historical Exploration"
"activities": [
{
"name": "string",
"description": "string", // 1-2 sentences
"image_url": "string", // High-quality photo URL from reputable source
"duration": "string", // e.g., "2 hours"
"cost_estimate": "string", // Per person
"location": "string", // GPS coordinates
"booking_link": "string", // Optional reservation URL
"transport_time_to_next": "string" // e.g., "15 min by taxi"
}
],
"dining_recommendations": [
{
"meal_type": "string", // e.g., lunch
"name": "string",
"cuisine": "string",
"budget_indicator": "string" // e.g., "$-$$$"
}
]
}
],
"practical_info": {
"accommodation_options": [
{
"name": "string",
"type": "string", // e.g., boutique hotel
"price_range": "string",
"address": "string" // Full address
}
],
"transportation_tips": "string",
"packing_suggestions": ["item1", "item2"]
}
}

Key requirements:

Include 3-4 logically sequenced activities per day, matching interests and group composition.

All images must be from reputable sources (no placeholders).

Budget tier directly influences activity and dining selection.

Include unique local experiences and hidden gems beyond standard tourist spots.

Provide transportation time estimates between activities.

Use engaging, concise descriptions.

Output must be pure JSON only—no extra text, markdown, or explanations.
`;

