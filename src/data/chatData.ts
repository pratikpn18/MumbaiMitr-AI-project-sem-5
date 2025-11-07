hexport interface ChatData {
  question: string;
  answer: string;
  keywords: string[];
}

export const chatDataset: ChatData[] = [
  {
    question: "What are the must-visit tourist attractions in Mumbai?",
    answer: "Mumbai is full of iconic landmarks! You shouldn't miss the Gateway of India, Marine Drive, Chhatrapati Shivaji Maharaj Terminus, Elephanta Caves, and Haji Ali Dargah. For a modern touch, visit Bandra-Worli Sea Link and Colaba Causeway for shopping and cafés.",
    keywords: ["must-visit", "tourist", "attractions", "mumbai"]
  },
  {
    question: "Can you suggest some hidden gems or offbeat places in Mumbai?",
    answer: "Sure! Try Bandra Fort for peaceful sea views, Sewri Fort to spot flamingos, or Banganga Tank for a slice of old Mumbai. You can also explore Khotachiwadi, a colorful heritage village, or relax at Aarey Milk Colony surrounded by greenery.",
    keywords: ["hidden", "gems", "offbeat", "places", "mumbai"]
  },
  {
    question: "What are the best places to visit in Mumbai at night?",
    answer: "Mumbai comes alive after dark! Drive along Marine Drive, visit Carter Road for late-night food stalls, or check out Colaba's pubs and Bandra rooftops. If you prefer quiet, head to Worli Sea Face for a breezy night walk.",
    keywords: ["best", "places", "visit", "night", "mumbai"]
  },
  {
    question: "How can I spend one day exploring South Mumbai?",
    answer: "Start your morning at Gateway of India, then take a ferry to Elephanta Caves. Lunch at Leopold Café or Café Mondegar, stroll through Kala Ghoda and Colaba Causeway, then catch the sunset at Marine Drive. End with dinner near Girgaum Chowpatty.",
    keywords: ["spend", "one", "day", "exploring", "south", "mumbai"]
  },
  {
    question: "Which areas are best for street photography in Mumbai?",
    answer: "Great spots include Dhobi Ghat, Crawford Market, Bandra's graffiti lanes, Colaba streets, and Marine Lines during golden hour. You'll capture Mumbai's contrasts — heritage, hustle, and heart.",
    keywords: ["areas", "best", "street", "photography", "mumbai"]
  },
  {
    question: "Where can I find the best street food in Mumbai?",
    answer: "For authentic flavors, head to Mohammad Ali Road, Girgaum Chowpatty, or Ghatkopar Khau Galli. Don't miss vada pav, pani puri, sev puri, and pav bhaji — Mumbai's true comfort food!",
    keywords: ["find", "best", "street", "food", "mumbai"]
  },
  {
    question: "Suggest famous restaurants or cafés near me.",
    answer: "Sure! If you're in South Mumbai, try Leopold Café, Theobroma, or Britannia & Co.. In Bandra, Candies, The Bagel Shop, or Suzette are great picks. I can also suggest options based on your budget or cuisine.",
    keywords: ["suggest", "famous", "restaurants", "cafés", "near", "me"]
  },
  {
    question: "What local dishes should every visitor try in Mumbai?",
    answer: "Definitely vada pav, misal pav, pav bhaji, and bombil fry. Try bhel puri by the beach and falooda for dessert. For seafood lovers — kolambi curry (prawn curry) is a must!",
    keywords: ["local", "dishes", "visitor", "try", "mumbai"]
  },
  {
    question: "Are there any ongoing cultural events or festivals in Mumbai today?",
    answer: "Let me check! Mumbai regularly hosts Kala Ghoda Arts Festival, Ganesh Chaturthi processions, Mumbai Film Festival, and Navratri Garba nights. I can show you what's happening today nearby.",
    keywords: ["ongoing", "cultural", "events", "festivals", "mumbai", "today"]
  },
  {
    question: "Can you tell me about the history of the Gateway of India or Marine Drive?",
    answer: "The Gateway of India, built in 1924, marked the visit of King George V and Queen Mary. It's a symbol of colonial Mumbai and independence. Marine Drive, built in the 1920s, is a 3.6 km promenade also called the 'Queen's Necklace' for its glowing lights at night.",
    keywords: ["tell", "history", "gateway", "india", "marine", "drive"]
  },
  {
    question: "How can I travel from Bandra to Colaba quickly?",
    answer: "You can take the Western Line local train to Churchgate, then a quick taxi or bus to Colaba. Off-peak hours are fastest, or you can use a cab via the Sea Link — scenic and smooth when traffic's light.",
    keywords: ["travel", "bandra", "colaba", "quickly"]
  },
  {
    question: "What's the best route to avoid traffic right now?",
    answer: "Let me check live data — generally, using Worli Sea Link or Eastern Freeway saves time. Avoid routes near Dadar or Sion during rush hours (8–11 AM, 6–9 PM).",
    keywords: ["best", "route", "avoid", "traffic", "right", "now"]
  },
  {
    question: "How do I use the Mumbai local train system or metro?",
    answer: "Trains run on Western, Central, and Harbour lines — buy a ticket at the counter or via the UTS mobile app. The Mumbai Metro is great for Andheri, Ghatkopar, and Versova. Always check direction boards and avoid peak rush if possible!",
    keywords: ["use", "mumbai", "local", "train", "system", "metro"]
  },
  {
    question: "Are there any nearby taxi or auto-rickshaw stands?",
    answer: "Yes! Most major junctions, stations, and markets have stands. Or you can hail one easily using apps like Ola, Uber, or BEST Chalo for buses.",
    keywords: ["nearby", "taxi", "auto-rickshaw", "stands"]
  },
  {
    question: "Can you guide me to the nearest bus stop or railway station?",
    answer: "Of course! Share your current location, and I'll show the nearest BEST bus stop, local train station, or metro line with directions and timing updates.",
    keywords: ["guide", "nearest", "bus", "stop", "railway", "station"]
  },
  {
    question: "I have 4 hours free — what can I do nearby?",
    answer: "Plenty! Visit a local museum, café, or beach nearby. For example, if you're in South Mumbai — check out Kala Ghoda, Gateway of India, and Colaba Causeway. I can personalize it to your mood — relaxing, fun, or foodie!",
    keywords: ["hours", "free", "do", "nearby"]
  },
  {
    question: "Suggest a peaceful place for evening relaxation.",
    answer: "Try Carter Road, Worli Sea Face, or Priyadarshini Park for calm sea views. If you prefer greenery, Hanging Gardens or Jogger's Park are perfect for an evening stroll.",
    keywords: ["suggest", "peaceful", "place", "evening", "relaxation"]
  },
  {
    question: "Recommend places that fit a low-budget itinerary.",
    answer: "Sure! Mumbai has lots of budget-friendly spots — Marine Drive, Juhu Beach, Sanjay Gandhi National Park, Crawford Market, and Bandra Fort. Street food and local trains keep costs low while giving you the real Mumbai feel.",
    keywords: ["recommend", "places", "fit", "low-budget", "itinerary"]
  },
  {
    question: "Can you plan a day trip itinerary based on my interests (food, art, sea views)?",
    answer: "Absolutely! For a mix of food, art, and views, start with Kala Ghoda for galleries, lunch at Leopold Café, explore Colaba Causeway, and end your day watching the sunset at Marine Drive. I can tweak it based on your schedule.",
    keywords: ["plan", "day", "trip", "itinerary", "interests", "food", "art", "sea", "views"]
  },
  {
    question: "Where can I go for a romantic evening or sunset view?",
    answer: "Try Worli Sea Face, Carter Road, or Marine Drive at sunset. For a cozy dinner, Dome at InterContinental or Bayview Café offer stunning sea views and great ambiance.",
    keywords: ["go", "romantic", "evening", "sunset", "view"]
  },
  {
    question: "What is the weather like in Mumbai?",
    answer: "Mumbai has a tropical climate with high humidity. Summers are hot (25-35°C), monsoons bring heavy rain from June to September, and winters are mild (15-25°C). The best time to visit is October to May for pleasant weather.",
    keywords: ["weather", "mumbai"]
  },
  {
    question: "How is the traffic in Mumbai?",
    answer: "Traffic in Mumbai can be quite chaotic due to the city's dense population! Peak hours are typically 8-11 AM and 6-9 PM on weekdays. It's best to use local trains, metro, or ride-sharing apps like Ola and Uber. Avoid driving during rush hours if possible.",
    keywords: ["traffic", "mumbai"]
  },
  {
    question: "What is the local time in Mumbai?",
    answer: "Mumbai follows Indian Standard Time (IST), which is UTC+5:30. The current local time in Mumbai is approximately 5:30 hours ahead of GMT. For the exact current time, you can check your device's clock or use a time zone converter.",
    keywords: ["local", "time", "mumbai", "current", "clock"]
  },
  {
    question: "What time is it in Mumbai?",
    answer: "Mumbai operates on Indian Standard Time (IST), UTC+5:30. The current time depends on your location, but you can easily convert it using online time zone tools or your phone's world clock feature.",
    keywords: ["time", "mumbai", "current", "now", "clock"]
  }
];

export const findBestMatch = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  let bestMatch = "";
  let maxScore = 0;

  for (const item of chatDataset) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (lowerMessage.includes(keyword)) {
        score += 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item.answer;
    }
  }

  if (maxScore > 0) {
    return bestMatch;
  } else {
    return "I'm sorry, I don't have specific information on that topic. As Mumbai Mitr, I'm here to help with questions about Mumbai's attractions, food, culture, and travel tips! What else can I assist you with?";
  }
};
