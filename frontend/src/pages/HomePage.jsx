import { useEffect, useState } from 'react';
import { api } from '../lib/axios.js';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';
import NoteCard from '../components/NoteCard.jsx';

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error in fetchNotes()', error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <NavBar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && (
          <div className='text-center py-10'>
            <h3 className='text-lg text-primary mb-3'> Loading notes... 👣</h3>
            <p className='block text-base-content text-sm'>
              Hi, thank you for visiting our web. Our server takes 50 seconds to
              wake up.
            </p>
            <p className='block text-base-content text-sm'>
              So, I really appreciate your patience 😀😇
            </p>
          </div>
        )}

        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
