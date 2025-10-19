# Freecipies Admin Panel - Complete Guide

## 🎯 Overview

A professional React-based admin panel for managing the Freecipies blog platform. Built with modern technologies including React, React Router, Zustand for state management, and shadcn/ui components.

---

## 🚀 Quick Start

### Installation

```bash
cd freecipies-admin
pnpm install
```

### Development

```bash
pnpm dev
```

The admin panel will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:4321/api
VITE_SITE_URL=http://localhost:4321
```

For production:

```env
VITE_API_URL=https://freecipies.com/api
VITE_SITE_URL=https://freecipies.com
```

---

## 📁 Project Structure

```
freecipies-admin/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── AdminLayout.jsx        # Main layout with sidebar
│   │   └── PinterestPinManager.jsx # Pinterest pin management
│   ├── pages/
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx      # Dashboard with statistics
│   │   ├── articles/
│   │   │   ├── ArticlesList.jsx   # Article list with filters
│   │   │   └── ArticleEditor.jsx  # Article editor with JSON
│   │   ├── categories/
│   │   │   ├── CategoriesList.jsx # Category list
│   │   │   └── CategoryEditor.jsx # Category editor
│   │   ├── authors/
│   │   │   ├── AuthorsList.jsx    # Author list
│   │   │   └── AuthorEditor.jsx   # Author editor
│   │   ├── tags/
│   │   │   ├── TagsList.jsx       # Tag list
│   │   │   └── TagEditor.jsx      # Tag editor
│   │   ├── pinterest/
│   │   │   ├── BoardsList.jsx     # Pinterest boards list
│   │   │   └── BoardEditor.jsx    # Board editor
│   │   ├── media/
│   │   │   └── MediaLibrary.jsx   # Media library with R2
│   │   ├── settings/
│   │   │   └── Settings.jsx       # Settings panel
│   │   └── auth/
│   │       └── Login.jsx          # Login page
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── store/
│   │   └── useStore.js            # Zustand global state
│   ├── utils/
│   │   └── helpers.js             # Utility functions
│   ├── App.jsx                    # Main app with routing
│   └── main.jsx                   # Entry point
├── package.json
└── vite.config.js
```

---

## 🎨 Features

### 1. Dashboard
- **Statistics Overview**: Total articles, categories, authors, tags
- **Recent Activity**: Latest articles and updates
- **Quick Actions**: Create new content
- **Analytics**: Article performance metrics

### 2. Articles Management
- **List View**: Filterable and searchable article list
- **Article Editor**: 
  - Rich text editing
  - JSON editor for complex data (Monaco Editor)
  - Recipe data management
  - Image upload to R2
  - Pinterest pin management
  - SEO metadata
  - Online/offline toggle
  - Favorite marking
- **Flexible Structure**: Supports both recipe articles and regular blog posts

### 3. Categories Management
- **CRUD Operations**: Create, Read, Update, Delete
- **SEO Fields**: Meta title, meta description
- **Image Management**: Upload category images to R2
- **Sorting**: Custom sort order
- **Favorites**: Mark categories as favorites

### 4. Authors Management
- **Author Profiles**: Name, bio, job title
- **Social Networks**: Links to social media profiles
- **Image Upload**: Author profile pictures
- **SEO Optimization**: Meta tags for author pages

### 5. Tags Management
- **Tag Creation**: Simple tag management
- **Usage Statistics**: See how many articles use each tag
- **Bulk Operations**: Manage multiple tags at once

### 6. Pinterest Boards
- **Board Management**: Create and manage Pinterest boards
- **RSS Feed URLs**: Automatic RSS feed generation per board
- **Board Assignment**: Assign pins to specific boards
- **Active/Inactive**: Control which boards appear in feeds
- **Integration Guide**: Instructions for IFTTT/Zapier setup

### 7. Pinterest Pin Manager
- **Multiple Pins per Article**: Create unlimited pins
- **Board Assignment**: Assign pins to specific Pinterest boards
- **Image Upload**: Upload pin images to R2
- **Primary Pin**: Mark one pin as primary
- **Sort Order**: Control pin display order
- **Dimensions**: Track image dimensions (1000x1500px recommended)
- **Preview**: See how pins will look

### 8. Media Library
- **R2 Integration**: Upload images to Cloudflare R2
- **File Management**: Browse, search, delete images
- **Copy URLs**: Easy URL copying for use in content
- **Metadata**: Track image dimensions, alt text, attribution

### 9. Settings
- **Site Configuration**: General site settings
- **API Keys**: Manage API keys and tokens
- **User Management**: Admin user accounts
- **Preferences**: UI preferences and defaults

### 10. Authentication
- **Secure Login**: JWT-based authentication
- **Session Management**: Persistent login sessions
- **Logout**: Secure logout with token cleanup

---

## 🔧 Technical Stack

### Core Technologies
- **React 18**: Modern React with hooks
- **React Router 6**: Client-side routing
- **Zustand**: Lightweight state management
- **Axios**: HTTP client for API calls
- **Vite**: Fast build tool and dev server

### UI Components
- **shadcn/ui**: High-quality React components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful icon set
- **Radix UI**: Accessible component primitives

### Code Quality
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: (Optional) Type safety

---

## 📝 API Integration

### API Service Layer (`src/services/api.js`)

All API calls are centralized in the API service layer:

```javascript
import { articlesAPI, categoriesAPI, authorsAPI } from './services/api';

