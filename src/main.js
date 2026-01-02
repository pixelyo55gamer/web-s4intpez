import './style.css';

// Theme toggle logic
const htmlEl = document.documentElement;
const toggle = document.getElementById('theme-toggle');

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (toggle) toggle.checked = theme === 'dark';
}

setTheme(saved || (prefersDark ? 'dark' : 'light'));

if (toggle) {
  toggle.addEventListener('change', () => {
    setTheme(toggle.checked ? 'dark' : 'light');
  });
}

// Year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const ageEl = document.getElementById("age");

// Birth
const birthYear = 2007;
const birthMonth = 2;
const birthDay = 22;

function calcAge() {
  const today = new Date();
  let age = today.getFullYear() - birthYear;

  if (
    today.getMonth() + 1 < birthMonth ||
    (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)
  ) {
    age--;
  }

  return age;
}

if (ageEl) ageEl.textContent = calcAge();

const header = document.querySelector('header');
const navLinks = document.querySelectorAll('a[href^="#"]');

function smoothScrollTo(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

navLinks.forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
      history.pushState(null, '', href);
    }
  });
});

const sections = Array.from(document.querySelectorAll('section[id]'));
const linkById = new Map();
document.querySelectorAll('nav a[href^="#"]').forEach(a => {
  const id = a.getAttribute('href').slice(1);
  linkById.set(id, a);
});

const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = linkById.get(id);
    if (!link) return;
    if (entry.isIntersecting) {
      // ล้าง active ของทุกลิงก์ก่อน
      linkById.forEach(el => el.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, {
  // เล็งกลางจอ: ส่วนที่เข้า viewport 40% จะนับว่า active
  root: null,
  threshold: 0.4
});

sections.forEach(sec => obs.observe(sec));

const popup = document.getElementById("popup"); // Popup
const closeBtn = document.getElementById("closePopup");

// โผล่ popup หลังเข้าเว็บ 1 วิ
setTimeout(() => {
  popup.classList.remove("hidden");
}, 1000);

// ปิด popup
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

//bgmusic
const bgm = document.getElementById("bgm");
const toggleBtn = document.getElementById("toggleBgm");
const volumeSlider = document.getElementById("volumeSlider");

bgm.volume = volumeSlider.value;

let isPlaying = false;

// เปิด–ปิดเพลง
toggleBtn.addEventListener("click", () => {
  if (!isPlaying) {
    bgm.play();
  } else {
    bgm.pause();
  }
  isPlaying = !isPlaying;
});

// เลื่อนเสียง
volumeSlider.addEventListener("input", () => {
  bgm.volume = volumeSlider.value;
});


document.addEventListener("click", () => {
  bgm.muted = false;
  bgm.pause();
}, { once: true });

// date
function updateClock() {
  const now = new Date();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

updateClock();
setInterval(updateClock, 1000);

function createSnowflake() {
  const snow = document.createElement("i");
  snow.className = "fa-regular fa-snowflake snowflake";

  snow.style.left = Math.random() * window.innerWidth + "px";
  snow.style.fontSize = 5 + Math.random() * 6 + "px";
  snow.style.animationDuration = 8 + Math.random() * 6 + "s";
  snow.style.opacity = Math.random() * 0.6 + 0.2;

  document.getElementById("snow-container").appendChild(snow);

  setTimeout(() => snow.remove(), 18000);
}

setInterval(createSnowflake, 1800);
