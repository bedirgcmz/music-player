const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const audio = document.querySelector("#audio");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();

  displayMusic(music);
});

const displayMusic = (pMusic) => {
  title.innerText = pMusic.getName();
  singer.innerText = pMusic.singer;
  image.src = "img/" + pMusic.img;
  audio.src = "mp3/" + pMusic.file;
};

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();

  console.log(isMusicPlay);
});

const pauseMusic = () => {
  container.classList.remove("playing");
  audio.pause();
};

const playMusic = () => {
  container.classList.add("playing");
  audio.play();
};