// Get all articles
const articles = await articlesAPI.getAll({ page: 1, limit: 20 });

// Create new article
await articlesAPI.create(articleData);

// Update article
await articlesAPI.update(slug, articleData);

// Delete article
await articlesAPI.delete(slug);
```

### Available APIs

- `articlesAPI` - Articles CRUD
- `categoriesAPI` - Categories CRUD
- `authorsAPI` - Authors CRUD
- `tagsAPI` - Tags CRUD
- `pinterestBoardsAPI` - Pinterest Boards CRUD
- `pinterestPinsAPI` - Pinterest Pins CRUD
- `mediaAPI` - Media/R2 file management
- `settingsAPI` - Settings management
- `authAPI` - Authentication
- `statsAPI` - Dashboard statistics

---

## 🎯 Key Components

### AdminLayout

Main layout component with:
- Responsive sidebar navigation
- Header with user menu
- Theme toggle (light/dark)
- Mobile-friendly hamburger menu

### ArticleEditor

Comprehensive article editor with:
- Form fields for all article data
- Monaco JSON editor for complex data
- Pinterest Pin Manager integration
- Image upload functionality
- SEO metadata fields
- Online/offline toggle

### PinterestPinManager

Pinterest pin management component:
- Add/edit/delete pins
- Upload pin images to R2
- Assign pins to boards
- Set primary pin
- Reorder pins
- Preview pins

### BoardsList & BoardEditor

Pinterest board management:
- Create/edit boards
- View RSS feed URLs
- Copy feed URLs
- Link to Pinterest boards
- Active/inactive toggle

---

## 🔐 Authentication

### Login Flow

1. User enters credentials
2. API validates and returns JWT token
3. Token stored in localStorage
4. Token added to all API requests via interceptor
5. Protected routes check authentication status

### Protected Routes

All admin routes are protected:

```javascript
<ProtectedRoute>
  <AdminLayout />
</ProtectedRoute>
```

Unauthenticated users are redirected to `/login`.

### Logout

```javascript
const handleLogout = () => {
  clearAuth();
  localStorage.removeItem('admin_token');
  window.location.href = '/login';
};
```

---

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling:

```jsx
<div className="flex items-center justify-between p-6">
  <h1 className="text-3xl font-bold">Dashboard</h1>
  <Button className="bg-primary text-white">Create</Button>
</div>
```

### shadcn/ui Components

Pre-built, accessible components:

```jsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

<Card>
  <CardContent>
    <Input placeholder="Enter text" />
    <Button>Submit</Button>
  </CardContent>
</Card>
```

### Theme Support

Light and dark themes:

```javascript
const { theme, toggleTheme } = useUIStore();

<button onClick={toggleTheme}>
  {theme === 'dark' ? <Sun /> : <Moon />}
</button>
```

---

## 📊 State Management

### Zustand Store

Global state management with Zustand:

```javascript
// src/store/useStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}));
```

### Usage

```javascript
import { useAuthStore, useUIStore } from './store/useStore';

const { user, isAuthenticated } = useAuthStore();
const { sidebarOpen, toggleSidebar } = useUIStore();
```

---

## 🚀 Deployment

### Build

```bash
pnpm build
```

This creates a `dist` folder with optimized static files.

### Deploy to Cloudflare Pages

```bash
wrangler pages deploy dist
```

### Environment Variables

Set environment variables in Cloudflare Pages dashboard:

- `VITE_API_URL` - Your Astro backend API URL
- `VITE_SITE_URL` - Your main site URL

---

## 🔄 Development Workflow

### 1. Start Development Server

```bash
pnpm dev
```

### 2. Make Changes

Edit files in `src/` directory. Vite will hot-reload changes.

### 3. Test Locally

Ensure the Astro backend is running at `http://localhost:4321`.

