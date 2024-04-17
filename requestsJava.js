

function clicking() {
    console.log("Hello")
    // Get input values from text fields
    let thetitle = document.querySelector(".Title").value;
    console.log(thetitle);
    let thedetails = document.querySelector(".Description").value;
    let theopenPositions = document.querySelector(".Helpers").value;
    let theFlare = document.querySelector(".flareDropwdown").value;

    // Add the new item to the daRequests array
    newListings = {
        title: thetitle,
        image: "images/circleSam.png",
        image2: "images/irishlogo.svg.png",
        details: thedetails,
        openPositions: theopenPositions,
        flare: theFlare
    };

    
    
    // Save the updated variable to local storage
    localStorage.setItem('newListings', JSON.stringify(newListings));

}




function newPage() {
    // Navigate to the new HTML page
    window.location.href = "listings 2.html";
}

console.log(daRequests);

