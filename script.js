function sendToAngel() {
  const input = document.getElementById("user-input").value;
  if (!input.trim()) return;

  const responseDiv = document.getElementById("response");
  responseDiv.innerText = "답변을 기다리는 중...";

  fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  })
    .then(res => res.json())
    .then(data => {
      responseDiv.innerText = data.reply;
      speak(data.reply);
      startCandleTimer();
    })
    .catch(err => {
      responseDiv.innerText = "천사에게 닿지 못했어요.";
    });
}

function startCandleTimer(duration = 180) {
  let timeLeft = duration;
  const body = document.getElementById("candle-body");

  const interval = setInterval(() => {
    timeLeft--;
    const percent = timeLeft / duration;
    body.style.height = `${200 * percent}px`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      endCounseling();
    }
  }, 1000);
}

function endCounseling() {
  document.getElementById("response").innerText = "양초가 모두 녹아 천사가 돌아갔어요.\n잠시 후 다시 불러주세요.";
  document.getElementById("user-input").disabled = true;

  setTimeout(() => {
    document.getElementById("user-input").disabled = false;
    document.getElementById("response").innerText = "";
    document.getElementById("candle-body").style.height = "200px";
  }, 10000);
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "ko-KR";
  speechSynthesis.speak(msg);
}

function save() {
  const user = document.getElementById("user-input").value;
  const response = document.getElementById("response").innerText;
  const blob = new Blob([`[고민]\n${user}\n\n[천사]\n${response}`], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "counseling.txt";
  a.click();
}
function summonAngel() {
  document.getElementById("welcome-section").style.display = "none";
  document.getElementById("counsel-section").style.display = "block";
}
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 1000 } },
    color: { value: "#fff8dd" },
    shape: { type: "circle" },
    opacity: {
      value: 0.2,
      random: true
    },
    size: {
      value: 1.2,
      random: true
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: "right",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});
