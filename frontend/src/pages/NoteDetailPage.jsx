import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import api from "../lib/axios";
import { Link } from "react-router";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/trial/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);


 const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/trial/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

     try {
      await api.put(`/trial/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/trial" className="btn btn-primary">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
         <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default NoteDetailPage;
