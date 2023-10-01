// Sorts the videos in the YouTube 'Watch Later' playlist by video length.
function sortVideosByLength() {
    // Retrieve all video elements from the playlist
    const videos = [...document.querySelectorAll('ytd-playlist-video-renderer')];

    // Sort the video elements based on their duration
    videos.sort((a, b) => {
        // Retrieve the video duration text for both videos
        const timeA = a.querySelector('ytd-thumbnail-overlay-time-status-renderer').innerText.trim().split(':');
        const timeB = b.querySelector('ytd-thumbnail-overlay-time-status-renderer').innerText.trim().split(':');

        // Convert the duration text into total seconds for comparison
        const secondsA = timeA.length === 3 ? (+timeA[0] * 3600) + (+timeA[1] * 60) + (+timeA[2]) : (+timeA[0] * 60) + (+timeA[1]);
        const secondsB = timeB.length === 3 ? (+timeB[0] * 3600) + (+timeB[1] * 60) + (+timeB[2]) : (+timeB[0] * 60) + (+timeB[1]);

        // Return comparison result for sorting
        return secondsA - secondsB;
    });

    // Rearrange the sorted video elements in the playlist container
    const container = document.querySelector('#contents');
    videos.forEach(video => container.appendChild(video));
}

// Sets up an observer to watch for changes in the YouTube playlist content.
const observer = new MutationObserver((mutationsList) => {
    // Check if a certain number of videos are loaded to determine if sorting should be triggered
    if (document.querySelectorAll('ytd-playlist-video-renderer').length > 5) {
        sortVideosByLength();
        // Disconnect the observer after sorting to optimize performance
        observer.disconnect();
    }
});

// Start observing changes in the document's structure
observer.observe(document.body, { childList: true, subtree: true });