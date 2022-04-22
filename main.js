console.log(myData)

let data = myData.hits

console.log(data);

let divContainer = document.getElementById("api-data")

// let data
// fetch("https://pixabay.com/api/?key=26639219-c988cadef2f5d334da840ad52").then(res => res.json()).then(result => {
//     console.log(result)
//      data = result.hits
//     createCards(data)
// }
    
// )
// function createCards(data) {

// window.onload = function () {
        
function cargarImages() {
    for (let i = 0; i < data.length; i++) {

        let divCardContainer = document.createElement("div")
        divCardContainer.className = "col-sm-6 col-lg-4 mb-4"

        let divCard = document.createElement("div")
        divCard.className = "card"
        divCard.id = "card-" + i

        
        let imgLink = document.createElement("a")
        imgLink.id = "img-link"
        imgLink.setAttribute("href", "#exampleModal")
        imgLink.setAttribute("data-bs-toggle", "modal")
        imgLink.setAttribute("data-bs-target","#exampleModal")
        
        // VIEWS BADGE
        let divCardBadgeViews = document.createElement("span")
        divCardBadgeViews.className = "badge rounded-pill bg-dark views"
        divCardBadgeViews.innerHTML = "<i class='fa fa-eye'> </i> " + data[i].views
        let divCardBadgeLikes = document.createElement("span")
        divCardBadgeLikes.className = "badge rounded-pill bg-dark likes"
        divCardBadgeLikes.innerHTML = "<i class='fa fa-heart'> </i> " + data[i].likes

        // let divBadgeIcon = document.createElement("i")
        // overlayIcon.className = "fa fa-user"
        // divBadgeIcon.className = "fa fa-eye"


        let imgCard = document.createElement("img")
        imgCard.className = "card-img-top"
        imgCard.setAttribute("src", data[i].largeImageURL)
        imgCard.alt = data[i].user

        let imgOverlay = document.createElement("div")
        imgOverlay.className = "overlay"

        let overlayIcon = document.createElement("i")
        // overlayIcon.className = "fa fa-user"
        overlayIcon.className = "fa fa-plus"

        // let overlayIcon = document.createElement("div")
        // // overlayIcon.className = "fa fa-user"
        // overlayIcon.innerHTML = "<lottie-player src='https://assets6.lottiefiles.com/packages/lf20_mgqdbqbs.json' background='transparent' speed='1' style='width: 100px; height: 100px;' loop autoplay></lottie-player>"
    
        let divCardBody = document.createElement("div")
        divCardBody.className = "card-body"


        // Elementos para crear botón "Read More", pero con Masonry no funciona
        // let divCollapsableButton = document.createElement("a")
        // divCollapsableButton.className = "btn btn-primary"
        // divCollapsableButton.setAttribute("data-bs-toggle", "collapse")
        // divCollapsableButton.setAttribute("href", "#collapseImgInfo-" + i)
        // divCollapsableButton.setAttribute("role", "button")
        // divCollapsableButton.setAttribute("aria-expanded", "false")
        // divCollapsableButton.setAttribute("aria-controls", "collapseImgInfo-" + i)
        // divCollapsableButton.innerHTML = "Read More"

        // let divCollapsableContainer = document.createElement("div")
        // divCollapsableContainer.className = "collapse"
        // divCollapsableContainer.id = "collapseImgInfo-" + i


        let titleCardBody = document.createElement("h5")
        titleCardBody.className = "card-title"
        titleCardBody.innerHTML = data[i].user
    
        let textCardBody = document.createElement("p")
        textCardBody.className = "card-text"
        textCardBody.innerHTML = data[i].type
    
        let buttonCardBody = document.createElement("a")
        buttonCardBody.setAttribute("href", data[i].pageURL)
        buttonCardBody.className = "btn btn-primary"
        buttonCardBody.setAttribute("target", "_blank")
        buttonCardBody.innerHTML = "Open the original"


        divContainer.appendChild(divCardContainer) //en divContainer, mete divCardContainer
        divCardContainer.appendChild(divCard) //en divCardContainer, mete divCard
        imgLink.appendChild(divCardBadgeViews)
        imgLink.appendChild(divCardBadgeLikes)
        // divCardBadgeViews.appendChild(divBadgeIcon)
        divCard.appendChild(imgLink) //en divCard, mete imgLink
        imgLink.appendChild(imgCard)
        imgLink.appendChild(imgOverlay) //en imgLink, mete imgOverlay
        imgOverlay.appendChild(overlayIcon) //en imgOverlay, mete overlayIcon


        divCard.appendChild(divCardBody) //en divCard, meto divCardBody
        divCardBody.appendChild(titleCardBody) //en divCardBody, meto titleCardBody 
        divCardBody.appendChild(textCardBody) //en divCardBody, meto textCardBody
        divCardBody.appendChild(buttonCardBody) //en divCardBody, meto buttonCardBody

        // appenChild para botón "Read More" pero no funciona con Masonry
        // divCardBody.appendChild(divCollapsableButton)
        // divCardBody.appendChild(divCollapsableContainer)
        // divCollapsableContainer.appendChild(titleCardBody)
        // divCollapsableContainer.appendChild(textCardBody)
        // divCollapsableContainer.appendChild(buttonCardBody)
    }
// }

}

function loadMasonry() {
    var myBody = document.getElementsByTagName("body")[0];       
    var myMasonry = document.createElement('script');
    myMasonry.type = 'text/javascript';
    myMasonry.src = 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js';
    myBody.appendChild(myMasonry);
}


cargarImages()
loadMasonry()


let myModalContent = document.getElementById("myModalContent")
let myModalTitle = document.createElement("img")
let myModalTitleName = document.createElement("h5")

let myModalBody = document.getElementById("myModalBody");
let myModalImg = document.createElement("img")

let myModalClose = document.createElement("button")
myModalClose.setAttribute("type", "button")
myModalClose.className = "btn-close"
myModalClose.setAttribute("data-bs-dismiss", "modal")
myModalClose.setAttribute("aria-label", "Close")

    

for (let i = 0; i < data.length; i++) { 
    document.getElementById("card-" + i).addEventListener('click', function () {
        myModalTitle.src = data[i].userImageURL
        myModalContent.appendChild(myModalTitle)
        myModalContent.appendChild(myModalTitleName).innerHTML = data[i].user
        myModalContent.appendChild(myModalClose)

        myModalImg.src = data[i].largeImageURL
        myModalImg.setAttribute("width", "100%") 
        myModalBody.appendChild(myModalImg)
    })
}




// let myModal = document.getElementById("myModal");
// let myModalElem = document.createElement("p");

// for (let i = 0; i < data.length; i++) { 
//     document.getElementById("card-"+i).addEventListener('click', function(){
//         myModalElem.className = "fotoenmodal";
//         myModalElem.innerHTML = "<img src='" + data[i].largeImageURL + "' alt='test' width='100%'/>";
//         // myModalElem.innerHTML = "Name user: " + data[i].user;
//         myModal.appendChild(myModalElem)
//     })
// }
