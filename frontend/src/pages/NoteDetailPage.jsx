import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { api } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

export default function NoteDetailPage() {
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await api.get(`notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log('Error in fetchNote.', error);
        toast.error('Failed to fetch note.');
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`notes/${id}`);
      toast.success('Note deleted successfully.');
      navigate('/');
    } catch (error) {
      console.log('Error in handleDelete.', error);
      toast.error('Failed to delete note.');
    }
  }

  async function handleSave() {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Please fill in all the fields properly.');
      return;
    }

    setSaving(true);

    try {
      await api.put(`notes/${id}`, note);
      toast.success('Note updated successfully.');
      navigate('/');
    } catch (error) {
      console.log('Error saving the note.', error);
      toast.error('Failed to update the note.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex justify-center items-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-base-200 px-4 py-8'>
      <div className='max-w-2xl mx-auto space-y-6'>
        {/* header/actions */}
        <div className='flex justify-between items-center'>
          {/* back button */}
          <Link to={'/'} className='btn btn-ghost'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>

          {/* delete button */}
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
            <Trash2Icon className='siz-5' />
            Delete Note
          </button>
        </div>

        {/* card form */}
        <div className='card bg-base-100'>
          <div className='card-body'>
            {/* fieldset is the new replacement for the form-control in daisyui */}
            {/* form-control for title */}
            <fieldset className='fieldset mb-4'>
              <legend className='fieldset-legend'>Title</legend>
              <input
                type='text'
                placeholder='Note title'
                className='input w-full'
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </fieldset>

            {/* form-control for content */}
            <fieldset className='fieldset mb-4'>
              <legend className='fieldset-legend'>Content</legend>
              <textarea
                type='text'
                placeholder='Write your note here...'
                className='textarea h-32 w-full'
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </fieldset>

            {/* submit button */}
            <div className='card-actions justify-end'>
              <button
                type='submit'
                disabled={saving}
                onClick={handleSave}
                className='btn btn-primary'
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
