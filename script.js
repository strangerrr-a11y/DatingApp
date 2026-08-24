const noBtn = document.getElementById("no");
const area = document.getElementById("buttons");

function moveNo(){
  const areaRect = area.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, areaRect.width - btnRect.width);
  const maxY = Math.max(0, areaRect.height - btnRect.height);

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
  noBtn.style.transform = `rotate(${(Math.random()*18)-9}deg)`;
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", moveNo);

function acceptDate(){
  document.getElementById("success").style.display = "flex";

  for(let i=0;i<35;i++){
    const s = document.createElement("span");
    s.textContent = ["❤️","💗","🌸","✨","💐"][Math.floor(Math.random()*5)];
    s.style.position = "fixed";
    s.style.left = Math.random()*100 + "vw";
    s.style.top = (60+Math.random()*20) + "vh";
    s.style.fontSize = (18+Math.random()*28) + "px";
    s.style.zIndex = 20;
    s.style.transition = "transform 2.2s ease-out,opacity 2.2s";

    document.body.appendChild(s);

    setTimeout(()=>{
      s.style.transform =
        `translateY(-${300+Math.random()*500}px) rotate(${Math.random()*360}deg)`;
      s.style.opacity = 0;
    },30);

    setTimeout(()=>s.remove(),2400);
  }
}

function showPlan(){
  document.getElementById("yesScreen").style.display = "none";
  document.getElementById("planScreen").style.display = "block";
}

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const placeInput = document.getElementById("place");

function updatePlan(){
  const d = dateInput.value;
  const t = timeInput.value;
  const place = placeInput.value.trim();

  const dateText = d
    ? new Date(d+"T00:00").toLocaleDateString(undefined,{
        weekday:"long",day:"numeric",month:"long",year:"numeric"
      })
    : "your chosen day";

  const timeText = t
    ? new Date("1970-01-01T"+t).toLocaleTimeString(undefined,{
        hour:"numeric",minute:"2-digit"
      })
    : "your chosen time";

  const placeText = place || "somewhere you like";

  document.getElementById("planPreview").innerHTML =
    "💌 <b>"+dateText+"</b><br>🕐 <b>"+timeText+"</b><br>📍 <b>"+placeText+"</b>";
}

[dateInput,timeInput,placeInput].forEach(x => x.addEventListener("input",updatePlan));

function confirmDate(){
  const confirmed = document.getElementById("confirmed");

  if(!dateInput.value || !timeInput.value || !placeInput.value.trim()){
    confirmed.style.display = "block";
    confirmed.textContent =
      "Almost there 😊 Please choose the date, time and place.";
    return;
  }

  const d = new Date(dateInput.value+"T00:00");
  const dateText = d.toLocaleDateString(undefined,{
    weekday:"long",day:"numeric",month:"long",year:"numeric"
  });
  const timeText = new Date("1970-01-01T"+timeInput.value)
    .toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});

  confirmed.style.display = "block";
  const placeText = placeInput.value.trim();

  confirmed.style.display = "block";
  confirmed.innerHTML =
    "💕 DATE CONFIRMED!<br>" +
    dateText + " · " + timeText + " · " + placeText +
    "<br><span style='font-weight:normal'>" +
    "Excellent choice, Madam. Your date has been successfully booked. 😂❤️<br>" +
    "Opening WhatsApp… 💬" +
    "</span>";

  // Send the selected details to the user's WhatsApp number.
  const message =
    "💕 Shital has confirmed the date!\\n\\n" +
    "📅 Date: " + dateText + "\\n" +
    "🕐 Time: " + timeText + "\\n" +
    "📍 Place: " + placeText + "\\n\\n" +
    "❤️ She said YES! Looks like we have a date. 😂🌷";

  const whatsappNumber = "919525230266";
  const whatsappUrl =
    "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
  }, 700);
}
