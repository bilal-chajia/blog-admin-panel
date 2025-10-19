import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { categoriesAPI } from '../../services/api';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesAPI.getAll();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch {
      console.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure?')) return;
    try {
      await categoriesAPI.delete(slug);
      loadCategories();
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Categories</h2>
        <Link to="/categories/new">
          <Button><Plus className="w-4 h-4 mr-2" />New Category</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : categories.map((cat) => (
          <div key={cat.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg">{cat.label}</h3>
              <Badge variant={cat.isOnline ? 'success' : 'secondary'}>
                {cat.isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{cat.shortDescription}</p>
            <div className="flex gap-2">
              <Link to={`/categories/${cat.slug}`}>
                <Button size="sm" variant="outline"><Edit className="w-4 h-4 mr-1" />Edit</Button>
              </Link>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(cat.slug)}>
                <Trash2 className="w-4 h-4 mr-1" />Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
