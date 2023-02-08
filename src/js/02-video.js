import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_TIME_KEY = 'videoplayer-current-time';

const currentTime = player.on('timeupdate', throttle(onPlay, 1000));
resumePlay();

function onPlay(data) {
  localStorage.setItem(STORAGE_TIME_KEY, data.seconds);
}

function resumePlay() {
  const currentTime = localStorage.getItem(STORAGE_TIME_KEY);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}
