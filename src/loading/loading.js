class LoadingComponent {
    constructor(container) {
        this.container = container;
        this.loadingUrl = "src/loading/loading.html";
        this.isLoadingFinished = false;
    }

    async initialize() {
        try {
            const response = await fetch(this.loadingUrl);
            if (!response.ok) {
                throw new Error(`Error fetching at ${this.loadingUrl}`);
            }
            const html = await response.text();
            this.container.innerHTML = html;
        } catch (error) {
            console.error("Failed to fetch loading.html:", error);
            this.container.innerHTML =
                "<p>Error loading loading screen. Please try again later.</p>";
        }
        console.log("Initializing loading bar");
        this.initializeLoadingBar();
        console.log("Loading bar initialized");
    }

    initializeLoadingBar() {
        const loadingBar = document.querySelector(".loading-bar");
        let segments = 0;
        const interval = setInterval(() => {
            console.log("Loading segment", segments);
            segments += 1;
            loadingBar.style.width = `${segments * 20}%`; // 100% / 5 segments
            if (segments === 5) {
                clearInterval(interval);
                this.isLoadingFinished = true;
                // Dispatch custom event
                document.dispatchEvent(new CustomEvent('loadingFinished'));
            }
        }, 1000); // 1 second
    }
}
export default LoadingComponent;
