import { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon, Mail, Globe, Shield, Database, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useSettingsStore } from '../../store/useStore';

const Settings = () => {
  const { settings, loading, setSettings } = useSettingsStore();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    // General Settings
    siteName: 'Freecipies',
    siteDescription: 'Delicious recipes and cooking tips',
    siteUrl: 'https://freecipies.com',
    adminEmail: 'admin@freecipies.com',
    timezone: 'America/Toronto',
    language: 'en',

    // SEO Settings
    defaultMetaTitle: 'Freecipies - Delicious Recipes & Cooking Tips',
    defaultMetaDescription: 'Discover amazing recipes, cooking techniques, and kitchen tips from professional chefs and home cooks.',
    googleAnalyticsId: '',
    robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://freecipies.com/sitemap.xml',

    // Email Settings
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    emailFrom: 'noreply@freecipies.com',
    emailNotifications: true,

    // Social Media
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    pinterestUrl: '',
    youtubeUrl: '',

    // Content Settings
    postsPerPage: 12,
    commentsEnabled: true,
    autoPublish: false,
    featuredImageRequired: true,

    // Security Settings
    maintenanceMode: false,
    registrationEnabled: false,
    twoFactorAuth: false,
    sessionTimeout: 30,

    // Performance Settings
    cacheEnabled: true,
    imageOptimization: true,
    cdnEnabled: false,
    lazyLoading: true,
  });

  // Load settings on mount
  useEffect(() => {
    // Mock loading settings - in real app this would come from API
    const mockSettings = {
      siteName: 'Freecipies',
      siteDescription: 'Delicious recipes and cooking tips',
      siteUrl: 'https://freecipies.com',
      adminEmail: 'admin@freecipies.com',
      timezone: 'America/Toronto',
      language: 'en',
      postsPerPage: 12,
      commentsEnabled: true,
      autoPublish: false,
      featuredImageRequired: true,
      maintenanceMode: false,
      registrationEnabled: false,
      twoFactorAuth: false,
      sessionTimeout: 30,
      cacheEnabled: true,
      imageOptimization: true,
      cdnEnabled: false,
      lazyLoading: true,
    };
    setSettings(mockSettings);
    setFormData(prev => ({ ...prev, ...mockSettings }));
  }, [setSettings]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // In real app, this would save to API
      setSettings(formData);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <SettingsIcon className="w-8 h-8" />
            Settings
          </h2>
          <p className="text-muted-foreground mt-1">
            Configure your blog settings and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Basic information about your blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name *</Label>
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email *</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL *</Label>
                  <Input
                    id="siteUrl"
                    value={formData.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) => handleInputChange('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Toronto">Eastern Time</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (US)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Configuration</CardTitle>
              <CardDescription>Search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultMetaTitle">Default Meta Title</Label>
                <Input
                  id="defaultMetaTitle"
                  value={formData.defaultMetaTitle}
                  onChange={(e) => handleInputChange('defaultMetaTitle', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                <Textarea
                  id="defaultMetaDescription"
                  value={formData.defaultMetaDescription}
                  onChange={(e) => handleInputChange('defaultMetaDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={formData.googleAnalyticsId}
                  onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                  placeholder="GA-XXXXXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="robotsTxt">Robots.txt Content</Label>
                <Textarea
                  id="robotsTxt"
                  value={formData.robotsTxt}
                  onChange={(e) => handleInputChange('robotsTxt', e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>SMTP settings for sending emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={formData.smtpHost}
                    onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={formData.smtpPort}
                    onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    value={formData.smtpUser}
                    onChange={(e) => handleInputChange('smtpUser', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={formData.smtpPassword}
                    onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailFrom">From Email Address</Label>
                <Input
                  id="emailFrom"
                  type="email"
                  value={formData.emailFrom}
                  onChange={(e) => handleInputChange('emailFrom', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="emailNotifications"
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
                <Label htmlFor="emailNotifications">Enable email notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl">Facebook URL</Label>
                  <Input
                    id="facebookUrl"
                    value={formData.facebookUrl}
                    onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterUrl">Twitter URL</Label>
                  <Input
                    id="twitterUrl"
                    value={formData.twitterUrl}
                    onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagramUrl">Instagram URL</Label>
                  <Input
                    id="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pinterestUrl">Pinterest URL</Label>
                  <Input
                    id="pinterestUrl"
                    value={formData.pinterestUrl}
                    onChange={(e) => handleInputChange('pinterestUrl', e.target.value)}
                    placeholder="https://pinterest.com/yourprofile"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Settings */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure how content is displayed and managed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="postsPerPage">Posts Per Page</Label>
                <Input
                  id="postsPerPage"
                  type="number"
                  value={formData.postsPerPage}
                  onChange={(e) => handleInputChange('postsPerPage', parseInt(e.target.value))}
                  min="1"
                  max="50"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="commentsEnabled"
                    checked={formData.commentsEnabled}
                    onCheckedChange={(checked) => handleInputChange('commentsEnabled', checked)}
                  />
                  <Label htmlFor="commentsEnabled">Enable comments on posts</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoPublish"
                    checked={formData.autoPublish}
                    onCheckedChange={(checked) => handleInputChange('autoPublish', checked)}
                  />
                  <Label htmlFor="autoPublish">Auto-publish new posts</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featuredImageRequired"
                    checked={formData.featuredImageRequired}
                    onCheckedChange={(checked) => handleInputChange('featuredImageRequired', checked)}
                  />
                  <Label htmlFor="featuredImageRequired">Require featured image for posts</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Security and access control options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={formData.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
                <Label htmlFor="maintenanceMode">Enable maintenance mode</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="registrationEnabled"
                  checked={formData.registrationEnabled}
                  onCheckedChange={(checked) => handleInputChange('registrationEnabled', checked)}
                />
                <Label htmlFor="registrationEnabled">Allow user registration</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="twoFactorAuth"
                  checked={formData.twoFactorAuth}
                  onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
                />
                <Label htmlFor="twoFactorAuth">Enable two-factor authentication</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={formData.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                  min="5"
                  max="480"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Settings</CardTitle>
              <CardDescription>Optimize your site's performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="cacheEnabled"
                  checked={formData.cacheEnabled}
                  onCheckedChange={(checked) => handleInputChange('cacheEnabled', checked)}
                />
                <Label htmlFor="cacheEnabled">Enable caching</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="imageOptimization"
                  checked={formData.imageOptimization}
                  onCheckedChange={(checked) => handleInputChange('imageOptimization', checked)}
                />
                <Label htmlFor="imageOptimization">Enable image optimization</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="cdnEnabled"
                  checked={formData.cdnEnabled}
                  onCheckedChange={(checked) => handleInputChange('cdnEnabled', checked)}
                />
                <Label htmlFor="cdnEnabled">Enable CDN</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="lazyLoading"
                  checked={formData.lazyLoading}
                  onCheckedChange={(checked) => handleInputChange('lazyLoading', checked)}
                />
                <Label htmlFor="lazyLoading">Enable lazy loading</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;