### 4. Build for Production

```bash
pnpm build
```

### 5. Preview Production Build

```bash
pnpm preview
```

### 6. Deploy

```bash
wrangler pages deploy dist
```

---

## 📚 Common Tasks

### Adding a New Page

1. Create page component in `src/pages/`:

```jsx
// src/pages/example/ExamplePage.jsx
const ExamplePage = () => {
  return <div>Example Page</div>;
};

export default ExamplePage;
```

2. Add route in `App.jsx`:

```jsx
const ExamplePage = lazy(() => import('./pages/example/ExamplePage'));

// In Routes:
<Route path="example" element={<ExamplePage />} />
```

3. Add navigation link in `AdminLayout.jsx`:

```javascript
const navigation = [
  // ...
  { name: 'Example', href: '/example', icon: FileText },
];
```

### Adding a New API Endpoint

In `src/services/api.js`:

```javascript
export const exampleAPI = {
  getAll: (params = {}) => api.get('/example', { params }),
  create: (data) => api.post('/example', data),
  update: (id, data) => api.put(`/example/${id}`, data),
  delete: (id) => api.delete(`/example/${id}`),
};
```

### Adding a New shadcn/ui Component

```bash
npx shadcn-ui@latest add [component-name]
```

Example:

```bash
npx shadcn-ui@latest add dialog
```

This adds the component to `src/components/ui/`.

---

## 🐛 Troubleshooting

### API Connection Issues

**Problem**: Cannot connect to API

**Solution**:
1. Check `VITE_API_URL` in `.env`
2. Ensure Astro backend is running
3. Check browser console for CORS errors
4. Verify API endpoints in `src/services/api.js`

### Authentication Issues

**Problem**: Logged out unexpectedly

**Solution**:
1. Check JWT token expiration
2. Verify token in localStorage
3. Check API interceptor in `api.js`
4. Ensure backend returns valid tokens

### Build Errors

**Problem**: Build fails

**Solution**:
1. Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
2. Clear Vite cache: `rm -rf .vite`
3. Check for TypeScript errors
4. Verify all imports are correct

### Styling Issues

**Problem**: Tailwind classes not working

**Solution**:
1. Check `tailwind.config.js` configuration
2. Ensure PostCSS is configured
3. Verify class names are correct
4. Check for conflicting CSS

---

## 🎯 Best Practices

### Code Organization

- Keep components small and focused
- Use custom hooks for reusable logic
- Centralize API calls in service layer
- Use Zustand for global state only

### Performance

- Lazy load pages with `React.lazy()`
- Use `React.memo()` for expensive components
- Optimize images before upload
- Minimize bundle size

### Security

- Never store sensitive data in localStorage
- Validate all user inputs
- Use HTTPS in production
- Implement CSRF protection

### Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

---

## 📖 Resources

### Documentation

- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

### Tools

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools) (works with Zustand)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## 🎉 Features Summary

### ✅ Completed Features

1. **Dashboard** - Statistics and overview
2. **Articles CRUD** - Full article management
3. **Categories CRUD** - Category management
4. **Authors CRUD** - Author profiles
5. **Tags CRUD** - Tag management
6. **Pinterest Boards** - Board management with RSS feeds
7. **Pinterest Pins** - Pin creation and management
8. **Media Library** - R2 image management
9. **Settings** - Site configuration
10. **Authentication** - Secure login/logout
11. **Responsive Design** - Mobile-friendly
12. **Theme Support** - Light/dark themes

### 🚧 Future Enhancements

1. **Bulk Operations** - Bulk edit/delete
2. **Advanced Filters** - More filter options
3. **Export/Import** - Data export/import
4. **Analytics** - Detailed analytics dashboard
5. **Notifications** - Real-time notifications
6. **Collaboration** - Multi-user support
7. **Version History** - Content versioning
8. **Scheduled Publishing** - Schedule content

---

## 💡 Tips & Tricks

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save (in editors)
- `Ctrl/Cmd + K` - Search
- `Esc` - Close modals/dialogs

### Quick Actions

- Click logo to return to dashboard
- Use search to quickly find content
- Double-click items to edit
- Drag to reorder (where applicable)

### Productivity

- Use filters to narrow down lists
- Save frequently used searches
- Use keyboard navigation
- Batch operations when possible

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-17  
**License**: MIT  
**Support**: See COMPLETE_PROJECT_GUIDE.md

