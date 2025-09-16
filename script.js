// 🎵 SONG DATABASE
const songs = [
  { name: "Bang Bang Bang", src: "Bang-Bang-Bang.mp3", img: "Anjaan.jpg" },
  { name: "Kadhal Cricket", src: "Kadhal-Cricket.mp3", img: "kadhal.jpg" },
  { name: "Kandu Pudichen", src: "Kandu Pudichen [TamilDaDa.Info].mp3", img: "kand.jpg" },
  { name: "VIP Title Song", src: "VIP-Title-Song.mp3", img: "imgv.jpg" },
  { name: "What a Karavaad", src: "What-a-Karavaad.mp3", img: "vip.jpg" },
  { name: "Yaarum Illa", src: "Yaarum-illa-MassTamilan.dev.mp3", img: "naney.jpg" },
  { name: "Jalsa-Pannungada", src: "Jalsa-Pannungada.mp3", img: "chenai.jpg" },
  { name: "Kaasumela", src: "Kaasumela-MassTamilan.com.mp3", img: "kasu.jpg" },
  { name: "Kanave Nee Naan", src: "Kanave Nee Naan - Masstamilan.In.mp3", img: "kanaey.jpg" },
  { name: "Kanja-Poovu-Kannala", src: "Kanja-Poovu-Kannala-MassTamilan.dev.mp3", img: "viruman.jpg" },
  { name: "Kaadhal-Vanthirichu", src: "Kaadhal-Vanthirichu-MassTamilan.com.mp3", img: "kadhalvan.jpg" }
];

const songGrid = document.getElementById("songGrid");
const searchInput = document.getElementById("searchInput");
const musicPlayer = document.getElementById("musicPlayer");
const audioPlayer = document.getElementById("audioPlayer");
const currentSong = document.getElementById("currentSong");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Render songs dynamically
function renderSongs(filter = "") {
  songGrid.innerHTML = "";
  songs
    .filter(song => song.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((song, index) => {
      const card = document.createElement("div");
      card.classList.add("song-card");
      card.innerHTML = `
        <img src="${song.img}" alt="${song.name}">
        <div class="song-name">${song.name}</div>
      `;
      card.addEventListener("click", () => playSong(index));
      songGrid.appendChild(card);
    });
}

// Play selected song
function playSong(index) {
  currentIndex = index;
  document.querySelectorAll(".song-card").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".song-card")[index].classList.add("active");

  audioPlayer.src = songs[index].src;
  currentSong.textContent = "Now Playing: " + songs[index].name;
  musicPlayer.style.display = "flex";
  audioPlayer.play();
}

// Next / Previous functionality
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
});

// Auto play next song when one ends
audioPlayer.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
});

// Search filter
searchInput.addEventListener("keyup", () => {
  renderSongs(searchInput.value);
});

// Initial render
renderSongs();
