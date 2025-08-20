# GIS Route Planner

A modern, responsive web application for route planning and navigation built with React and ArcGIS Maps SDK for JavaScript. This application allows users to create routes between two points and view detailed turn-by-turn directions.

![GIS Route Planner](https://img.shields.io/badge/React-18+-blue.svg)
![ArcGIS](https://img.shields.io/badge/ArcGIS-Maps%20SDK-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

- **Interactive Map**: Click-to-place markers for route planning
- **Real-time Routing**: Calculate optimal routes between two points
- **Turn-by-turn Directions**: Detailed navigation instructions with distances
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: WCAG compliant with screen reader support
- **Modern UI**: Clean, professional interface using Calcite Design System

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14.0 or higher)
- npm (version 6.0 or higher)
- Modern web browser with ES6+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd arcgis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Set Origin Point**: Click anywhere on the map to place your starting point (white marker)
2. **Set Destination**: Click on another location to place your destination (black marker)
3. **View Route**: The application automatically calculates and displays the optimal route
4. **Navigation**: View turn-by-turn directions in the side panel
5. **Reset**: Click a third time anywhere on the map to start over, or use the "Clear" button

### Keyboard Shortcuts

- **Escape**: Clear current route and reset markers

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DirectionsPanel.js    # Route directions display
│   ├── ErrorBoundary.js      # Error handling component
│   └── MapComponent.js       # Main map container
├── hooks/              # Custom React hooks
│   ├── useMapGraphics.js     # Graphics state management
│   └── useRouting.js         # Route calculation logic
├── constants/          # Application constants
│   └── config.js            # Configuration settings
├── utils/              # Utility functions
│   └── helpers.js           # Helper functions
├── App.js              # Main application component
├── App.css             # Global styles
└── index.js            # Application entry point
```

## 🛠️ Technologies Used

- **Frontend Framework**: React 18+
- **Mapping**: ArcGIS Maps SDK for JavaScript
- **UI Components**: Esri Calcite Components
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Styling**: CSS3 with Flexbox and Grid
- **Development**: Create React App
- **Type Checking**: PropTypes

## 🔧 Configuration

### API Configuration

The application uses ArcGIS services. Update the configuration in `src/constants/config.js`:

```javascript
export const CONFIG = {
  ROUTE_SERVICE_URL: "your-route-service-url",
  // ... other configuration options
};
```

### Environment Variables

For production deployment, consider using environment variables:

```bash
# .env
REACT_APP_ARCGIS_API_KEY=your_api_key_here
REACT_APP_ROUTE_SERVICE_URL=your_route_service_url
```

## 🎨 Customization

### Styling

- **Global styles**: Modify `src/App.css`
- **Component styles**: Each component includes inline styles for specific customizations
- **Theme colors**: Update CSS custom properties in the root styles

### Map Layers

Add or modify map layers in `src/components/MapComponent.js`:

```javascript
const customLayer = new FeatureLayer({
  url: "your-layer-url",
  title: "Custom Layer"
});
```

## 📱 Responsive Design

The application is fully responsive and includes:

- **Mobile-first approach**: Optimized for mobile devices
- **Flexible layouts**: Adapts to different screen sizes
- **Touch-friendly**: Large touch targets for mobile interaction
- **Reduced motion support**: Respects user preferences

## ♿ Accessibility Features

- **Screen reader support**: Proper ARIA labels and descriptions
- **Keyboard navigation**: Full keyboard accessibility
- **High contrast mode**: Supports system preferences
- **Focus management**: Clear focus indicators
- **Live regions**: Dynamic content announcements

## 🚀 Building for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Test the build locally**
   ```bash
   npx serve -s build
   ```

3. **Deploy to your hosting platform**
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any static hosting service

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🔍 Performance Optimization

- **Code splitting**: Automatic with Create React App
- **Lazy loading**: Components loaded on demand
- **Memoization**: useCallback and useMemo for expensive operations
- **Asset optimization**: Images and resources optimized for web

## 🐛 Troubleshooting

### Common Issues

1. **Map not loading**: Check your API key and internet connection
2. **Route calculation fails**: Verify the route service URL is accessible
3. **Styling issues**: Ensure Calcite Components CSS is loaded properly

### Debug Mode

Enable debug logging by adding to your browser console:

```javascript
localStorage.setItem('debug', 'true');
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **ESLint**: Follow the configured linting rules
- **Prettier**: Use for code formatting
- **Comments**: Document complex logic and public APIs
- **Testing**: Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/)
- [Esri Calcite Components](https://developers.arcgis.com/calcite-design-system/)
- [Create React App](https://create-react-app.dev/)
- [React Documentation](https://reactjs.org/)

## 📞 Support

For support and questions:

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub
- **Community**: Join the ArcGIS Developers community

---

**Made with ❤️ using React and ArcGIS**
