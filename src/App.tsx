import { useEffect, useState } from "react";
import "./App.css";
import { fetchLatestStories } from "./api/algoliaHnAPI";

function App() {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    async function loadStories() {
      const latestStories = await fetchLatestStories();
      setStories(latestStories);
    }

    loadStories();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Hacker News</h1>

      <ol className="space-y-4 list-decimal list-inside">
        {stories.map((story) => (
          <li key={story.objectID}>
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="font-bold hover:text-orange-500"
            >
              {story.title}
            </a>

            <p className="text-sm text-gray-400">
              {story.points} points by {story.author} 1 hour ago |{" "}
              {story.num_comments} comments | ☆ save
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
