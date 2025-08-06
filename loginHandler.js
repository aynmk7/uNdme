// Login Handler - manages user authentication and profile setup

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Check for Sam Hartman's special credentials
            if (username === 'shartman') {
                // Set up Sam Hartman profile
                setupSamHartmanProfile();
            } else {
                // Set up random/guest user profile
                setupGuestProfile(username);
            }
            
            // Redirect to profile page after login
            window.location.href = 'profile/profile.html';
        });
    }
});

function setupSamHartmanProfile() {
    const samProfile = {
        name: "Sam Hartman",
        username: "shartman",
        profileImage: "pfps/circleSam.png",
        isSpecialUser: true
    };
    
    // Set up pre-coded events for Sam
    const samEvents = [
        {
            title: "Help Run Football Fundraiser Stand",
            date: "Sunday 5:00 p.m.",
            id: Date.now()
        },
        {
            title: "Watch The Irish Tap Dancing Club Performance", 
            date: "Wednesday 7:00 p.m.",
            id: Date.now() + 1
        },
        {
            title: "Attend The Multicultural Student Program and Services Event",
            date: "Friday 4:00 p.m.", 
            id: Date.now() + 2
        }
    ];
    
    localStorage.setItem('userProfile', JSON.stringify(samProfile));
    localStorage.setItem('userInterests', JSON.stringify(samEvents));
}

function setupGuestProfile(username) {
    const guestProfile = {
        name: username || "Guest User",
        username: username || "guest",
        profileImage: "pfps/Default_pfp.svg.png",
        isSpecialUser: false
    };
    
    // Clear any existing events for guest users
    localStorage.setItem('userProfile', JSON.stringify(guestProfile));
    localStorage.setItem('userInterests', JSON.stringify([]));
}
