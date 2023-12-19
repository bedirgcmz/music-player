const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const audio = document.querySelector("#audio");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const play = document.querySelector("#controls #play");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");

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

prev.addEventListener("click", () => {
  prevMusic();
});
next.addEventListener("click", () => {
  nextMusic();
});

const prevMusic = () => {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? playMusic() : "";
};
const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? playMusic() : "";
};
const pauseMusic = () => {
  container.classList.remove("playing");
  play.classList = "fa-solid fa-play";
  audio.pause();
};
const playMusic = () => {
  container.classList.add("playing");
  play.classList = "fa-solid fa-pause";
  audio.play();
};
const calculateDuration = (totalSecond) => {
  const second = Math.floor(totalSecond % 60);
  const min = Math.floor(totalSecond / 60);
  const controlSecond = second < 10 ? `0${second}` : second;
  const result = `${min}:${controlSecond}`;
  return result;
};
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateDuration(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateDuration(audio.currentTime);
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateDuration(progressBar.value);
  audio.currentTime = progressBar.value;
});
