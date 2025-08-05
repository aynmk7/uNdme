// Thread data
const threadData = [
    {
        title: "Clubs for Black students",
        author: "jdillon4",
        authorImage: "../pfps/Apink.png",
        question: "Please recommend clubs to meet other Black students on campus"
    },
    {
        title: "Jobs as International Students", 
        author: "tbrown3",
        authorImage: "../pfps/t%20blue.png",
        question: "Can anyone comment on on campus jobs as intl student?"
    },
    {
        title: "Indian Food in SB",
        author: "speters4", 
        authorImage: "../pfps/s%20purple.png",
        question: "In search of good Indian food please comment recs in SB!"
    },
    {
        title: "Trying to learn Hindu",
        author: "vmiller2",
        authorImage: "../pfps/v%20teal.png", 
        question: "Trying to learn Hindu this summer what books do you guys recommend?"
    },
    {
        title: "Birria Taco Recipe",
        author: "athomas9",
        authorImage: "../pfps/Apink.png",
        question: "Beginner chef here! Drop recipes for birria tacos please!"
    },
    {
        title: "Ally Therapist",
        author: "esmith74",
        authorImage: "../pfps/AI%20generated%20girl2.png",
        question: "Looking for a LGBTQ+ friendly therapist either on campus or in SB"
    }
];

// Comments data for each thread
const threadComments = {
    0: [ // Clubs for Black students
        {
            author: "dbrooks41",
            authorImage: "../pfps/AIgenerated male.png",
            title: "BSA",
            text: "Black Student Association has lots of fun events and good food!"
        },
        {
            author: "fjones42", 
            authorImage: "../pfps/AI%20generated%20girl2.png",
            title: "BBAND",
            text: "I met a lot of super nice people at Black Business Association"
        }
    ],
    1: [ // International student jobs
        {
            author: "intl_student",
            authorImage: "../pfps/t%20blue.png",
            title: "Library Jobs",
            text: "The library has lots of part-time positions and they're very flexible with international students!"
        },
        {
            author: "workstudent",
            authorImage: "../pfps/Ateal.png", 
            title: "Campus Tours",
            text: "I work as a campus tour guide - great way to meet people and earn money!"
        }
    ],
    2: [ // Indian food
        {
            author: "foodie123",
            authorImage: "../pfps/AI%20generated%20girl2.png",
            title: "Taste of India",
            text: "Taste of India on Edison Road is amazing! Their biryani is the best in town."
        },
        {
            author: "curry_lover",
            authorImage: "../pfps/AIgenerated male.png",
            title: "Saffron", 
            text: "Saffron Indian Cuisine downtown has great lunch buffets and authentic flavors!"
        }
    ],
    3: [ // Learning Hindu/Hindi
        {
            author: "language_tutor",
            authorImage: "../pfps/s%20purple.png",
            title: "Duolingo + Books",
            text: "Start with Duolingo for basics, then get 'Complete Hindi' by Rupert Snell - excellent textbook!"
        },
        {
            author: "hindi_speaker",
            authorImage: "../pfps/v%20teal.png",
            title: "Practice Groups",
            text: "Check out the Hindi conversation group that meets at the library every Thursday!"
        }
    ],
    4: [ // Birria tacos
        {
            author: "chef_student",
            authorImage: "../pfps/Apink.png", 
            title: "Authentic Recipe",
            text: "Use chuck roast, short ribs, and dried chiles (guajillo, ancho, chipotle). Slow cook for 4+ hours!"
        },
        {
            author: "taco_tuesday",
            authorImage: "../pfps/circleSam.png",
            title: "Pro Tips",
            text: "Don't forget to dip the tortillas in the consommé before grilling! Makes all the difference."
        }
    ],
    5: [ // LGBTQ+ therapist
        {
            author: "ally_support",
            authorImage: "../pfps/AI%20generated%20girl2.png",
            title: "Campus Resources", 
            text: "The University Counseling Center has LGBTQ+-affirming therapists. Call for an appointment!"
        },
        {
            author: "proud_student",
            authorImage: "../pfps/s%20purple.png",
            title: "Off-Campus Options",
            text: "Dr. Sarah Martinez downtown is excellent and very LGBTQ+ friendly. Highly recommend!"
        }
    ]
};

