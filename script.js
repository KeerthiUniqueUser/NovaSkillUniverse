const recommendedContainer = document.getElementById("recommended-container");

function loadRecommendedSkills() {
  const skills = [
    { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }
  ];

  recommendedContainer.innerHTML = "";
  const randomSkills = skills.sort(() => 0.5 - Math.random()).slice(0, 6);

  randomSkills.forEach(skill => {
    const card = document.createElement("div");
    card.classList.add("skill-card");

    card.innerHTML = `
      <img src="${skill.img}" alt="${skill.name}">
      <div class="skill-name">${skill.name}</div>
    `;

    recommendedContainer.appendChild(card);
  });
}

loadRecommendedSkills();
