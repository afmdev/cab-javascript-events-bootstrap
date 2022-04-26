document.search.btn.addEventListener('click', function(e) {
e.preventDefault();  

    fetch( createURL(document.search.key.value) )
    .then( function(data) {
    return data.json();  
    })
    .then( function(data) {

        createImage(data);


    })
})


let currentPage = 1
let totalPages = 0
let imagesPerPage = 19

function createURL(value) {
    let itemsPage = document.querySelector("#itemsPage").value

    var key = '26639219-c988cadef2f5d334da840ad52';
    var api = 'https://pixabay.com/api/?key=' + key;
    var keyword = '&q=' + encodeURIComponent(value);
    var option = `&orientation=horizontal&per_page=${itemsPage}&page=${currentPage}`;
    var url = api + keyword + option;

    return url;
}

function createImage(data) {

    let input = document.querySelector("#buscar").value    
    if (input === '') {
        mostrarError("#msg-error", "Please insert text before press go")
        return;
    }

    let images = data.hits
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

    let pagPrev1 = (currentPage === 1)?`<li class="page-item disabled"><a class="page-link" href="#prev"><< Prev</a></li>`:`<li class="page-item"><a class="page-link" href="#prev"><< Prev</a></li>`

    let pagNext1 = (currentPage === totalPages)?`<li class="page-item disabled"><a class="page-link" href="#prev">Next >></a></li>`:`<li class="page-item"><a class="page-link" href="#prev">Next >></a></li>`

    divPagination.innerHTML = `${pagPrev1} ${pagNext1}`

}









const mostrarError = (element, message) => {
    divError = document.querySelector(element)
    divError.innerHTML = `<p class='alert alert-primary'>${message}</p>`
    setTimeout(() => { divError.innerHTML = ``;}, 5000)
}