// Profile Manager - handles user profile information across the site

// Function to extract profile info from profile.html when user visits it
function extractProfileFromPage() {
    // Get the current user profile from localStorage (set during login)
    const currentUser = getCurrentUserProfile();
    
    // Update the page elements with current user info
    const profileName = document.querySelector('.profile-box h3');
    const profileImage = document.querySelector('.profile-pic');
    const followersButton = document.querySelector('.profile-box button');
    
    if (profileName && currentUser) {
        profileName.textContent = currentUser.name;
    }
    
    if (profileImage && currentUser) {
        profileImage.src = currentUser.profileImage;
    }
    
    if (followersButton && currentUser) {
        // Show different follower counts for different users
        if (currentUser.isSpecialUser) {
            followersButton.textContent = "13 Followers";
        } else {
            followersButton.textContent = "0 Followers";
        }
    }
    
    return currentUser;
}

// Initialize profile extraction if we're on the profile page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the profile page
    if (document.querySelector('.profile-box')) {
        extractProfileFromPage();
        loadUpcomingEvents();
    }
});

// Function to load and display upcoming events from user interests
function loadUpcomingEvents() {
    const userInterests = JSON.parse(localStorage.getItem('userInterests')) || [];
    const profileBottom = document.querySelector('.profile-bottom');
    
    if (profileBottom && userInterests.length > 0) {
        // Clear existing content except the header
        profileBottom.innerHTML = '<p>Upcoming Events:</p>';
        
        // Add each user interest as an upcoming event
        userInterests.forEach(event => {
            const eventParagraph = document.createElement('p');
            eventParagraph.textContent = `${event.title} | ${event.date}`;
            profileBottom.appendChild(eventParagraph);
        });
    } else if (profileBottom && userInterests.length === 0) {
        // Show different messages for different user types
        const currentUser = getCurrentUserProfile();
        if (currentUser.isSpecialUser) {
            profileBottom.innerHTML = '<p>Upcoming Events:</p><p>No upcoming events yet.</p>';
        } else {
            profileBottom.innerHTML = `
                <p>Upcoming Events:</p>
                <p>No events yet!</p>
            `;
        }
    }
}

// Function to get current user profile (used by other pages)
function getCurrentUserProfile() {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    
    // Default fallback for guest users
    return {
        name: "Guest User",
        username: "guest", 
        profileImage: "../pfps/Default_pfp.svg.png",
        isSpecialUser: false
    };
}
