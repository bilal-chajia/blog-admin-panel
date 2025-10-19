import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useCategoriesStore } from '../../store/useStore';
import ConfirmationModal from '@/components/ui/confirmation-modal.jsx';

const CategoriesList = () => {
  const { categories, loading, error, setCategories } = useCategoriesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    categoryToDelete: null
  });

  // Load mock categories on mount
  useEffect(() => {
    const mockCategories = [
      { slug: 'recipes', label: 'Recipes', shortDescription: 'Delicious recipes for every occasion', isOnline: true },
      { slug: 'cooking-tips', label: 'Cooking Tips', shortDescription: 'Essential cooking techniques and tips', isOnline: true },
      { slug: 'ingredients', label: 'Ingredients', shortDescription: 'Guide to ingredients and their uses', isOnline: false },
      { slug: 'kitchen-tools', label: 'Kitchen Tools', shortDescription: 'Reviews and guides for kitchen equipment', isOnline: true },
      { slug: 'meal-planning', label: 'Meal Planning', shortDescription: 'Weekly meal planning and prep guides', isOnline: true },
    ];
    setCategories(mockCategories);
  }, [setCategories]);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (category) => {
    setDeleteModal({
      isOpen: true,
      categoryToDelete: category
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.categoryToDelete) {
      const updatedCategories = categories.filter(category => category.slug !== deleteModal.categoryToDelete.slug);
      setCategories(updatedCategories);
      setDeleteModal({ isOpen: false, categoryToDelete: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, categoryToDelete: null });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-md">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Categories</h2>
        <Link to="/categories/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Category
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search categories..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No categories found</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.slug} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{category.label}</h3>
                <Badge variant={category.isOnline ? 'default' : 'secondary'}>
                  {category.isOnline ? 'Online' : 'Offline'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{category.shortDescription}</p>
              <div className="flex gap-2">
                <Link to={`/categories/${category.slug}`}>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => handleDeleteClick(category)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        description={`Are you sure you want to delete "${deleteModal.categoryToDelete?.label}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CategoriesList;
