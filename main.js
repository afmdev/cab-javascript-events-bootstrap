   


    // function loadMasonry() {
    //     var myBody = document.getElementsByTagName("body")[0];
    //     var myMasonry = document.createElement('script');
    //     myMasonry.type = 'text/javascript';
    //     myMasonry.src = 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js';
    //     myBody.appendChild(myMasonry);
    // }
    // loadMasonry()

// let url = "https://pixabay.com/api/?key=26639219-c988cadef2f5d334da840ad52&image_type=all&per_page=10&page=5" //url api in a variable
//     // let url = "https://jsonplaceholder.typicode.com/users"
//     fetch(url) // use fetch to start working with json
//         // fetch("./archivo.json") // load file from yor localhost
//         .then(res => res.json()) // convert data from the api to a json
//         .then(data => showMyData(data.hits))  //creamos la funcion showMyData
//         // .catch(error => console.log(error))

// const showMyData = (data) => {
//     console.log(data)


//     let divContainer = document.getElementById("api-data")
//     function cargarImages() {
//         for (let i = 0; i < data.length; i++) {

//             let divCardContainer = document.createElement("div")
//             divCardContainer.className = "col-sm-6 col-lg-4 mb-4"

//             let divCard = document.createElement("div")
//             divCard.className = "card"
//             divCard.id = "card-" + i

        
//             let imgLink = document.createElement("a")
//             imgLink.id = "img-link"
//             imgLink.setAttribute("href", "#exampleModal")
//             imgLink.setAttribute("data-bs-toggle", "modal")
//             imgLink.setAttribute("data-bs-target", "#exampleModal")
        
//             // VIEWS BADGE
//             let divCardBadgeViews = document.createElement("span")
//             divCardBadgeViews.className = "badge rounded-pill bg-dark views"
//             divCardBadgeViews.innerHTML = "<i class='fa fa-eye'> </i> " + data[i].views
//             let divCardBadgeLikes = document.createElement("span")
//             divCardBadgeLikes.className = "badge rounded-pill bg-dark likes"
//             divCardBadgeLikes.innerHTML = "<i class='fa fa-heart'> </i> " + data[i].likes



//             let imgCard = document.createElement("img")
//             imgCard.className = "card-img-top"
//             imgCard.setAttribute("src", data[i].webformatURL)
//             imgCard.alt = data[i].user

//             // let imgWidth = data[i].imageWidth*0.1
//             // imgCard.setAttribute("width", imgWidth)

//             // let imgHeight = data[i].imageHeight*0.1
//             // imgCard.setAttribute("height", imgHeight)

//             let imgOverlay = document.createElement("div")
//             imgOverlay.className = "overlay"

//             let overlayIcon = document.createElement("i")
//             // overlayIcon.className = "fa fa-user"
//             overlayIcon.className = "fa fa-plus"

//             // let overlayIcon = document.createElement("div")
//             // // overlayIcon.className = "fa fa-user"
//             // overlayIcon.innerHTML = "<lottie-player src='https://assets6.lottiefiles.com/packages/lf20_mgqdbqbs.json' background='transparent' speed='1' style='width: 100px; height: 100px;' loop autoplay></lottie-player>"
    
//             let divCardBody = document.createElement("div")
//             divCardBody.className = "card-body"




//             let titleCardBody = document.createElement("h5")
//             titleCardBody.className = "card-title"
//             titleCardBody.innerHTML = data[i].user
    
//             let textCardBody = document.createElement("p")
//             textCardBody.className = "card-text"
//             textCardBody.innerHTML = data[i].type
    
//             let buttonCardBody = document.createElement("a")
//             buttonCardBody.setAttribute("href", data[i].pageURL)
//             buttonCardBody.className = "btn btn-primary"
//             buttonCardBody.setAttribute("target", "_blank")
//             buttonCardBody.innerHTML = "Open the original"


//             divContainer.appendChild(divCardContainer) //en divContainer, mete divCardContainer
//             divCardContainer.appendChild(divCard) //en divCardContainer, mete divCard
//             imgLink.appendChild(divCardBadgeViews)
//             imgLink.appendChild(divCardBadgeLikes)
//             // divCardBadgeViews.appendChild(divBadgeIcon)
//             divCard.appendChild(imgLink) //en divCard, mete imgLink
//             imgLink.appendChild(imgCard)
//             imgLink.appendChild(imgOverlay) //en imgLink, mete imgOverlay
//             imgOverlay.appendChild(overlayIcon) //en imgOverlay, mete overlayIcon

//         }
//     }

    
//     cargarImages()



