document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("play-pause");
  const playPauseIcon = playPauseBtn.querySelector("i");
  const progressBar = document.getElementById("progress");
  const volumeBar = document.getElementById("volume");
  const currentSongDisplay = document.getElementById("current-song");
  const playlistElement = document.getElementById("playlist");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeText = document.getElementById("theme-text");
  const themeIcon = themeToggleBtn.querySelector("i");
  const albumArt = document.getElementById("album-art");
  const currentTimeDisplay = document.getElementById("current-time");
  const durationDisplay = document.getElementById("duration");

  const seekForwardBtn = document.getElementById("seek-forward");
  const seekBackwardBtn = document.getElementById("seek-backward");

  const addSongBtn = document.getElementById("add-song-btn");
  const songNameInput = document.getElementById("song-name-input");
  const songUrlInput = document.getElementById("song-url-input");
  const songFileInput = document.getElementById("song-file-input");
  const addSongFromFileBtn = document.getElementById("add-song-from-file-btn");

  let playlist = [];
  let currentIndex = 0;
  let isPlaying = false;

  const defaultPlaylist = [
    {
      name: "Thêm một lần đau - HKT",
      path: "music/them-mot-lan-dau.mp3",
      art: "cover/hkt.jpg",
    },
    {
      name: "Trú mưa - HKT",
      path: "music/tru-mua-hkt.mp3",
      art: "cover/hkt.jpg",
    },
    {
      name: "Nàng kiều lỡ bước - HKT",
      path: "music/nang-kieu-lo-buoc.mp3",
      art: "cover/hkt.jpg",
    },
  ];
  const defaultAlbumArt = "music/default-album-art.png"; // Path to a default album art

  function loadPlaylist() {
    const storedPlaylist = localStorage.getItem("musicPlayerPlaylist");
    if (storedPlaylist) {
      playlist = JSON.parse(storedPlaylist);
    } else {
      playlist = [...defaultPlaylist]; // Use a copy of the default
      savePlaylist(); // Save default to localStorage if nothing is stored
    }
    if (playlist.length === 0 && defaultPlaylist.length > 0) {
      playlist = [...defaultPlaylist];
      savePlaylist();
    }
    renderPlaylist();
    if (playlist.length > 0) {
      loadSong(currentIndex); // Load the first song metadata
    } else {
      currentSongDisplay.textContent = "Thêm bài hát vào danh sách phát";
      albumArt.src = defaultAlbumArt;
    }
  }

  function savePlaylist() {
    localStorage.setItem("musicPlayerPlaylist", JSON.stringify(playlist));
  }

  function renderPlaylist() {
    playlistElement.innerHTML = ""; // Clear existing items
    if (playlist.length === 0) {
      const li = document.createElement("li");
      li.className = "list-group-item text-muted";
      li.textContent = "Chưa có bài hát nào. Hãy thêm bài hát!";
      playlistElement.appendChild(li);
      return;
    }
    playlist.forEach((song, index) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";
      if (index === currentIndex) {
        li.classList.add("active");
      }
      li.textContent = song.name || `Bài hát ${index + 1}`;
      li.dataset.index = index;

      const songActions = document.createElement("div");
      songActions.className = "song-actions";

      const removeBtn = document.createElement("button");
      removeBtn.className = "btn btn-danger btn-sm";
      removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
      removeBtn.title = "Xóa bài hát";
      removeBtn.onclick = (event) => {
        event.stopPropagation(); // Prevent li click event
        removeSong(index);
      };
      songActions.appendChild(removeBtn);
      li.appendChild(songActions);

      li.addEventListener("click", () => {
        currentIndex = index;
        playSong();
      });
      playlistElement.appendChild(li);
    });
    updateActivePlaylistItem();
  }

  function updateActivePlaylistItem() {
    const items = playlistElement.querySelectorAll("li");
    items.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  function loadSong(index) {
    if (playlist.length === 0 || index < 0 || index >= playlist.length) {
      currentSongDisplay.textContent = "Danh sách phát trống";
      albumArt.src = defaultAlbumArt;
      audio.src = ""; // Clear audio source
      return;
    }
    const song = playlist[index];
    audio.src = song.path;
    currentSongDisplay.textContent =
      song.name || `Đang phát: ${song.path.split("/").pop()}`;
    albumArt.src = song.art || defaultAlbumArt;
    updateActivePlaylistItem();

    progressBar.value = 0;
    currentTimeDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";
  }

  function playSong() {
    if (playlist.length === 0) {
      alert("Vui lòng thêm bài hát vào danh sách phát!");
      return;
    }
    loadSong(currentIndex); // Ensure correct song is loaded
    audio
      .play()
      .then(() => {
        isPlaying = true;
        playPauseIcon.classList.remove("fa-play");
        playPauseIcon.classList.add("fa-pause");
      })
      .catch((error) => {
        console.error("Lỗi khi phát nhạc:", error);
        currentSongDisplay.textContent = `Lỗi: ${
          playlist[currentIndex]?.name || "bài hát này"
        }`;
      });
  }

  function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  }

  playPauseBtn.addEventListener("click", () => {
    if (audio.src) {
      isPlaying ? pauseSong() : playSong();
    } else if (playlist.length > 0) {
      playSong(); // If no src but playlist has songs, play the first one
    } else {
      alert("Vui lòng thêm bài hát vào danh sách phát!");
    }
  });

  nextBtn.addEventListener("click", () => {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex + 1) % playlist.length;
    playSong();
  });

  prevBtn.addEventListener("click", () => {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong();
  });

  addSongBtn.addEventListener("click", () => {
    const name = songNameInput.value.trim();
    const url = songUrlInput.value.trim();
    if (url) {
      playlist.push({
        name: name || `Bài hát ${playlist.length + 1}`,
        path: url,
        art: defaultAlbumArt,
      });
      songNameInput.value = "";
      songUrlInput.value = "";
      savePlaylist();
      renderPlaylist();
      if (playlist.length === 1 && !audio.src) {
        loadSong(0);
      }
      alert("Đã thêm bài hát!");
    } else {
      alert("Vui lòng nhập đường dẫn bài hát (URL hoặc file path).");
    }
  });

  addSongFromFileBtn.addEventListener("click", () => {
    songFileInput.click(); // Trigger file input
  });

  songFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "audio/mpeg" || file.type === "audio/mp3") {
        const songName = file.name.replace(/\.mp3$/i, "");
        const songPath = URL.createObjectURL(file);
        playlist.push({
          name: songName,
          path: songPath,
          art: defaultAlbumArt,
          isLocalFile: true,
        });
        savePlaylist();
        renderPlaylist();
        if (playlist.length === 1 && !audio.src) {
          loadSong(0);
        }
        alert(`Đã thêm: ${songName}`);
        songFileInput.value = "";
      } else {
        alert("Vui lòng chọn file nhạc định dạng .mp3.");
      }
    }
  });

  function removeSong(indexToRemove) {
    if (indexToRemove < 0 || indexToRemove >= playlist.length) return;

    const removedSongIsCurrent = indexToRemove === currentIndex;
    const wasPlaying = isPlaying;

    playlist.splice(indexToRemove, 1);
    savePlaylist();

    if (playlist.length === 0) {
      audio.src = "";
      currentSongDisplay.textContent = "Thêm bài hát vào danh sách phát";
      albumArt.src = defaultAlbumArt;
      playPauseIcon.classList.remove("fa-pause");
      playPauseIcon.classList.add("fa-play");
      isPlaying = false;
      progressBar.value = 0;
      currentTimeDisplay.textContent = "0:00";
      durationDisplay.textContent = "0:00";
      currentIndex = 0;
    } else {
      if (removedSongIsCurrent) {
        currentIndex = indexToRemove > 0 ? indexToRemove - 1 : 0;
        if (currentIndex >= playlist.length) currentIndex = 0;

        if (wasPlaying) {
          playSong();
        } else {
          loadSong(currentIndex);
        }
      } else if (indexToRemove < currentIndex) {
        currentIndex--;
      }
    }
    renderPlaylist();
  }

  volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      progressBar.value = (audio.currentTime / audio.duration) * 100;
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }
  });

  progressBar.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration);
    if (isPlaying) {
      audio
        .play()
        .catch((e) =>
          console.warn("Autoplay after metadata load prevented:", e)
        );
    }
  });

  audio.addEventListener("ended", () => {
    nextBtn.click();
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      themeText.textContent = "Light Mode";
      localStorage.setItem("musicPlayerTheme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      themeText.textContent = "Dark Mode";
      localStorage.setItem("musicPlayerTheme", "light");
    }
  }

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("musicPlayerTheme") || "light";
    applyTheme(currentTheme === "light" ? "dark" : "light");
  });

  const savedTheme = localStorage.getItem("musicPlayerTheme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme("light");
  }

  seekForwardBtn.addEventListener("click", () => {
    if (!audio.src || !audio.duration) return;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  });

  seekBackwardBtn.addEventListener("click", () => {
    if (!audio.src || !audio.duration) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.target.tagName === "INPUT" ||
      event.target.tagName === "TEXTAREA"
    ) {
      return;
    }

    switch (event.code) {
      case "Space": // Play/Pause
        event.preventDefault();
        playPauseBtn.click();
        break;
      case "ArrowRight": // Next song or Seek forward
        if (event.ctrlKey || event.metaKey) {
          seekForwardBtn.click();
        } else {
          nextBtn.click();
        }
        break;
      case "ArrowLeft": // Previous song or Seek backward
        if (event.ctrlKey || event.metaKey) {
          seekBackwardBtn.click();
        } else {
          prevBtn.click();
        }
        break;
      case "ArrowUp": // Volume Up
        event.preventDefault();
        volumeBar.value = Math.min(100, parseInt(volumeBar.value) + 10);
        audio.volume = volumeBar.value / 100;
        break;
      case "ArrowDown": // Volume Down
        event.preventDefault();
        volumeBar.value = Math.max(0, parseInt(volumeBar.value) - 10);
        audio.volume = volumeBar.value / 100;
        break;
    }
  });

  loadPlaylist();
  if (playlist.length > 0) {
    loadSong(currentIndex);
  } else {
    currentSongDisplay.textContent = "Thêm bài hát vào danh sách phát";
    albumArt.src = defaultAlbumArt;
  }
});
