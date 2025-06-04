# Online Music Player

Link demo: https://chabuuuu.github.io/se334-bth-music-player/

The Online Music Player is a web application built entirely with frontend technologies (HTML, CSS, and JavaScript). It allows users to play music from a predefined or user-managed playlist, control playback, and customize the interface.

## Project Goals

- To familiarize with interactive JavaScript programming (DOM manipulation, Audio API).
- To develop UI design skills using HTML and CSS (with Bootstrap for styling).
- To build a complete web application with multimedia features.

## Features

### Core Functionality:

- **Display Song List:** Shows a list of available songs.
- **Playback Controls:**
  - Play
  - Pause
  - Next Song
  - Previous Song
- **Track Information:**
  - Displays the name of the currently playing song.
  - Shows album art (if available, with a default fallback).
- **Volume Control:** A slider to adjust the audio volume.
- **Progress Bar:**
  - Visually indicates the current playback position.
  - Allows users to seek (scrub) through the song.
  - Displays current time and total duration of the song.
- **Playlist Management:**
  - Add new songs to the playlist (via URL/file path or by uploading an MP3 file).
  - Remove songs from the playlist.
  - The active song in the playlist is highlighted.

### Advanced Features Implemented:

- **Persistent Playlist (Local Storage):**
  - The user's playlist (including added or removed songs) is saved in the browser's `localStorage`.
  - The playlist is automatically restored when the user reopens the application.
- **Customizable Interface (Dark Mode/Light Mode):**
  - A toggle button to switch between a light and dark theme.
  - The user's theme preference is saved in `localStorage`.
- **Seek Forward/Backward:**
  - Dedicated buttons to skip forward or backward by 10 seconds in the current song.
- **File Upload:** Users can add songs by selecting local MP3 files from their computer.
- **Keyboard Shortcuts:**
  - `Spacebar`: Play/Pause
  - `ArrowRight`: Next Song
  - `ArrowLeft`: Previous Song
  - `Ctrl/Cmd + ArrowRight`: Seek Forward (+10s)
  - `Ctrl/Cmd + ArrowLeft`: Seek Backward (-10s)
  - `ArrowUp`: Volume Up
  - `ArrowDown`: Volume Down
- **Auto-Play Next Song:** Automatically plays the next song in the playlist when the current one finishes.

## Tech Stack

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **Styling & Icons:**
  - Bootstrap 4.5
  - Font Awesome 5
- **APIs:**
  - HTML5 Audio API
  - Web Storage API (localStorage)

## Setup and Installation

1.  **Clone the repository (or download the files):**

    ```bash
    # If you were using Git
    # git clone [https://your-repository-url.git](https://your-repository-url.git)
    # cd music-player-app
    ```

    If you downloaded a ZIP, extract it.

2.  **Navigate to the project directory:**

    ```bash
    cd music-player-app
    ```

3.  **Prepare Music Files:**

    - Create a `music` folder inside the `music-player-app` directory if it doesn't exist.
    - Add your `.mp3` song files to the `music/` folder.
    - (Optional) Add corresponding album art images (e.g., `.jpg`, `.png`) to the `music/` folder.
    - Update the `defaultPlaylist` array in `script.js` with the correct paths and names for your initial songs and their album art.
      ```javascript
      // Example in script.js
      const defaultPlaylist = [
        {
          name: "My Awesome Song 1",
          path: "music/song1.mp3",
          art: "music/art1.jpg",
        },
        {
          name: "Another Great Track",
          path: "music/song2.mp3",
          art: "music/art2.png",
        },
      ];
      const defaultAlbumArt = "music/default-album-art.png";
      ```

4.  **Open in Browser:**
    - Open the `index.html` file directly in your web browser (e.g., Google Chrome, Firefox, Edge).

## How to Use

1.  **Load Songs:**
    - The player will load the default playlist specified in `script.js`.
    - You can add more songs using the "Add Song" section:
      - Enter the song name (optional) and the URL/path to the MP3 file, then click "Add".
      - Click "Add from file" to select an MP3 from your computer.
2.  **Playing Music:**
    - Click on a song in the playlist to select and start playing it.
    - Use the main play/pause button in the control panel.
3.  **Controls:**
    - **Play/Pause:** Toggle playback.
    - **Next/Previous:** Switch between songs in the playlist.
    - **Seek Forward/Backward:** Jump 10 seconds in the current song.
    - **Progress Bar:** Click or drag to seek to a specific part of the song.
    - **Volume Bar:** Adjust the volume.
4.  **Playlist Management:**
    - Songs added by the user will appear in the playlist.
    - Click the trash icon next to a song to remove it from the playlist. Changes are saved locally.
5.  **Theme:**
    - Click the moon/sun icon in the top right to toggle between Dark and Light mode. Your preference is saved.

---
