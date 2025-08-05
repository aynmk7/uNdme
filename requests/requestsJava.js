
// Get user profile information
function getUserProfile() {
    if (typeof getCurrentUserProfile === 'function') {
        return getCurrentUserProfile();
    }
    
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    
    return {
        name: "Sam Hartman",
        username: "samhartman",
        profileImage: "../pfps/circleSam.png"
    };
}

// Form validation function
function validateForm() {
    const title = document.querySelector(".Title").value.trim();
    const description = document.querySelector(".Description").value.trim();
    const postType = document.querySelector(".flareDropdown").value;
    const helpers = document.querySelector(".Helpers").value.trim();

    // Check required fields
    if (!title) {
        alert("Please enter a title for your post!");
        return false;
    }

    if (!description) {
        alert("Please enter a description for your post!");
        return false;
    }

    if (!postType) {
        alert("Please select a post type!");
        return false;
    }

    // Check helpers field for requests and offers
    if ((postType === 'request' || postType === 'offer') && !helpers) {
        alert("Please enter the number of helpers needed for requests and offers!");
        return false;
    }

    // Validate helpers is a positive number for requests/offers
    if ((postType === 'request' || postType === 'offer') && (isNaN(helpers) || parseInt(helpers) < 1)) {
        alert("Please enter a valid number of helpers (minimum 1)!");
        return false;
    }

    return true;
}

// Create new post
function createPost() {
    if (!validateForm()) {
        return false;
    }

    const userProfile = getUserProfile();
    const title = document.querySelector(".Title").value.trim();
    const description = document.querySelector(".Description").value.trim();
    const postType = document.querySelector(".flareDropdown").value;
    const helpers = document.querySelector(".Helpers").value.trim();

    if (postType === 'discussion') {
        // Create thread post
        createThreadPost(userProfile, title, description);
    } else {
        // Create listing post (request or offer)
        createListingPost(userProfile, title, description, helpers, postType);
    }

    return true;
}

// Create a new thread post
function createThreadPost(userProfile, title, description) {
    // Get existing threads
    let savedThreads = localStorage.getItem('userThreads');
    let userThreads = savedThreads ? JSON.parse(savedThreads) : [];

    // Create new thread
    const newThread = {
        id: Date.now(), // Simple ID based on timestamp
        title: title,
        author: userProfile.username,
        authorImage: userProfile.profileImage,
        question: description,
        timestamp: new Date().toLocaleString()
    };

    userThreads.push(newThread);
    localStorage.setItem('userThreads', JSON.stringify(userThreads));

    alert("Discussion post created successfully! Redirecting to threads...");
    window.location.href = "../threads/threads.html";
}

// Create a new listing post
function createListingPost(userProfile, title, description, helpers, postType) {
    // Create new listing
    const newListing = {
        title: title,
        image: userProfile.profileImage,
        image2: "../logos/irishlogo.svg.png",
        details: description,
        openPositions: helpers,
        flare: postType,
        author: userProfile.username,
        timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    localStorage.setItem('newListings', JSON.stringify(newListing));

    const postTypeText = postType === 'request' ? 'Request' : 'Offer';
    alert(`${postTypeText} posted successfully! Redirecting to listings...`);
    window.location.href = "../listings/listings 2.html";
}

// Show/hide helpers field based on post type
function toggleHelpersField() {
    const postType = document.querySelector(".flareDropdown").value;
    const helpersField = document.querySelector(".Helpers");
    const helpersContainer = helpersField.parentElement;

    if (postType === 'discussion') {
        helpersField.style.display = 'none';
        helpersField.required = false;
    } else {
        helpersField.style.display = 'block';
        helpersField.required = true;
    }
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('postForm');
    const dropdown = document.querySelector('.flareDropdown');

    // Add event listener for post type changes
    if (dropdown) {
        dropdown.addEventListener('change', toggleHelpersField);
        toggleHelpersField(); // Initialize on page load
    }

    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            createPost();
        });
    }
});

