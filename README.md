# 🎮 Funko Pop & Action Figures Collection

A dark-themed, futuristic website to showcase your Funko Pop and Action Figure collection with real-time search and smooth animations.

## ✨ Features

- 🌌 Dark futuristic theme with neon accents
- 🔍 Real-time search by character name
- 🎴 Card-based grid layout
- ✨ Smooth hover zoom animations
- 📱 Fully responsive (PC, tablet, mobile)
- 🖼️ Supports multiple image formats (JPG, PNG, WebP, GIF)
- 📦 Automatic placeholder for missing images

## 🚀 Getting Started

### 1. Setup Your Repository

1. Create a new GitHub repository (e.g., `my-collection`)
2. Upload these files to your repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`

### 2. Add Your Collection & Wishlist

Edit `script.js` and update both arrays:

**Your Collection (items you own):**
```javascript
const collection = [
    {
        name: "Spider-Man",
        type: "funko", // or "figure"
        image: "spiderman.png" // filename in 'images' folder
    },
    {
        name: "Iron Man",
        type: "funko",
        image: "ironman.jpg"
    },
    // Add more items...
];
```

**Your Wishlist (items you want):**
```javascript
const wishlistItems = [
    {
        name: "Thanos",
        type: "funko",
        image: "" // Upload image later
    },
    {
        name: "Wonder Woman",
        type: "figure",
        image: "wonderwoman.png"
    },
    // Add more items...
];
```

### 3. Add Images

1. Create an `images` folder in your repository
2. Add your images to this folder
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
4. Use the filename in the `image` field (e.g., `"ironman.jpg"`)
5. Leave `image: ""` empty for items without images (shows placeholder)

**Example folder structure:**
```
my-collection/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── spiderman.png
    ├── ironman.jpg
    ├── batman.png
    └── grogu.png
```

### 4. Deploy to GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select `main` branch
4. Click "Save"
5. Your site will be live at: `https://yourusername.github.io/my-collection/`

## 📝 How to Add New Items

1. Open `script.js`
2. Add a new object to the `collection` array:

```javascript
{
    name: "Character Name",
    type: "funko",  // or "figure"
    image: "filename.png"  // or "" for placeholder
}
```

3. If you have an image:
   - Add the image file to the `images` folder
   - Use the exact filename in the `image` field

4. Commit and push your changes to GitHub

## 🎨 Customization

### Change Colors

Edit `style.css` and modify the CSS variables:

```css
:root {
    --bg-primary: #0a0e27;           /* Main background */
    --bg-secondary: #141b3d;         /* Secondary background */
    --bg-card: #1a2347;              /* Card background */
    --accent-primary: #00d9ff;       /* Primary accent (cyan) */
    --accent-secondary: #b030ff;     /* Secondary accent (purple) */
    --text-primary: #ffffff;         /* Main text color */
    --text-secondary: #a8b3cf;       /* Secondary text color */
}
```

### Change Card Size

In `style.css`, find the `.grid` class and adjust:

```css
.grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Change 250px to your preferred minimum card width */
}
```

## 🖼️ Image Tips

**Best Practices:**
- Use square images for best results (1:1 aspect ratio)
- Recommended size: 500x500px or larger
- Use PNG with transparent backgrounds for cleaner look
- Keep file sizes under 500KB for faster loading

**Optimizing Images:**
- Use online tools like [TinyPNG](https://tinypng.com/) to compress images
- Convert to WebP format for smaller file sizes

## 🔧 Troubleshooting

**Images not showing:**
- Check that the filename in `script.js` exactly matches the file in `images/` folder
- Verify the image file was committed to GitHub
- Check browser console for errors (F12)

**Search not working:**
- Clear your browser cache
- Make sure JavaScript is enabled
- Check that `script.js` is loaded properly

**Site not updating on GitHub Pages:**
- Wait 1-2 minutes for GitHub to rebuild
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check GitHub Actions for build errors

## 📱 Mobile Support

The site automatically adapts to different screen sizes:
- **Desktop:** Large cards with hover effects
- **Tablet:** Medium-sized cards
- **Mobile:** Smaller cards in a responsive grid

## 🌟 Features in Detail

### Search
- Real-time filtering as you type
- Searches character names only
- Case-insensitive
- Shows count of results

### Hover Effect
- Cards lift up and scale slightly
- Images zoom smoothly
- Glowing border effect
- Touch-friendly on mobile

### Stats
- Total items in collection
- Currently showing (after search)
- Hover effects on stat cards

## 📄 License

Feel free to use and modify this code for your personal collection!

## 🤝 Contributing

This is a personal project, but feel free to fork and customize it for your own use!

---

**Enjoy showcasing your collection! 🎉**
