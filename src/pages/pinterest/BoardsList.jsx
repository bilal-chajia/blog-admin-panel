import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, ExternalLink, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { pinterestBoardsAPI } from '../../services/api';

const BoardsList = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      setLoading(true);
      const response = await pinterestBoardsAPI.getAll();
      setBoards(response.data.boards || []);
    } catch {
      console.error('Failed to load boards');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this board?')) return;
    try {
      await pinterestBoardsAPI.delete(id);
      loadBoards();
    } catch (error) {
      alert('Failed to delete board');
    }
  };

  const getRSSFeedURL = (slug) => {
    const baseURL = import.meta.env.VITE_SITE_URL || 'http://localhost:4321';
    return `${baseURL}/rss/pinterest/${slug}.xml`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Pinterest Boards</h2>
          <p className="text-muted-foreground mt-1">
            Manage Pinterest boards and RSS feeds for automated posting
          </p>
        </div>
        <Link to="/pinterest/boards/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Board
          </Button>
        </Link>
      </div>

      {/* RSS Feed Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rss className="w-5 h-5" />
            RSS Feeds for Pinterest
          </CardTitle>
          <CardDescription>
            Each board has its own RSS feed containing pins created in the last 24 hours.
            Use these feeds with IFTTT, Zapier, or Pinterest's native RSS feature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Master Feed</Badge>
              <code className="text-sm bg-muted px-2 py-1 rounded">
                {import.meta.env.VITE_SITE_URL || 'http://localhost:4321'}/rss/pinterest.xml
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              The master feed includes all pins from all active boards.
            </p>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : boards.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No Pinterest boards yet</p>
            <Link to="/pinterest/boards/new">
              <Button variant="outline">Create your first board</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <Card key={board.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{board.name}</CardTitle>
                    <CardDescription className="mt-1">
                      /{board.slug}
                    </CardDescription>
                  </div>
                  <Badge variant={board.is_active ? 'success' : 'secondary'}>
                    {board.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {board.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {board.description}
                  </p>
                )}

                {board.board_url && (
                  <a
                    href={board.board_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Pinterest
                  </a>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">RSS Feed:</span>
                    <a
                      href={getRSSFeedURL(board.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Rss className="w-3 h-3" />
                      View Feed
                    </a>
                  </div>
                  <input
                    type="text"
                    value={getRSSFeedURL(board.slug)}
                    readOnly
                    className="w-full text-xs bg-muted px-2 py-1 rounded font-mono"
                    onClick={(e) => e.target.select()}
                  />
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/pinterest/boards/${board.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(board.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardsList;

