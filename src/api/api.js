const API_URL = process.env.VITE_SUPABASE_URL;  // Example URL, change if needed
const API_KEY = process.env.VITE_SUPABASE_ANON_KEY; // Make sure to set this in .env

// Function to fetch AI task suggestions or anything else
export const fetchAIDashboardTasks = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",  // Example OpenAI model
        prompt: "Generate a list of AI-powered task manager tasks",
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    return data.choices[0].text.trim();  // Return generated tasks or data
  } catch (error) {
    console.error("Error fetching AI tasks:", error);
    return null;
  }
};