// Get user profile information
function getUserProfile() {
    // Use the profile manager if available, otherwise fallback to stored data
    if (typeof getCurrentUserProfile === 'function') {
        return getCurrentUserProfile();
    }
    
    // Check if user info is already stored in localStorage
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    
    // Default guest user profile
    const defaultProfile = {
        name: "Guest User",
        username: "guest",
        profileImage: "../pfps/Default_pfp.svg.png"
    };
    
    // Store in localStorage for consistency
    localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
    return defaultProfile;
}

// Get thread ID from URL parameters
function getThreadId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('thread')) || 0;
}

// Get thread data (including user-created threads)
function getThreadData(threadId) {
    // Check if it's a user-created thread (ID >= 6)
    if (threadId >= 6) {
        const userThreadData = localStorage.getItem('userThreadData');
        if (userThreadData) {
            const userData = JSON.parse(userThreadData);
            const userThread = userData.find(t => t.threadId === threadId);
            if (userThread) {
                return {
                    title: userThread.title,
                    author: userThread.author,
                    authorImage: userThread.authorImage,
                    question: userThread.question
                };
            }
        }
    }
    
    // Return default thread data
    return threadData[threadId];
}

// Display the original thread post
function displayOriginalThread(threadId) {
    const thread = getThreadData(threadId);
    if (!thread) return;

    const originalPost = document.querySelector('.box-page');
    originalPost.innerHTML = `
        <div class="topCol">
            <h2>${thread.title}</h2>
            <div class="avatarContainer">
                <img src="${thread.authorImage}" alt="" width="40">
                <p class="named">${thread.author}</p>
            </div>
        </div>
        <p class="questions">${thread.question}</p>
    `;
}

// Display comments for the thread
function displayThreadComments(threadId) {
    const comments = threadComments[threadId] || [];
    const commentsContainer = document.getElementById('thread-comments');
    
    if (!commentsContainer) {
        // Create comments container if it doesn't exist
        const container = document.createElement('div');
        container.id = 'thread-comments';
        document.querySelector('.box-page').insertAdjacentElement('afterend', container);
    }

    const container = document.getElementById('thread-comments');
    container.innerHTML = '';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'small-border border';
        commentDiv.innerHTML = `
            <div class="topCol">
                <h3>${comment.title}</h3>
                <div class="avatarContainer">
                    <img src="${comment.authorImage}" alt="" width="40">
                    <p class="named">${comment.author}</p>
                </div>
            </div>
            <p class="questions">${comment.text}</p>
        `;
        container.appendChild(commentDiv);
    });
}

// Add new comment functionality
function addNewComment(threadId) {
    const commentInput = document.querySelector('.tBox');
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('Please enter a comment!');
        return;
    }

    // Get user profile information
    const userProfile = getUserProfile();

    // Initialize comments array if it doesn't exist
    if (!threadComments[threadId]) {
        threadComments[threadId] = [];
    }

    // Add the new comment with user's actual profile info
    const newComment = {
        author: userProfile.username,
        authorImage: userProfile.profileImage,
        title: "Reply",
        text: commentText
    };

    threadComments[threadId].push(newComment);
    
    // Save to localStorage for persistence
    localStorage.setItem('threadComments', JSON.stringify(threadComments));
    
    // Clear input and refresh display
    commentInput.value = '';
    displayThreadComments(threadId);
}

// Load saved comments from localStorage
function loadSavedComments() {
    const savedComments = localStorage.getItem('threadComments');
    if (savedComments) {
        const parsed = JSON.parse(savedComments);
        // Merge saved comments with default comments
        Object.keys(parsed).forEach(key => {
            if (threadComments[key]) {
                threadComments[key] = [...threadComments[key], ...parsed[key]];
            } else {
                threadComments[key] = parsed[key];
            }
        });
    }
}

// Allow users to update their profile info (optional)
function updateUserProfile(name, username, profileImage) {
    const userProfile = {
        name: name,
        username: username,
        profileImage: profileImage
    };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    return userProfile;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    const threadId = getThreadId();
    
    loadSavedComments();
    displayOriginalThread(threadId);
    displayThreadComments(threadId);
    
    // Add event listener for comment submission
    const commentButton = document.querySelector('.pComment');
    if (commentButton) {
        commentButton.addEventListener('click', function(e) {
            e.preventDefault();
            addNewComment(threadId);
        });
    }

    // Allow Enter key to submit comment
    const commentInput = document.querySelector('.tBox');
    if (commentInput) {
        commentInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addNewComment(threadId);
            }
        });
    }
});
