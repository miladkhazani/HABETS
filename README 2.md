# Habits App

A modern habit tracking and social challenge app built with React Native and Expo.

## Features

- 🎯 Create and join habit challenges
- 👥 Social features and friend system
- 💰 Challenge pot system
- 🏆 Achievement tracking
- 📊 Progress tracking and statistics

## Tech Stack

- React Native
- Expo Router
- Supabase
- TypeScript

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/habits-app.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the Supabase configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
habits-app/
├── app/                   # App routes (Expo Router)
│   ├── (auth)/           # Authentication routes
│   └── (tabs)/           # Main app tabs
├── components/           # Reusable components
├── lib/                  # Utility functions and configurations
├── providers/           # React context providers
├── store/               # State management
├── types/               # TypeScript type definitions
└── supabase/            # Supabase configurations and migrations
```

## Environment Variables

Required environment variables:

- `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.