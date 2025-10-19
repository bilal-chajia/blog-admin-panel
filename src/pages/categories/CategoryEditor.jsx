import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { useCategoriesStore } from '../../store/useStore';
import { generateSlug } from '../../utils/helpers';

const CategoryEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!slug;
  const { categories, setCategories } = useCategoriesStore();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    label: '',
    headline: '',
    metaTitle: '',
    metaDescription: '',
    shortDescription: '',
    tldr: '',
    imageUrl: '',
    imageAlt: '',
    collectionTitle: '',
    numEntriesPerPage: 12,
    isOnline: false,
    isFavorite: false,
    sortOrder: 0,
  });

  useEffect(() => {
    if (isEditMode) {
      const category = categories.find(cat => cat.slug === slug);
      if (category) {
        setFormData({
          slug: category.slug,
          label: category.label,
          headline: category.headline || '',
          metaTitle: category.metaTitle || '',
          metaDescription: category.metaDescription || '',
          shortDescription: category.shortDescription,
          tldr: category.tldr || '',
          imageUrl: category.imageUrl || '',
          imageAlt: category.imageAlt || '',
          collectionTitle: category.collectionTitle || '',
          numEntriesPerPage: category.numEntriesPerPage || 12,
          isOnline: category.isOnline,
          isFavorite: category.isFavorite || false,
          sortOrder: category.sortOrder || 0,
        });
      }
    }
  }, [slug, isEditMode, categories]);

  const handleSave = async () => {
    try {
      setSaving(true);

      if (isEditMode) {
        // Update existing category
        const updatedCategories = categories.map(cat =>
          cat.slug === slug ? { ...cat, ...formData } : cat
        );
        setCategories(updatedCategories);
      } else {
        // Add new category
        const newCategory = { ...formData };
        setCategories([...categories, newCategory]);
      }

      navigate('/categories');
    } catch {
      alert('Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'label' && !isEditMode) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/categories')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-3xl font-bold">{isEditMode ? 'Edit Category' : 'New Category'}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/categories')}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-2" />Save</Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Label *</Label>
            <Input value={formData.label} onChange={(e) => handleChange('label', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Slug *</Label>
            <Input value={formData.slug} onChange={(e) => handleChange('slug', e.target.value)} disabled={isEditMode} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Headline *</Label>
          <Input value={formData.headline} onChange={(e) => handleChange('headline', e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Short Description *</Label>
          <Textarea value={formData.shortDescription} onChange={(e) => handleChange('shortDescription', e.target.value)} rows={3} />
        </div>

        <div className="space-y-2">
          <Label>TL;DR *</Label>
          <Textarea value={formData.tldr} onChange={(e) => handleChange('tldr', e.target.value)} rows={2} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Meta Title *</Label>
            <Input value={formData.metaTitle} onChange={(e) => handleChange('metaTitle', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Collection Title *</Label>
            <Input value={formData.collectionTitle} onChange={(e) => handleChange('collectionTitle', e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Meta Description *</Label>
          <Textarea value={formData.metaDescription} onChange={(e) => handleChange('metaDescription', e.target.value)} rows={2} />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2">
            <Switch checked={formData.isOnline} onCheckedChange={(checked) => handleChange('isOnline', checked)} />
            <Label>Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={formData.isFavorite} onCheckedChange={(checked) => handleChange('isFavorite', checked)} />
            <Label>Favorite</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditor;
