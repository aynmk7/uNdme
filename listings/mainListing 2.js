var retrievedListings = JSON.parse(localStorage.getItem('newListings'));
console.log("Retrieved Listings:", retrievedListings);

const daRequests = [
    {
        title: "Volunteer for Africana Night",
        image: "../pfps/Apink.png",
        image2: "../logos/irishlogo.svg.png",
        details: "Looking for helpers for cultural workshops on traditional African art, drumming, or storytelling",
        openPositions: "5",
        flare: 'Service',

    },
    {
        title: "Event Assistance",
        image: "../pfps/t blue.png",
        image2: "../logos/irishlogo.svg.png",
        details: "Helpers for Pride Week celebrations, including parade participation, booth setup, and event coordination.",
        openPositions: "4",
        flare: 'Service',
    },
        {
          "title": "Mosque Rides",
          image: "../pfps/AIgenerated male.png",
          "image2": "../logos/irishlogo.svg.png",
          "details": "Anyone available to assist in giving Muslim studnets rides to the local mosque for Ramadan.",
          "openPositions": "3"
        },
        {
          "title": "Language Tables",
          image: "../pfps/v teal.png",
          "image2": "../logos/irishlogo.svg.png",
          "details": "Any individuals fluent in Turkish, Swahili, or Arabic to assist in language tables through the CSLC.",
          "openPositions": "6"
        },
        {
          "title": "East Asian Cultural Dancers",
          image: "../pfps/AI generated girl2.png",
          "image2": "../logos/irishlogo.svg.png",
          "details": "Showcase the rich tapestry of Asian heritage through performances in the ASA showcase, any and all performances are welcome!",
          "openPositions": "6"
        },
        {
          "title": "Scavenger Hunt Organizer",
          image: "../pfps/s purple.png",
          "image2": "../logos/irishlogo.svg.png",
          "details": "We are pleased to announce that we are bringing back Africana studies. We are looking for anyone to organize a scavenger hunt for our first club meeting!",
          "openPositions": "4"
        },
        {
          "title": "LGBTQ+ Alliance Event Planning",
          image: "../pfps/girl-modified.png",
          "image2": "../logos/irishlogo.svg.png",
          "details": "Volunteers needed for event planning, Pride Week celebrations, and advocacy campaigns.",
          "openPositions": "7"
        },
        {
          "title": "International Student Night planning",
          image: "../pfps/Ateal.png",
          "image2": "../logos/irishlogo.svg.png",
          "details": "Helpers sought for orientation programs, language exchanges, food festivals, and cultural exchange events to connect international studnets with one another.",
          "openPositions": "3"
        },
        {
            "title": "Interfaith Dinner",
            image: "../pfps/circleSam.png",
            "image2": "../logos/irishlogo.svg.png",
            "details": "Join us in celebrating Islamic culture and fostering interfaith dialogue on campus. Volunteers needed to set up stands.",
            "openPositions": "5"
          },
          {
            "title": "Latinx Food Needed",
            image: "../pfps/Apink.png",
            "image2": "../logos/irishlogo.svg.png",
            "details": "Helpers wanted for cooking traditional dishes Latinx night.",
            "openPositions": "8"
          },
          {
            "title": "Help Run a Fundraising Stand",
            image: "../pfps/t blue.png",
            "image2": "../logos/irishlogo.svg.png",
            "details": "Fundraising for humanitarian aid in Gaza, volunteer needed to help run bake sale stand.",
            "openPositions": "4"
          },
          {
            "title": "LGBTQ+ Alliance",
            image: "../pfps/AI generated girl2.png",
            "image2": "../logos/irishlogo.svg.png",
            "details": "Join us in creating a more inclusive and accepting campus environment for all. Volunteers welcome for event planning, Pride Week celebrations, and advocacy campaigns.",
            "openPositions": "7"
          },
      ]
    

if (typeof retrievedListings !== 'undefined') {
daRequests.push(retrievedListings);
}

console.log("daRequests:");
console.log(daRequests);


const requestsHeading = document.querySelector(".requests-list-container h2");


// iterating to make sure the grammer is correct
if (daRequests.length == 1){
    requestsHeading.innerHTML = `${daRequests.length} Pending Request`
} else{
    requestsHeading.innerHTML = `${daRequests.length} Pending Requests`
}



const requestsContainer = document.querySelector(".requests-list-container .requests");
const requSearch = document.querySelector(".requests-list-container .requ-search");

let searchTerm = "";

// making the info according to user input
const createRequestsBoxes = () => {


    daRequests.forEach(request => {
        let requestBox = document.createElement("div");
        requestBox.classList.add("request");

        let image = document.createElement("img")
        image.src = request.image
        image.classList.add("pfp");

        let image2 = document.createElement("img")
        image2.src = request.image2;
        image2.classList.add("NDlogo");

        let title = document.createElement("h3")
        title.innerHTML = request.title;
        title.classList.add("Request-Title");

        let details = document.createElement("div")
        details.innerHTML = request.details
        details.classList.add("details")

        let detailsButton = document.createElement("a")
        detailsButton.href = request.link
        detailsButton.innerHTML = "I'm interested!";
        detailsButton.classList.add("details-btn");

        detailsButton.addEventListener('click', function() {
            event.preventDefault();
            // Change the text content of the button
            detailsButton.innerHTML = "Requested!";
        
            // Change the color of the button (you can customize this part)
            detailsButton.style.backgroundColor = 'green';
            detailsButton.style.color = 'white';

            // Increase the number of helpers by 1
            if (request.openPositions >= 0) {
                request.openPositions = parseInt(request.openPositions) + 1;
                
                // Update the helper count display
                if(request.openPositions == 1) {
                    openPositions.innerHTML = `${request.openPositions} Helper!`;
                } else {
                    openPositions.innerHTML = `${request.openPositions} Helpers!`;
                }
            }

            // Save the user's interested event to localStorage
            let userInterests = JSON.parse(localStorage.getItem('userInterests')) || [];
            
            // Create an event object with title and a sample date/time
            const eventData = {
                title: request.title,
                date: getRandomEventDate(),
                id: Date.now() // Simple unique ID
            };
            
            // Add to interests if not already there
            if (!userInterests.some(event => event.title === request.title)) {
                userInterests.push(eventData);
                localStorage.setItem('userInterests', JSON.stringify(userInterests));
            }
        });

        // Function to generate random upcoming event dates
        function getRandomEventDate() {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const times = ['3:00 p.m.', '4:00 p.m.', '5:00 p.m.', '6:00 p.m.', '7:00 p.m.', '8:00 p.m.'];
            
            const randomDay = days[Math.floor(Math.random() * days.length)];
            const randomTime = times[Math.floor(Math.random() * times.length)];
            
            return `${randomDay} ${randomTime}`;
        }

        let openPositions = document.createElement("span")
        openPositions.classList.add("open-positions");

        if(request.openPositions == 1) {
            openPositions.innerHTML = `${request.openPositions} Helper!`;
        } else{
            openPositions.innerHTML = `${request.openPositions} Helpers!`;
        }

        requestBox.appendChild(image);
        requestBox.appendChild(image2);
        requestBox.appendChild(title);
        requestBox.appendChild(details);
        requestBox.appendChild(detailsButton);
        requestBox.appendChild(openPositions);
        requestsContainer.appendChild(requestBox);
    
}   
    );
};


createRequestsBoxes();




        
