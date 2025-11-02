const addSkillBtn = document.getElementById("addSkillBtn");
const orbitContainer = document.querySelector(".orbit-container");

addSkillBtn.addEventListener("click", () => {
  const skillName = document.getElementById("skillInput").value.trim();
  const level = document.getElementById("levelSelect").value;
  if (!skillName) return;

  // Orbit distance based on level
  let orbitRadius;
  switch (level) {
    case "Beginner":
      orbitRadius = 120;
      break;
    case "Intermediate":
      orbitRadius = 200;
      break;
    case "Advanced":
      orbitRadius = 280;
      break;
    default:
      orbitRadius = 150;
  }

  // Create planet container (this will rotate)
  const planetOrbit = document.createElement("div");
  planetOrbit.classList.add("planet-orbit");
  planetOrbit.style.width = `${orbitRadius * 2}px`;
  planetOrbit.style.height = `${orbitRadius * 2}px`;
  planetOrbit.style.animationDuration = `${8 + orbitRadius / 20}s`; // slower for outer planets

  // Create planet itself
  const planet = document.createElement("div");
  planet.classList.add("planet");

  // Color by level
  if (level === "Beginner") planet.style.background = "#4ecdc4";
  else if (level === "Intermediate") planet.style.background = "#ffcc00";
  else planet.style.background = "#ff4d4d";

  // Add label above planet
  const label = document.createElement("span");
  label.classList.add("planet-label");
  label.textContent = skillName;

  planet.appendChild(label);
  planetOrbit.appendChild(planet);
  orbitContainer.appendChild(planetOrbit);
});

// Add CSS for real orbit rotation
const style = document.createElement("style");
style.textContent = `
.orbit-container {
  position: relative;
  width: 600px;
  height: 600px;
  margin: auto;
  border-radius: 50%;
}

.sun {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #ffcc00, #ff9900);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 40px #ffcc00;
}

/* Orbit rotation wrapper */
.planet-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px dashed rgba(255,255,255,0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: rotateOrbit linear infinite;
}

@keyframes rotateOrbit {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Planet inside orbit */
.planet {
  position: absolute;
  top: 50%;
  left: 100%; /* start at right side of orbit */
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255,255,255,0.5);
}

.planet-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: white;
  white-space: nowrap;
}
`;
document.head.appendChild(style);
// ===========================
// 💬 SkillOrbit Chatbot Logic
// ===========================
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

// Toggle chatbot visibility
chatbotToggle.addEventListener("click", () => {
  chatbotContainer.style.display =
    chatbotContainer.style.display === "flex" ? "none" : "flex";
});

// Append message to chat window
function addMessage(text, isUser = false) {
  const msg = document.createElement("div");
  msg.classList.add("chatbot-msg");
  if (isUser) msg.classList.add("chatbot-user");
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Simple mock AI logic
function aiResponse(question) {
  question = question.toLowerCase();

  if (question.includes("python"))
    return "🐍 Python is great for data science, AI, and web dev. Try learning Flask or Django next!";
  if (question.includes("java"))
    return "☕ Java is perfect for backend and Android development. You can explore Spring Boot!";
  if (question.includes("react"))
    return "⚛️ React helps you build interactive UIs. You can pair it with Node.js for full stack projects!";
  if (question.includes("how"))
    return "🧠 Try breaking your question into smaller parts — I can help explain syntax, frameworks, or concepts!";
  if (question.includes("help"))
    return "🚀 Sure! I can explain topics like JavaScript, Python, or Git. Just ask your question.";

  const randomReplies = [
    "🌟 Keep learning, your skills are leveling up!",
    "💡 Try combining what you’ve learned in a small project.",
    "🪐 Learning is an orbit — keep revolving around new skills!",
    "🔥 Great question! Try exploring documentation for deeper understanding.",
  ];

  return randomReplies[Math.floor(Math.random() * randomReplies.length)];
}

// Handle send click
chatbotSend.addEventListener("click", () => {
  const userText = chatbotInput.value.trim();
  if (!userText) return;

  addMessage(userText, true);
  chatbotInput.value = "";

  setTimeout(() => {
    const reply = aiResponse(userText);
    addMessage(reply);
  }, 700);
});

// Press Enter to send
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") chatbotSend.click();
});
