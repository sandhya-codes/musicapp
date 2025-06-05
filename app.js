const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const seekBar = document.getElementById("seek-bar");

let currentSongIndex = 0;
let currentPlaylist = [];
let isPlaying = false;

const playlists = {
  chill: [
    { title: "Rainy Days",     artist: "Loera",     cover:  "https://marketplace.canva.com/EAFKAViaQJY/1/0/1600w/canva-red-light-bold-music-album-cover-art-nigKs4XQnyM.jpg",  src: "./song 1.mp3" },
    { title: "Evening Breeze", artist: "Yuma",      cover:  "https://static.vecteezy.com/system/resources/thumbnails/000/435/728/small_2x/1404.i033.096.S.m003.c10.Headphones_grunge.jpg" ,  src: "./song 4.mp3" },
    { title: "Push Harder",    artist: "Max Power", cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIHmYy4JrcYCACeB8O_rnshPYsBHcYQse89A&s", src: "./song 3.mp3" },
    { title: "Beast Mode",     artist: "GymBro",    cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFPly1gWM_zdPZO0loSBi8PZCnyDHmlBiaA&s", src: "song 2.mp3" },
    { title: "Push Harder",    artist: "Max Power", cover:  "https://i.pinimg.com/564x/0f/86/86/0f8686bb150302d8cfbf859dd71a6fe1.jpg", src: "song 6.mp3" },
    { title: "Beast Mode",     artist: "GymBro",    cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk5UBfY07IHruZnenyigeetHVnt4n3nK1GTw&s", src: "song 2.mp3" },
    { title: "Push Harder",    artist: "Max Power", cover:  "https://i.pinimg.com/736x/5e/01/3e/5e013ee6dd7e9d1e834716389366d82a.jpg", src: "song 1.mp3" },
    { title: "Beast Mode",     artist: "GymBro",    cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLtG58wuzpTplcfiHvOeAqjRaCtyd5egS31Q&s", src: "song 2.mp3" },
    { title: "Push Harder",    artist: "Max Power", cover:  "https://img.freepik.com/free-vector/gradient-album-cover-template_23-2150599887.jpg?semt=ais_hybrid&w=740", src: "song 1.mp3" },
    { title: "Beast Mode",     artist: "GymBro",    cover:  "https://i.pinimg.com/736x/7f/7b/07/7f7b07a0ca84d84abfb79f3b5452c8b5.jpg", src: "song 2.mp3" },
  ],
  workout: [
    { title: "Push Harder", artist: "Max Power", cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZULwDDhonc3WNkikCCAC0DfxmhQMl6CPcTw&s", src: "song 1.mp3" },
    { title: "Push Harder", artist: "Max Power", cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYNU_e5MqITeFg6igWCQvNhzwNvLAGjtBcw&s", src: "song 4.mp3" },
    { title: "Beast Mode",  artist:  "GymBro",   cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH5qoe5L6siVSDmD2Wm6-QMTp6Qzawmjrfg&s", src: "song 2.mp3" },
    { title: "Push Harder", artist: "Max Power", cover:"https://ew.com/thmb/HPW7ak6LMVRDhWW1umVHusmSrZc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Back-Together-08a0d9cade9a4adca3b1161ba918e329.jpg", src: "song 4.mp3" },
    { title: "Beast Mode",  artist: "GymBro",    cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqlrmFCBQ2PF6nc7KWsserv4SPqXan0jrQw&s", src: "song 8.mp3" },
    { title: "Push Harder", artist: "Max Power", cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrYQI6H4kghXIFvzc5Vd4Kr59hr2POpRydJg&s", src: "song 4.mp3" },
    { title: "Push Harder", artist: "Max Power", cover:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/workout-music-album-cover-design-template-7e781f1e4fa1c8671586a3ad3ef7d91e_screen.jpg?ts=1593032704", src: "song 2.mp3" },
    { title: "Push Harder", artist: "Max Power", cover:"./cover 1.png", src: "song 7.mp3" },
    { title: "Beast Mode",  artist: "GymBro",    cover:"https://i1.sndcdn.com/artworks-c5mzmp9GOGvVlA0M-lz0rPQ-t500x500.png", src: "song 8.mp3" },
    { title: "Beast Mode",  artist: "GymBro",    cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJi_88Fd2-l0QGXAB1c5XS-mkwWdVraFbScMForZsp5JcqbHt-BE7PBU9dYjPEGjC-Ldc&usqp=CAU", src: "song 8.mp3" }
  ],
  lofi: [
    { title: "Study Session", artist: "Lo-Fi Girl", cover:  "https://static-cse.canva.com/blob/2016052/1600w-fxYFTKLArdY.jpg", src: "song 8.mp3" },
    { title: "Night Chill",   artist: "Dreamz",     cover:  "./cover 4.png", src: "song 2.mp3" },
    { title: "Push Harder",   artist: "Max Power",  cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZvgblcQCWgJyx2NhtWmEFn-Wheg2MvpQKHw&s", src: "song 5.mp3" },
    { title: "Beast Mode",    artist: "GymBro",     cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiVnVBKBg_rUydsINcvkPwIYbZsOz2AysybA&s", src: "song 4.mp3" },
    { title: "Push Harder",   artist: "Max Power",  cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNuBsB44Ccan3d3WCKA-t9gmXy4IPVJisvA&s", src: "song 1.mp3" },
    { title: "Beast Mode",    artist: "GymBro",     cover:  "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a27d4d78716fd535d97a3483", src: "song 2.mp3" },
    { title: "Push Harder",   artist: "Max Power",  cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNHUp1upM18fCmkTvjc2RLV5_K8hMQHGS-Q&s", src: "song 1.mp3" },
    { title: "Beast Mode",    artist: "GymBro",     cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4V8i5gkoOe-rv7EAjeMn0RoOTbPBYeAiVvA&s", src: "song 2.mp3" },
    { title: "Push Harder",   artist: "Max Power",  cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDvhY2NK1e6XrAX7mJWHxwC2a42pRpwqyK0w&s", src: "song 1.mp3" },
    { title: "Beast Mode",    artist: "GymBro",     cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrht9ESS3Bxm5dSl-MGQ70f9biLQVhO13jqA&s", src: "song 2.mp3" },
    { title: "Push Harder",   artist: "Max Power",  cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTkHyVIl5lawencUuJCBndlon0VS9FrV--bA&s", src: "song 1.mp3" },
    { title: "Beast Mode",    artist: "GymBro",     cover:  "https://hellosamples.com/wp-content/uploads/edd/2023/10/HS-SP-LO-FI-GLOOMY-BEATS-COVER-FRONT.jpg", src: "song 2.mp3" },
    { title: "Push Harder",   artist: "Max Power",  cover:  "./cover 1.png", src: "song 1.mp3" },
    { title: "Beast Mode",    artist: "GymBro",     cover:  "./cover 6.png", src: "song 2.mp3" },
  ],
  top: [
    { title: "Chart Topper", artist: "Pop King", cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcodL0PrA8l_v1kfryQdVE5Leg6v8k2vLIyA&s", src: "song 1mp3" },
    { title: "No.1 Hit",     artist: "Queen B",  cover: "./cover 7.png",  src: "song 2.mp3" },
    { title: "Push Harder",  artist: "Max Power",cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwgg4NdAJYU2ztDQWtEY6tskL_QlAWiiAdiQ&s", src: "song 7.mp3" },
    { title: "Beast Mode",   artist: "GymBro",   cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREc3bsblOgj8rlbHUj0HMuxHOO5yb6hzp_qg&s", src: "song 6.mp3" },
    { title: "Push Harder",  artist: "Max Power",cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3mhVeYT5Yl5Ly-DLDviQtws8oL92jvHz4A&s", src: "song 5.mp3" },
    { title: "Beast Mode",   artist: "GymBro",   cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDA3lTtWCMkbQvX2T4bc4XYpq5eWYrWqOdQ&s", src: "song 3.mp3" },
    { title: "Push Harder",  artist: "Max Power",cover:  "https://i.pinimg.com/736x/2d/74/61/2d7461ec93a9d572f6b6620c3bb064ec.jpg", src: "song 8.mp3" },
    { title: "Beast Mode",   artist: "GymBro",   cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPuPMWHEer63Pf7PIAxNxNG331g_Qb8OvIbw&s", src: "song 1.mp3" },
    { title: "Push Harder",  artist: "Max Power",cover:  "https://cdn-images.dzcdn.net/images/cover/bbdae207d6e67c1aa6e1c235e1a8bc05/0x1900-000000-80-0-0.jpg", src: "song 5.mp3" },
    { title: "Beast Mode",   artist: "GymBro",   cover:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRofQmW4JWYFuIMnx2bebxHARd-TGBhWeG3R-cIzFlnkhyq3kZe128xacEorTOa219ipy0&usqp=CAU", src: "song 7.mp3" },
    { title: "Push Harder",  artist: "Max Power",cover:  "./cover 7.png", src: "song 4.mp3" },
    { title: "Beast Mode",   artist: "GymBro",   cover:  "./cover 8.png", src: "song 3.mp3" },
  ]

};

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  document.querySelector(".album-cover").src = song.cover;
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

audio.addEventListener("play", () => {
  isPlaying = true;
});

audio.addEventListener("pause", () => {
  isPlaying = false;
});

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  loadSong(currentPlaylist[currentSongIndex]);
  audio.play();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
  loadSong(currentPlaylist[currentSongIndex]);
  audio.play();
}

seekBar.addEventListener("input", () => {
  const time = (seekBar.value / 100) * audio.duration;
  audio.currentTime = time;
});

audio.addEventListener("timeupdate", () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100;
});

// Render Playlists
function renderPlaylist(playlistId, playlistKey) {
  const container = document.getElementById(playlistId);
  playlists[playlistKey].forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "song-item";
    div.innerHTML = `<img src="${song.cover}" alt=""><p>${song.title}</p>`;
    div.onclick = () => {
      currentPlaylist = playlists[playlistKey];
      currentSongIndex = index;
      loadSong(currentPlaylist[currentSongIndex]);
      audio.play();
    };
    container.appendChild(div);
  });
}

renderPlaylist("playlist-chill", "chill");
renderPlaylist("playlist-workout", "workout");
renderPlaylist("playlist-lofi", "lofi");
renderPlaylist("playlist-top", "top");



//  search bar
const searchInput = document.getElementById("search-input");

// Utility to render playlist rows
function renderPlaylistRow(playlistId, songs) {
  const container = document.getElementById(playlistId);
  container.innerHTML = ""; // Clear previous songs

  songs.forEach((song, index) => {
    const songElement = document.createElement("div");
    songElement.className = "song-card m-2 p-2 rounded glassmorphism text-center";
    songElement.style.width = "350px";
     
    songElement.innerHTML = `
      <img src="${song.cover}" alt="Cover" style="width:100%; border-radius: 10px;">
      <h6>${song.title}</h6>
      <p>${song.artist}</p>
      <button class="btn btn-sm btn-light mt-1" onclick="playFilteredSong('${song.title}', '${song.artist}', '${song.src}', '${song.cover}')">Play</button>
    `;
    container.appendChild(songElement);
  });
}

// Combined array of all songs
const allSongs = Object.values(playlists).flat();

// Handle search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allSongs.filter(song =>
    song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
  );

  // Optional: hide other sections or show a dedicated results container
  renderPlaylistRow("playlist-chill", filtered); // reuse one section for display
});

// Optional: play song directly from filtered list
function playFilteredSong(titleText, artistText, src, cover) {
  title.textContent = titleText;
  artist.textContent = artistText;
  audio.src = src;
  audio.play();
}


 