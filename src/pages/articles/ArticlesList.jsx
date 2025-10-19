import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  Star,
  Edit,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx';
import { articlesAPI, categoriesAPI, authorsAPI } from '../../services/api';
import { formatDate, formatNumber, truncate } from '../../utils/helpers';
import { useArticlesStore, useCategoriesStore, useAuthorsStore } from '../../store/useStore';

const ArticlesList = () => {
  const { articles, filters, pagination, setArticles, setFilters, setPagination } = useArticlesStore();
  const { categories, setCategories } = useCategoriesStore();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCategories();
    loadAuthors();
    loadArticles();
  }, [filters, pagination.page, loadArticles, loadAuthors, loadCategories]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesAPI.getAll({
        page: pagination.page,
        limit: pagination.limit,
        type: filters.type !== 'all' ? filters.type : undefined,
        category: filters.category !== 'all' ? filters.category : undefined,
        author: filters.author !== 'all' ? filters.author : undefined,
        status: filters.status !== 'all' ? filters.status : undefined,
        search: filters.search || undefined,
      });

      if (response.data.success) {
        setArticles(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadAuthors = async () => {
    try {
      const response = await authorsAPI.getAll();
      if (response.data.success) {
        setAuthors(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load authors:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    const timeoutId = setTimeout(() => {
      setFilters({ search: value });
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      await articlesAPI.delete(slug);
      loadArticles();
    } catch (error) {
      console.error('Failed to delete article:', error);
      alert('Failed to delete article');
    }
  };

  const handleToggleOnline = async (slug) => {
    try {
      await articlesAPI.toggleOnline(slug);
      loadArticles();
    } catch (error) {
      console.error('Failed to toggle online status:', error);
    }
  };

  const handleToggleFavorite = async (slug) => {
    try {
      await articlesAPI.toggleFavorite(slug);
      loadArticles();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Articles</h2>
          <p className="text-muted-foreground mt-1">
            Manage your articles and recipes
          </p>
        </div>
        <Link to="/articles/new">
          <Button size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Select
          value={filters.type}
          onValueChange={(value) => setFilters({ type: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="article">Articles</SelectItem>
            <SelectItem value="recipe">Recipes</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value) => setFilters({ category: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ status: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Articles Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-muted-foreground">
                    No articles found. Create your first one!
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {article.image?.url && (
                          <img
                            src={article.image.url}
                            alt={article.label}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/articles/${article.slug}`}
                              className="font-medium hover:text-primary truncate"
                            >
                              {article.label}
                            </Link>
                            {article.isFavorite && (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {truncate(article.shortDescription, 60)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={article.type === 'recipe' ? 'default' : 'secondary'}>
                        {article.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {article.categoryLabel}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {article.authorName}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={article.isOnline ? 'success' : 'destructive'}>
                        {article.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatNumber(article.viewCount || 0)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(article.publishedAt || article.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/articles/${article.slug}`} className="flex items-center gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleOnline(article.slug)}>
                            {article.isOnline ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Set Offline
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Set Online
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFavorite(article.slug)}>
                            <Star className="w-4 h-4 mr-2" />
                            {article.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(article.slug)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} articles
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => setPagination({ page: pagination.page - 1 })}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => setPagination({ page: pagination.page + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;

