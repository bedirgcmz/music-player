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
const volumeIcon = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const musicListcontainer = document.querySelector("#music-list");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
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
  isPlayingNow();
};
const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? playMusic() : "";
  isPlayingNow();
};
const pauseMusic = () => {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};
const playMusic = () => {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
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

let muteState = "loud";
let currentVolume;
volumeIcon.addEventListener("click", () => {
  if (muteState === "loud") {
    currentVolume = volumeBar.value;
    audio.muted = true;
    muteState = "silent";
    volumeIcon.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = "loud";
    volumeIcon.classList = "fa-solid fa-volume-high";
    volumeBar.value = currentVolume;
  }
});

volumeBar.addEventListener("input", (e) => {
  const volumeLevel = e.target.value;
  audio.volume = volumeLevel / 100;
  if (volumeLevel == 0) {
    audio.muted = true;
    muteState = "silent";
    volumeIcon.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    muteState = "loud";
    volumeIcon.classList = "fa-solid fa-volume-high";
  }
});

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
          <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
              <span>${list[i].getName()}</span>
              <span id="music-${i}" class="badge rounded-pill"></span>
              <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
          </li>
      `;

    musicListcontainer.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = musicListcontainer.querySelector(`#music-${i}`);
    let liAudioTag = musicListcontainer.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateDuration(liAudioTag.duration);
    });
  }
};

const selectedMusic = (pSelectedSing) => {
  player.index = pSelectedSing.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of musicListcontainer.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended", () => {
  nextMusic();
});
