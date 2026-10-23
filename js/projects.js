(() => {
  const toggle = document.querySelector("[data-theme-toggle]");
  try {
    if (localStorage.getItem("nuzcode-theme") === "light")
      document.body.classList.add("light");
  } catch (e) {}
  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    try {
      localStorage.setItem(
        "nuzcode-theme",
        document.body.classList.contains("light") ? "light" : "dark",
      );
    } catch (e) {}
  });

  const viewer = document.querySelector("[data-storybook]");
  if (!viewer) return;

  const assetPath =
    "../../../assets/images/projects/millies-little-umbrella/";
  const pages = [
    { label: "Front cover", src: `${assetPath}cover-front.png` },
    { label: "Page 1", src: `${assetPath}spread-1-left.png` },
    { label: "Page 2", src: `${assetPath}spread-2-left.png` },
    { label: "Page 3", src: `${assetPath}spread-3-left.png` },
    { label: "Page 4", src: `${assetPath}spread-4-left.png` },
    { label: "Page 5", src: `${assetPath}spread-4-right.png` },
    { label: "Page 6", src: `${assetPath}spread-3-right.png` },
    { label: "Page 7", src: `${assetPath}spread-2-right.png` },
    { label: "Page 8", src: `${assetPath}spread-1-right.png` },
    { label: "Back cover", src: `${assetPath}cover-back.png` },
    { label: "Blank page", src: null },
  ];

  const leftImage = viewer.querySelector("[data-book-left]");
  const rightImage = viewer.querySelector("[data-book-right]");
  const spread = viewer.querySelector(".book-spread");
  const leaf = viewer.querySelector("[data-book-leaf]");
  const frontImage = viewer.querySelector("[data-book-front]");
  const backImage = viewer.querySelector("[data-book-back]");
  const status = viewer.querySelector("[data-book-status]");
  const prevButton = viewer.querySelector("[data-book-prev]");
  const nextButton = viewer.querySelector("[data-book-next]");

  let rightPageIndex = 0;
  let isTurning = false;

  const setPage = (image, page) => {
    image.classList.toggle("book-blank", !page.src);
    image.style.visibility = page.src ? "" : "hidden";
    image.alt = page.src ? page.label : "";
    if (page.src) {
      image.src = page.src;
    } else {
      image.removeAttribute("src");
    }
  };

  const render = () => {
    setPage(leftImage, pages[rightPageIndex - 1] || pages[pages.length - 1]);
    setPage(rightImage, pages[rightPageIndex]);
    status.textContent =
      rightPageIndex === 0
        ? "Front cover"
        : `${pages[rightPageIndex - 1].label} · ${pages[rightPageIndex].label}`;
    prevButton.disabled = rightPageIndex === 0;
    nextButton.disabled = rightPageIndex + 2 >= pages.length;
  };

  const turn = (direction) => {
    if (isTurning) return;
    const nextRightIndex = rightPageIndex + direction * 2;
    if (nextRightIndex < 0 || nextRightIndex >= pages.length) return;

    isTurning = true;
    prevButton.disabled = true;
    nextButton.disabled = true;

    if (direction > 0) {
      setPage(leftImage, pages[rightPageIndex + 1]);
      setPage(rightImage, pages[rightPageIndex + 2]);
      setPage(frontImage, pages[rightPageIndex]);
      setPage(backImage, pages[rightPageIndex + 1]);
      leaf.classList.remove("turning-backward");
      spread.classList.remove("is-turning-backward");
      spread.classList.add("is-turning-forward");
      leaf.classList.add("turning-forward");
    } else {
      setPage(leftImage, pages[rightPageIndex - 3] || pages[pages.length - 1]);
      setPage(rightImage, pages[rightPageIndex - 2]);
      setPage(frontImage, pages[rightPageIndex - 1]);
      setPage(backImage, pages[rightPageIndex - 2]);
      leaf.classList.remove("turning-forward");
      spread.classList.remove("is-turning-forward");
      spread.classList.add("is-turning-backward");
      leaf.classList.add("turning-backward");
    }
  };

  leaf.addEventListener("animationend", (event) => {
    if (event.target !== leaf) return;
    rightPageIndex += leaf.classList.contains("turning-forward") ? 2 : -2;
    leaf.classList.remove("turning-forward", "turning-backward");
    spread.classList.remove("is-turning-forward", "is-turning-backward");
    render();
    isTurning = false;
  });

  prevButton.addEventListener("click", () => {
    if (rightPageIndex > 0) {
      turn(-1);
    }
  });

  nextButton.addEventListener("click", () => {
    if (rightPageIndex + 2 < pages.length) {
      turn(1);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!viewer.contains(document.activeElement)) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevButton.click();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextButton.click();
    }
  });

  render();
})();
