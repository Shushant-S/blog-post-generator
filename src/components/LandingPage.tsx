import { Button } from "./ui/button";
import { Link } from "react-scroll";
import { useState } from "react";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const Landing: any = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');

  const handleGenerateBlog = async () => {
    if (!OPENAI_API_KEY) {
      setError("API key is missing");
      return;
    }

    try {
      setError(''); 
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`, 
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", 
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch from OpenAI");
      }

      const result = await response.json();
      setGeneratedText(result.choices[0].message.content || "Error generating text.");
    } catch (error: any) {
      setError(error.message || "An unknown error occurred.");
    }
  };

  return (
    <div>
      <section className="flex flex-col items-center justify-center text-center h-[80vh] bg-black text-white">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Generate Amazing Blog Posts with AI
        </h1>
        <p className="text-lg mb-8 text-gray-400">
          Use our AI tool to generate unique and engaging blog content effortlessly!
        </p>

        <Link
          to="generate-section"
          smooth={true}
          duration={800}
          className="cursor-pointer"
        >
          <Button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
            Get Started
          </Button>
        </Link>
      </section>

      <section
        id="generate-section"
        className="flex flex-col items-center justify-center h-screen bg-white text-black"
      >
        <h2 className="text-3xl font-semibold mb-6">Enter Your Blog Prompt</h2>

        <input
          type="text"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full max-w-lg px-4 py-2 mb-6 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <Button
          onClick={handleGenerateBlog}
          className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900"
        >
          Generate Blog
        </Button>

        {error && (
          <div className="mt-4 w-full max-w-lg p-4 bg-red-100 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {generatedText && (
          <div className="mt-6 w-full max-w-2xl p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Generated Blog:</h3>
            <p>{generatedText}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Landing;
