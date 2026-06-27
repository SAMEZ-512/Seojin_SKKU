const nav = document.querySelector(".site-nav");
const menuButton = document.querySelector(".menu-button");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.classList.contains("course")) {
          const progress = entry.target.dataset.progress || 0;
          const bar = entry.target.querySelector(".bar i");
          if (bar) bar.style.width = `${progress}%`;
        }
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sections = Array.from(document.querySelectorAll("main section[id]"));
const links = Array.from(document.querySelectorAll(".site-nav a"));

function setActiveNav() {
  const current = sections
    .map((section) => {
      const rect = section.getBoundingClientRect();
      return {
        id: section.id,
        distance: Math.abs(rect.top - 110)
      };
    })
    .sort((a, b) => a.distance - b.distance)[0];

  if (!current) return;

  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
}

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("load", setActiveNav);

const storyData = {
  start: {
    title: "출발 · 공정에 대한 관심",
    text:
      "화학공학을 공부하며 반응 하나가 실제 제품과 공정으로 이어지는 과정에 흥미를 느꼈습니다. 이후 공정모사와 장치 제작 프로젝트를 통해 이론을 실제 시스템으로 연결하는 경험을 시작했습니다."
  },
  learn: {
    title: "배움 · 변수와 원인 분석",
    text:
      "열역학, 유체역학, 반응공학을 배우며 공정 결과는 하나의 원인이 아니라 여러 변수의 상호작용으로 결정된다는 점을 이해했습니다. 이를 바탕으로 프로젝트에서도 조건을 분리해 해석하려 노력했습니다."
  },
  expand: {
    title: "확장 · 실험과 시뮬레이션 연결",
    text:
      "DWSIM, COMSOL, SimScale, Arduino 기반 센서 데이터를 활용하며 시뮬레이션 결과와 실제 장치 거동을 함께 보는 시야를 넓혔습니다."
  },
  reflect: {
    title: "성찰 · 기록과 재현성",
    text:
      "프로젝트를 진행하며 좋은 결과만큼 중요한 것이 조건 기록과 재현성이라는 점을 배웠습니다. 앞으로는 실험 조건, 데이터 처리, 해석 과정을 더 체계적으로 문서화하고자 합니다."
  },
  future: {
    title: "미래 · 지속가능 공정 엔지니어",
    text:
      "공정모사, 제어, 촉매 반응 이해를 통합해 CO₂ 전환, SAF, 친환경 공정 최적화 분야에 기여하는 엔지니어로 성장하고자 합니다."
  }
};

const storyCard = document.getElementById("story-card");
document.querySelectorAll(".story-node").forEach((node) => {
  node.addEventListener("click", () => {
    document.querySelectorAll(".story-node").forEach((item) => item.classList.remove("active"));
    node.classList.add("active");

    const story = storyData[node.dataset.story];
    if (!story || !storyCard) return;

    storyCard.innerHTML = `<h3>${story.title}</h3><p>${story.text}</p>`;
  });
});
