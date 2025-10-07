# Weather Dashboard

A modern, responsive weather dashboard application built with React, TypeScript, and Vite. Get real-time weather information and 7-day forecasts for any city worldwide.

![Weather Dashboard](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue) ![Vite](https://img.shields.io/badge/Vite-5.2-purple)

## Features

- 🌤️ **Real-time Weather Data** - Current weather conditions for any city
- 📅 **7-Day Forecast** - Detailed daily weather predictions
- 🌡️ **Unit Toggle** - Switch between Metric (°C) and Imperial (°F)
- ⭐ **Favorites** - Save and quickly access your favorite cities
- 🔄 **Smart Caching** - 5-minute cache to reduce API calls
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Fast Loading** - Built with Vite for optimal performance

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with CSS variables

### Backend
- **Express** - Node.js web framework
- **LRU Cache** - Intelligent data caching
- **Node Fetch** - HTTP client for API requests
- **OpenWeatherMap API 3.0** - Weather data source (free tier)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **OpenWeatherMap API Key** (free tier available)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd weather-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# OpenWeatherMap API Key
# Get your free API key at: https://openweathermap.org/api
OWM_KEY=your_api_key_here

# Server Port (optional, defaults to 8787)
PORT=8787
```

**To get your API key:**
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account (the free tier is sufficient)
3. Navigate to your [API keys page](https://home.openweathermap.org/api_keys)
4. Generate a new API key
5. Copy the key and paste it into your `.env` file
6. **Important:** New API keys can take 1-2 hours to activate

**Note:** This app uses OpenWeatherMap's **One Call API 3.0**, which is available on the free tier with up to 1,000 calls per day.

### 4. Run the Application

Start both the backend proxy server and the frontend dev server:

```bash
npm start
```

This will launch:
- **Backend Server**: `http://localhost:8787`
- **Frontend App**: `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run both server and frontend concurrently |
| `npm run dev` | Start only the Vite dev server |
| `npm run server` | Start only the backend proxy server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build |

## Project Structure

```
weather-dashboard/
├── public/
│   └── prototype.html      # Static prototype
├── server/
│   └── proxy.ts           # Express API proxy server
├── src/
│   ├── components/        # React components
│   │   ├── CurrentPanel.tsx
│   │   ├── DailyForecast.tsx
│   │   ├── Favorites.tsx
│   │   ├── SearchBar.tsx
│   │   └── UnitToggle.tsx
│   ├── hooks/
│   │   └── useWeather.ts  # Custom weather data hook
│   ├── lib/
│   │   ├── format.ts      # Formatting utilities
│   │   └── storage.ts     # LocalStorage helpers
│   ├── styles/
│   │   ├── global.css     # Global styles
│   │   └── variables.css  # CSS custom properties
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── .env                   # Environment variables (not in git)
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
└── README.md             # This file
```

## API Endpoints

### GET `/api/weather`

Fetch weather data for a specific city.

**Query Parameters:**
- `city` (required) - City name (e.g., "London", "New York")

**Response:**
```json
{
  "current": {
    "locationName": "London",
    "lat": 51.5074,
    "lon": -0.1278,
    "timestamp": 1696723200000,
    "timezoneOffset": 3600000,
    "temperatureC": 15.5,
    "feelsLikeC": 14.2,
    "humidityPct": 72,
    "windSpeedMps": 3.5,
    "windDeg": 180,
    "description": "partly cloudy",
    "icon": "02d"
  },
  "daily": [...],
  "fetchedAt": 1696723200000,
  "source": "openweather"
}
```

**Headers:**
- `X-Cache: HIT` - Data served from cache
- `X-Cache: MISS` - Fresh data from API

## Features in Detail

### Smart Caching
- 5-minute TTL (Time To Live) for cached data
- LRU (Least Recently Used) eviction policy
- Cache up to 500 city queries
- Reduces API calls and improves performance

### Favorites Management
- Store favorite cities in browser's LocalStorage
- Quick access to frequently checked locations
- Persist across browser sessions

### Unit Conversion
- Toggle between Celsius and Fahrenheit
- Automatic conversion for all temperature values
- Preference saved in LocalStorage

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OWM_KEY` | OpenWeatherMap API key (required) | - |
| `PORT` | Backend server port | 8787 |

## Troubleshooting

### API Key Issues
- **401 Error**: API key is invalid or not activated yet
  - Wait 1-2 hours for new keys to activate
  - Verify the key is correct in `.env`
  - Ensure you're using the correct API key from your OpenWeatherMap account
  - The app uses One Call API 3.0 which is included in the free tier

### Port Already in Use
- If port 5173 is occupied, Vite will automatically try the next available port
- You can manually specify a port in `vite.config.ts`

### City Not Found
- Ensure the city name is spelled correctly
- Try using the full city name or including country code (e.g., "London,UK")

## Production Build

To build the app for production:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is created for demonstration purposes.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Built with [Vite](https://vitejs.dev/)
- Icons and data courtesy of OpenWeatherMap

---

**Built with ❤️ using React and TypeScript**
