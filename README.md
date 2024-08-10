# Movie and Actor Listing App

This project is a mobile application developed using React Native. The app lists movies and actors using the TMDB (The Movie Database) API.

## Features

- List movies
- List actors
- Detailed information about movies
- Detailed information about actors
- User-friendly interface

## Installation

This project is developed using React Native and its dependencies. To set up the project locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://https://github.com/OzzyD07/OzzyFlix
   ```

2. Navigate to the project directory:
   ```bash
   cd OzzyFlix
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the project:
   ```bash
   npx expo start
   ```

## Configuration

To use the TMDB API, you need an API key. After obtaining your API key, create a `/services/tmdb.tsx` file and add the following line:

```
API_KEY="your_api_key_here"
```

## Usage

After starting the application, you can access the list of movies from the main screen. To get more information about a movie, tap on the relevant movie card.

## Contributing

If you would like to contribute, please submit a pull request. For discussions or suggestions, please use the [Issues](https://github.com/OzzyD07/OzzyFlix/issues) section.
