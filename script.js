const noBtn = document.getElementById("no");
const area = document.getElementById("buttons");

// Custom Alert Functions
let alertCallback = null;

function showCustomAlert(title, message, callback) {
  alertCallback = callback;
  document.getElementById("alertTitle").textContent = title;
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("customAlert").classList.add("show");
}

function closeCustomAlert() {
  document.getElementById("customAlert").classList.remove("show");
}

// Alert button listeners
document.getElementById("alertYes").addEventListener("click", () => {
  closeCustomAlert();
  if (alertCallback) alertCallback(true);
});

// Close alert when clicking outside
document.getElementById("customAlert").addEventListener("click", (e) => {
  if (e.target.id === "customAlert") {
    closeCustomAlert();
    if (alertCallback) alertCallback(false);
  }
});

function moveNo() {
  const areaRect = area.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, areaRect.width - btnRect.width);
  const maxY = Math.max(0, areaRect.height - btnRect.height);

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
  noBtn.style.transform = `rotate(${Math.random() * 5 - 2.5}deg) scale(1.05)`;
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", moveNo);

function acceptDate() {
  showCustomAlert(
    "Are You Sure? 💕",
    "Is this guy really worth a date? 😂",
    (confirmed) => {
      if (!confirmed) return;
      
      document.getElementById("success").style.display = "flex";

      for (let i = 0; i < 35; i++) {
        const s = document.createElement("span");
        s.textContent = ["❤️", "💗", "🌸", "✨", "💐"][
          Math.floor(Math.random() * 5)
        ];
        s.style.position = "fixed";
        s.style.left = Math.random() * 100 + "vw";
        s.style.top = 60 + Math.random() * 20 + "vh";
        s.style.fontSize = 18 + Math.random() * 28 + "px";
        s.style.zIndex = 20;
        s.style.transition = "transform 3s ease-out,opacity 2.2s";

        document.body.appendChild(s);

        setTimeout(() => {
          s.style.transform = `translateY(-${300 + Math.random() * 500}px) rotate(${Math.random() * 360}deg)`;
          s.style.opacity = 0;
        }, 10);

        setTimeout(() => s.remove(), 2400);
      }
    }
  );
}

function showPlan() {
  document.getElementById("yesScreen").style.display = "none";
  document.getElementById("planScreen").style.display = "block";
}

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const placeInput = document.getElementById("place");
const foodInput = document.getElementById("food");

function updatePlan() {
  const d = dateInput.value;
  const t = timeInput.value;
  const place = placeInput.value.trim();

  const dateText = d
    ? new Date(d + "T00:00").toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "your chosen day";

  const timeText = t
    ? new Date("1970-01-01T" + t).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      })
    : "your chosen time";

  const placeText = place || "somewhere you like";

  document.getElementById("planPreview").innerHTML =
    "💌 <b>" +
    dateText +
    "</b><br>🕐 <b>" +
    timeText +
    "</b><br>📍 <b>" +
    placeText +
    "</b>";
}

[dateInput, timeInput, placeInput, foodInput].forEach((x) =>
  x.addEventListener("input", updatePlan),
);

function confirmDate() {
  const confirmed = document.getElementById("confirmed");

  if (
    !dateInput.value ||
    !timeInput.value ||
    !placeInput.value.trim() ||
    !foodInput.value
  ) {
    confirmed.style.display = "block";
    confirmed.textContent =
      "Almost there 😊 Please choose the date, time, place and food.";
    return;
  }

  const d = new Date(dateInput.value + "T00:00");
  const dateText = d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeText = new Date("1970-01-01T" + timeInput.value).toLocaleTimeString(
    undefined,
    { hour: "numeric", minute: "2-digit" },
  );
  const placeText = placeInput.value.trim();
  const foodText = foodInput.value;

  confirmed.style.display = "block";
  confirmed.innerHTML =
    "💕 DATE CONFIRMED!<br>" +
    dateText +
    " · " +
    timeText +
    " · " +
    placeText +
    " · " +
    foodText +
    "<br><span style='font-weight:normal'>Excellent choice, Madam. Your date has been successfully booked. 😂❤️<br>Sending your confirmation… 📧</span>";

  document.getElementById("mailDate").value = dateText;
  document.getElementById("mailTime").value = timeText;
  document.getElementById("mailPlace").value = placeText;
  document.getElementById("mailFood").value = foodText;
  document.getElementById("emailForm").submit();

  // Show Thank You screen
  setTimeout(() => {
    document.getElementById("planScreen").style.display = "none";
    document.getElementById("thankYouScreen").style.display = "block";

    // 3.5 seconds later → back to home
    setTimeout(() => {
      document.getElementById("success").style.display = "none";

      document.getElementById("thankYouScreen").style.display = "none";

      // Reset and go back to front page
      document.getElementById("success").style.display = "none";
      document.getElementById("introPage").style.display = "flex";
      document.getElementById("introPage").classList.remove("open");

      // Reset form inputs
      dateInput.value = "";
      timeInput.value = "";
      placeInput.value = "";
      foodInput.value = "";
      document.getElementById("planPreview").innerHTML = "Choose your date, time, place and food ✨";

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 5000);
  }, 1500);
}
