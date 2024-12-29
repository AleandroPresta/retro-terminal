document.addEventListener("DOMContentLoaded", function () {
    const loadingBar = document.querySelector(".loading-bar");
    let segments = 0;
    const interval = setInterval(() => {
        segments += 1;
        loadingBar.style.width = `${segments * 20}%`; // 100% / 5 segments
        if (segments === 5) {
            clearInterval(interval);
        }
    }, 1000); // 1 second
});
