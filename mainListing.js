const daRequests = [
    {
        title: "Software Engineer",
        image: "images/a1.png",
        image2: "images/irishlogo.svg.png",
        details: "Looking for someone to do this hfujadisfjiabfgjibarfgfjbgiorb",
        openPositions: "2",
        link: '#',

    },
    {
        title: "Title",
        image: "",
        details: "",
        openPositions: "2",
        link: '#',
    },
    {
    title: "Title",
    image: "",
    details: "",
    openPositions: "20",
    link: '#',
    }
]

const requestsHeading = document.querySelector(".requests-list-container h2");

// iterating to make sure the grammer is correct
if (daRequests.length == 1){
    requestsHeading.innerHTML = `${daRequests.length} Pending Request`
} else{
    requestsHeading.innerHTML = `${daRequests.length} Pending Requests`
}



const requestsContainer = document.querySelector(".requests-list-container .requests");

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
        detailsButton.innerHTML = "More details";
        detailsButton.classList.add("details-btn");

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
    });
};

createRequestsBoxes();




