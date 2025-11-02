const skillInput = document.getElementById("skillName");
const levelSelect = document.getElementById("skillLevel");
const addSkillBtn = document.getElementById("addSkillBtn");
const solarSystem = document.getElementById("solarSystem");
const recommendation = document.getElementById("recommendation");

let skills = [];

addSkillBtn.addEventListener("click", () => {
  const name = skillInput.value.trim();
  const level = levelSelect.value;
  if (!name) return alert("Enter a skill name!");
  skills.push({ name, level });
  renderSkills();
  skillInput.value = "";
  recommendation.textContent = suggestNextSkill();
});

function renderSkills() {
  solarSystem.querySelectorAll(".orbit").forEach((o) => o.remove());

  const grouped = {
    Beginner: skills.filter((s) => s.level === "Beginner"),
    Intermediate: skills.filter((s) => s.level === "Intermediate"),
    Advanced: skills.filter((s) => s.level === "Advanced"),
  };

  const levelOrder = ["Beginner", "Intermediate", "Advanced"];
  const baseRadius = 80;
  const radiusStep = 80;

  levelOrder.forEach((level, idx) => {
    if (grouped[level].length === 0) return;

    const orbitRadius = baseRadius + idx * radiusStep;
    const orbit = document.createElement("div");
    orbit.classList.add("orbit");
    orbit.style.width = orbitRadius * 2 + "px";
    orbit.style.height = orbitRadius * 2 + "px";
    orbit.style.animationDuration = `${8 + idx * 3}s`;

    const total = grouped[level].length;
    grouped[level].forEach((skill, i) => {
      const planet = document.createElement("div");
      planet.classList.add("planet");
      planet.dataset.level = level;

      // Position planet along the orbit
      const angle = (i / total) * 2 * Math.PI;
      const x = orbitRadius * Math.cos(angle);
      const y = orbitRadius * Math.sin(angle);
      planet.style.top = `calc(50% + ${y}px)`;
      planet.style.left = `calc(50% + ${x}px)`;

      const label = document.createElement("div");
      label.classList.add("skill-label");
      label.textContent = skill.name;
      planet.appendChild(label);

      orbit.appendChild(planet);
    });

    solarSystem.appendChild(orbit);
  });
}

function suggestNextSkill() {
  if (skills.length === 0) return "Start adding your first skill!";
  const skillMap = {
    HTML: "CSS",
    CSS: "JavaScript",
    JavaScript: "React",
    React: "Node.js",
    Node: "MongoDB",
    Python: "Flask",
    SQL: "Database Design",
  };
  for (let s of skills) {
    if (skillMap[s.name]) return skillMap[s.name];
  }
  return "You're all caught up!";
}
