// Only a little JavaScript here. The rest of the site is HTML and CSS.
(() => {
  const d = document,
    root = d.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  // light/dark button, remembers the choice
  const themeBtn = d.querySelector(".theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (err) {}
    });
  }

  // menu button on phones
  const menuBtn = d.querySelector(".menu-btn");
  const navList = d.getElementById("nav-list");
  function closeMenu() {
    if (!navList) return;
    navList.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", navList.classList.toggle("open"));
    });
    navList.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });
    d.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // copy email buttons
  d.querySelectorAll(".copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const label = btn.querySelector(".copy-label");
      const original = label.textContent;
      try {
        await navigator.clipboard.writeText(btn.dataset.email);
        label.textContent = "Copied";
      } catch (err) {
        label.textContent = "Copy failed, select the address";
      }
      setTimeout(() => {
        label.textContent = original;
      }, 2000);
    });
  });

  // print button on the resume page
  d.querySelectorAll(".print-btn").forEach((btn) =>
    btn.addEventListener("click", () => print()),
  );

  // experience filter
  const chips = d.querySelectorAll(".chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", c === chip));
      d.querySelectorAll("[data-cat]").forEach((item) => {
        item.hidden = !(
          chip.dataset.filter === "all" ||
          item.dataset.cat === chip.dataset.filter
        );
      });
    });
  });

  // count the marks up from zero
  function countUp(el) {
    if (reduced) return;
    const target = +el.dataset.to,
      decimals = +el.dataset.dec,
      suffix = el.dataset.suffix || "";
    let start;
    function step(now) {
      start = start || now;
      const t = Math.min((now - start) / 1200, 1);
      el.textContent =
        (target * (1 - Math.pow(1 - t, 3))).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // fade sections in when they appear
  const seen = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        entry.target.querySelectorAll(".num").forEach(countUp);
        seen.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );
  d.querySelectorAll(".reveal").forEach((el) => seen.observe(el));

  // back to top button
  const top = d.createElement("button");
  top.type = "button";
  top.className = "to-top no-print";
  top.setAttribute("aria-label", "Back to top");
  top.innerHTML =
    '<svg class="icon" aria-hidden="true"><use href="#i-up"/></svg>';
  top.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }),
  );
  d.body.append(top);

  // F1 car: --p is how far down the page you are (0 to 1)
  const f1 = d.querySelector(".f1");
  function onScroll() {
    const max = root.scrollHeight - root.clientHeight || 1;
    if (f1) f1.style.setProperty("--p", Math.min(1, root.scrollTop / max));
    top.classList.toggle("show", root.scrollTop > 700);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Intros play once per page load. Only the visible Skip control ends them early.
  const lengths = { bell: 5200, stars: 7500, voyage: 7600, about: 4800 };
  const intros = d.querySelectorAll("[data-intro]");
  intros.forEach((box) => {
    let timer;
    const finish = () => {
      if (box.classList.contains("intro-done")) return;
      clearTimeout(timer);
      box.closest("main")?.classList.add("intro-skipped");
      box.classList.add("intro-done");
    };
    timer = setTimeout(finish, lengths[box.dataset.intro] || 6000);
    const skip = box.querySelector(".skip-intro");
    if (skip) skip.addEventListener("click", finish);
  });

  // footer button to switch the intros off or on
  const foot = d.querySelector(".foot");
  if (intros.length && foot) {
    const btn = d.createElement("button");
    btn.type = "button";
    btn.className = "foot-btn no-print";
    const setLabel = () => {
      btn.textContent = root.classList.contains("no-intro")
        ? "Turn intros on"
        : "Turn intros off";
    };
    setLabel();
    btn.addEventListener("click", () => {
      const off = root.classList.toggle("no-intro");
      try {
        localStorage.setItem("intros", off ? "off" : "on");
      } catch (err) {}
      setLabel();
    });
    foot.append(btn);
  }

  // show initials if the photo is missing
  d.querySelectorAll(".portrait img").forEach((img) => {
    function swap() {
      const box = d.createElement("div");
      box.className = "initials";
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", "Portrait unavailable");
      box.textContent = "AP";
      img.replaceWith(box);
    }
    if (img.complete && !img.naturalWidth) swap();
    else img.addEventListener("error", swap);
  });
})();
