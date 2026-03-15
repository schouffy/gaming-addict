async function getFirstVideo(query) {

    const API_KEY = "REDACTED";

    const url =
        `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&type=video&maxResults=1&q=` +
        encodeURIComponent(query) +
        `&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.items[0].id.videoId;
}

function move(e) {
    if (!isDragging) return;

    container.style.left = e.clientX - offsetX + "px";
    container.style.top = e.clientY - offsetY + "px";
}

function stop() {
    isDragging = false;

    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
}


async function showPip(query) {

    if (document.getElementById("yt-floating-player"))
        document.getElementById("yt-floating-player").remove();

    container = document.createElement("div");
    container.id = "yt-floating-player";

    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.width = "580px";
    container.style.height = "326px";
    container.style.background = "#000";
    container.style.zIndex = "999999";
    container.style.resize = "both";
    container.style.overflow = "hidden";
    container.style.borderRadius = "8px";
    container.style.boxShadow = "0 4px 16px rgba(0,0,0,0.4)";
    container.style.minWidth = "200px";
    container.style.minHeight = "120px";

    /* header (drag handle) */

    const header = document.createElement("div");
    header.style.height = "24px";
    header.style.background = "rgba(0,0,0,0.8)";
    header.style.cursor = "move";
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "flex-end";
    header.style.paddingRight = "6px";

    /* close button */

    const close = document.createElement("button");
    close.textContent = "✕";
    close.style.border = "none";
    close.style.background = "transparent";
    close.style.color = "white";
    close.style.cursor = "pointer";
    close.style.fontSize = "14px";

    close.onclick = () => container.remove();

    header.appendChild(close);

    /* youtube iframe */

    const iframe = document.createElement("iframe");

    const videoId = await getFirstVideo(query);
    iframe.src =
        `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

    iframe.style.width = "100%";
    iframe.style.height = "calc(100% - 24px)";
    iframe.style.border = "none";
    iframe.allow =
        "fullscreen; autoplay; encrypted-media";
    iframe.allowFullscreen = true;

    container.appendChild(header);
    container.appendChild(iframe);

    document.body.appendChild(container);

    /* drag logic */
    isDragging = false;
    offsetX = 0;
    offsetY = 0;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;

        offsetX = e.clientX - container.offsetLeft;
        offsetY = e.clientY - container.offsetTop;

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", stop);
    });

}