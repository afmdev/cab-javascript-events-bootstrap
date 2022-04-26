let baseUrl = "https://pixabay.com/api/?key=26639219-c988cadef2f5d334da840ad52"




fetch(baseUrl)
    .then(res => res.json()) // convert data from the api to a json
    .then(data => showMyData(data.hits))  //creamos la funcion showMyData
    .catch(error => console.log(error))

    
const showMyData = (data) => {
    createGrid(data)
    createModal(data)
}       


function createURL(value) {
    let itemsPage = document.querySelector("#itemsPage").value

    var key = '26639219-c988cadef2f5d334da840ad52';
    var api = 'https://pixabay.com/api/?key=' + key;
    var keyword = '&q=' + encodeURIComponent(value);
    var option = `&orientation=horizontal&per_page=${itemsPage}&page=${currentPage}`;
    var url = api + keyword + option;

    return url;
}



function createGrid(data) {
    let divContainer = document.getElementById("api-data")
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
        imgLink.setAttribute("data-bs-target", "#exampleModal")
    
        // VIEWS BADGE
        let divCardBadgeViews = document.createElement("span")
        divCardBadgeViews.className = "badge rounded-pill bg-dark views"
        divCardBadgeViews.innerHTML = "<i class='fa fa-eye'> </i> " + data[i].views
        let divCardBadgeLikes = document.createElement("span")
        divCardBadgeLikes.className = "badge rounded-pill bg-dark likes"
        divCardBadgeLikes.innerHTML = "<i class='fa fa-heart'> </i> " + data[i].likes



        let imgCard = document.createElement("img")
        imgCard.className = "card-img-top"
        imgCard.setAttribute("src", data[i].webformatURL)
        imgCard.alt = data[i].user

        let imgOverlay = document.createElement("div")
        imgOverlay.className = "overlay"

        let overlayIcon = document.createElement("i")
        overlayIcon.className = "fa fa-plus"

        let divCardBody = document.createElement("div")
        divCardBody.className = "card-body"

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
    }
}


function createModal(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("card-" + i).addEventListener('click', function () {
            if (data[i].userImageURL == "") {
                myModalTitle.src = "img/nopicture.png"
                myModalContent.appendChild(myModalTitle)
                myModalContent.appendChild(myModalTitleName).innerHTML = data[i].user
                myTags.appendChild(myModalTags).innerHTML = "Tags: " + data[i].tags
                myModalContent.appendChild(myModalClose)
                myModalImg.src = data[i].largeImageURL
                myModalImg.setAttribute("width", "100%")
                myModalBody.appendChild(myModalImg)
            } else {
                myModalTitle.src = data[i].userImageURL
                myModalContent.appendChild(myModalTitle)
                myModalContent.appendChild(myModalTitleName).innerHTML = data[i].user
                myTags.appendChild(myModalTags).innerHTML = "Tags: " + data[i].tags
                myModalContent.appendChild(myModalClose)
                myModalImg.src = data[i].largeImageURL
                myModalImg.setAttribute("width", "100%")
                myModalBody.appendChild(myModalImg)
            }
        })
    }

    let myModalContent = document.getElementById("myModalContent")
    let myTags = document.getElementById("myModalTags")
    let myModalTitle = document.createElement("img")
    let myModalTitleName = document.createElement("h5")
    let myModalTags = document.createElement("div")
    myModalTags.className = "tags"

    let myModalBody = document.getElementById("myModalBody");
    let myModalImg = document.createElement("img")

    let myModalClose = document.createElement("button")
    myModalClose.setAttribute("type", "button")
    myModalClose.className = "btn-close"
    myModalClose.setAttribute("data-bs-dismiss", "modal")
    myModalClose.setAttribute("aria-label", "Close")
}

    

function filterNumItems() {
    const selectFilter = document.getElementById('filter-select').value;
    console.log(selectFilter);
}
filterNumItems()

function filterBestOnes() {
    const selectShowItems = document.getElementById('filter-numItems').value;
    console.log(selectShowItems);
}
filterBestOnes()