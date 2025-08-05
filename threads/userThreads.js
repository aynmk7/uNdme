// Load and display user-created threads
function loadUserThreads() {
    const savedThreads = localStorage.getItem('userThreads');
    if (!savedThreads) return;

    const userThreads = JSON.parse(savedThreads);
    const threadsContainer = document.querySelector('body');
    
    // Find where to insert new threads (after the navigation)
    const navContainer = document.querySelector('.navContainer');
    
    userThreads.forEach((thread, index) => {
        const threadDiv = document.createElement('div');
        threadDiv.className = 'box-page border';
        threadDiv.innerHTML = `
            <div class="topCol">
                <h2>${thread.title}</h2>
                <div class="avatarContainer">
                    <img src="${thread.authorImage}" alt="" width="40">
                    <p class="named">${thread.author}</p>
                </div>
            </div>
            <p class="questions">${thread.question}</p>
            <a style="position: center; color: black" class="newComment" href="comments.html?thread=${6 + index}">Comment</a>
        `;
        
        // Insert after nav container
        navContainer.insertAdjacentElement('afterend', threadDiv);
    });
}

// Update thread comments to include user threads
function updateThreadCommentsData() {
    const savedThreads = localStorage.getItem('userThreads');
    if (!savedThreads) return;

    const userThreads = JSON.parse(savedThreads);
    
    // Add user threads to threadData in comments
    userThreads.forEach((thread, index) => {
        const threadId = 6 + index; // Start after existing threads
        
        // Add to localStorage for comments page
        let threadData = localStorage.getItem('userThreadData') || '[]';
        threadData = JSON.parse(threadData);
        
        const existingIndex = threadData.findIndex(t => t.id === thread.id);
        if (existingIndex === -1) {
            threadData.push({
                id: thread.id,
                threadId: threadId,
                title: thread.title,
                author: thread.author,
                authorImage: thread.authorImage,
                question: thread.question
            });
        }
        
        localStorage.setItem('userThreadData', JSON.stringify(threadData));
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadUserThreads();
    updateThreadCommentsData();
});
