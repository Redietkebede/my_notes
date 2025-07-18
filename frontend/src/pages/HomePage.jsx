import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { RateLimitedUI } from "../components/RateLimitedUI";
import { NoteCard } from "../components/NoteCard";
import { NotesNoteFound } from "../components/NotesNoteFound";

import api from "../lib/axios";
import toast from "react-hot-toast";

export const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/trial");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNoteFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