//     let myModalContent = document.getElementById("myModalContent")
//     let myTags = document.getElementById("myModalTags")
//     let myModalTitle = document.createElement("img")
//     let myModalTitleName = document.createElement("h5")
//     let myModalTags = document.createElement("div")
//     myModalTags.className = "tags"

//     let myModalBody = document.getElementById("myModalBody");
//     let myModalImg = document.createElement("img")

//     let myModalClose = document.createElement("button")
//     myModalClose.setAttribute("type", "button")
//     myModalClose.className = "btn-close"
//     myModalClose.setAttribute("data-bs-dismiss", "modal")
//     myModalClose.setAttribute("aria-label", "Close")


//     for (let i = 0; i < data.length; i++) {
//         document.getElementById("card-" + i).addEventListener('click', function () {

//             if (data[i].userImageURL == "") {
//                 myModalTitle.src = "img/nopicture.png"
//                 myModalContent.appendChild(myModalTitle)
//                 myModalContent.appendChild(myModalTitleName).innerHTML = data[i].user
//                 myTags.appendChild(myModalTags).innerHTML = "Tags: " + data[i].tags

//                 myModalContent.appendChild(myModalClose)
    
//                 myModalImg.src = data[i].largeImageURL
//                 myModalImg.setAttribute("width", "100%")
//                 myModalBody.appendChild(myModalImg)

//             } else {
//                 myModalTitle.src = data[i].userImageURL
//                 myModalContent.appendChild(myModalTitle)
//                 myModalContent.appendChild(myModalTitleName).innerHTML = data[i].user
//                 myTags.appendChild(myModalTags).innerHTML = "Tags: " + data[i].tags

//                 myModalContent.appendChild(myModalClose)
    
//                 myModalImg.src = data[i].largeImageURL
//                 myModalImg.setAttribute("width", "100%")
//                 myModalBody.appendChild(myModalImg)
//             }

//         })
//     }
// }



    // let url = `https://pixabay.com/api/?key=26639219-c988cadef2f5d334da840ad52`


    let key = "26639219-c988cadef2f5d334da840ad52"
    let url = "https://pixabay.com/api/?key="
    let auth = (url + key)
    console.log(auth);


 
let currentPage = 1
let totalPages = 0

let buscarImagen = async()=> {
    let input = document.querySelector("#buscar").value

    if (input === '') {
        mostrarError("#msg-error", "Please insert text before press go")
        return;
    }

    let imagesPerPage = 19
    let query = `&q=${input}&per_page=${imagesPerPage}&page=${currentPage}`
    let url = (auth + query)
    console.log(url)
    let response = await fetch(url)
    let data = await response.json();


    let images = data.hits
    // console.log(images)

    let imagesHTML = ``
    images.map(img => {
        const { largeImageURL, likes, previewURL, tags, views } = img
            // console.log(images)

        imagesHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" id="grid">
            <div class="card">
                <img class="card-img-top" src="${previewURL}" alt="${tags}">
                <div class="card-body">
                    <p class="card-text">${likes} likes</p>
                    <p class="card-text">${views} views</p>
                </div>
                <div class="card-footer">
                    <a 
                    href="${largeImageURL}" 
                    target="_blank"
                    class="btn btn-primary btn-block">
                    Ver Imagen</a>
                </div>
            </div>
        </div>
        `;
    })

    divListadoImagenes = document.getElementById("api-data")
    divListadoImagenes.innerHTML = imagesHTML

    totalPages=(data.hits/imagesPerPage)
    let divPagination = document.querySelector("#pagination")

    let pagPrev = (currentPage === 1)?`<li class="page-item disabled"><a class="page-link" href="#prev" onclick="pagPrev()"><< Prev</a></li>`:`<li class="page-item"><a class="page-link" href="#prev" onclick="pagPrev()"><< Prev</a></li>`

    let pagNext = (currentPage === totalPages)?`<li class="page-item disabled"><a class="page-link" href="#prev" onclick="pagNext()">Next >></a></li>`:`<li class="page-item"><a class="page-link" href="#prev" onclick="pagNext()">Next >></a></li>`

    divPagination.innerHTML = `${pagPrev} ${pagNext}`
}

const pagPrev = () => {
    
    if (currentPage === 1) {
        return
    } else {
        currentPage--;
        buscarImagen();
    }
}

const pagNext = () => {
    
    if (currentPage>totalPages) {
        return
    } else {
        currentPage++
        buscarImagen();
    }
}










const mostrarError = (element, message) => {
    divError = document.querySelector(element)
    divError.innerHTML = `<p class='alert alert-primary'>${message}</p>`
    setTimeout(() => { divError.innerHTML = ``;}, 5000)
}


