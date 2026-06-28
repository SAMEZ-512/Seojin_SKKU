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
    title: "출발 · 자연과학계열에서 시작한 대학생활",
    text:
      "2021년 성균관대학교 자연과학계열에 입학하며 폭넓은 기초과학 학습과 함께 대학생활을 시작했습니다. 1학년에는 학생봉사대 다소미 26기로 활동하며 봉사와 기획, 사람들과 협업하는 경험을 쌓았습니다."
  },
  learn: {
    title: "배움 · 식품생명공학과에서 전공의 기반을 다지다",
    text:
      "2022년 식품생명공학과에 진학해 생명공학, 식품공학, 실험 기반 전공 학습을 이어갔습니다. 동시에 학과 학생회 활동을 통해 학과 공동체 운영과 홍보, 행사 기획을 경험했습니다."
  },
  expand: {
    title: "확장 · 화학공학 복수전공과 연구 경험",
    text:
      "2025년 화학공학과 복수전공을 시작하며 공정, 촉매, 에너지 전환 분야로 관심을 확장했습니다. SAF 공정모사, CO₂ 전환 촉매 합성, 음식물 처리기 디지털 트윈 연구를 수행하며 전공 간 연결 가능성을 탐구했습니다."
  },
  reflect: {
    title: "성찰 · 리더십과 연구를 함께 경험하며",
    text:
      "식품생명공학과 학생회장으로 활동하며 구성원과 소통하고 일을 끝까지 운영하는 책임감을 배웠습니다. 연구 프로젝트에서는 조건 기록, 실험 재현성, 데이터 기반 해석의 중요성을 체감했습니다."
  },
  future: {
    title: "미래 · 지속가능 공정과 CO₂ 전환 연구로",
    text:
      "현재 KIST에서 전기화학적 CO₂ 포집·전환 기술 연구를 수행하며 지속가능한 탄소 전환 기술에 대한 관심을 구체화하고 있습니다. 앞으로 공학적 관점을 바탕으로 문제를 넓게 보고 해결하는 엔지니어로 성장하고자 합니다."
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

const copyEmailButton = document.getElementById("copy-email");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;
    const label = copyEmailButton.querySelector("span");
    const originalText = label ? label.textContent : "Email 복사";

    try {
      await navigator.clipboard.writeText(email);

      if (label) label.textContent = "복사됨!";
      copyEmailButton.classList.add("copied");

      setTimeout(() => {
        if (label) label.textContent = originalText;
        copyEmailButton.classList.remove("copied");
      }, 1600);
    } catch (error) {
      if (label) label.textContent = email;
    }
  });
}
