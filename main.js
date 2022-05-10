//GLOBAL VARIABLES

let url = "https://pixabay.com/api/?key=26639219-c988cadef2f5d334da840ad52"
let auth = url

//ASYNC FETCH 
async function getData(url) {
const response = await fetch(url);
    const data = await response.json();
    return data;

}

//FIRST LOAD TO SHOW THE GRID AND SIDEBAR
async function handleInitialLoad() {
    const data = await getData(url);

    setState(data);
    const userNames = getUserNames(getState());
    selectAuthorDOM(userNames);
    const imageType = getImageType(getState());
    selectImageTypeDOM(imageType);

    insertImagesDOM(getState());
    mostPopularItem(getState());
}



const imgContainer = document.querySelector("#api-data");
const selectAuthor = document.querySelector(".select-author");
const selectType = document.querySelector(".select-type");
const launchModal = document.querySelector(".modal-content")
const input2 = document.getElementById("buscar");


//EVENTLISTENERS
window.addEventListener("DOMContentLoaded", handleInitialLoad);
input2.addEventListener("keyup", handleEnter);
selectAuthor.addEventListener("change", handleSelectAuthor);
selectType.addEventListener("change", handleSelectType);



//FUNCTION TO STORE "data" IN A LOCAL VARIABLE TO USE IT LATER
function useState() {
let _state = null;
function getState() {return _state;}
function setState(data) {_state = [...data.hits];}
return [getState, setState];
}
const [getState, setState] = useState();



//TEMPLATE TO CREATE IMAGE GRID
function cardTemplate(data) { //create function that return the html
    const { hits, id, user, likes, views, webformatURL, userImageURL } = data;
    return `
    <div class="col-xs-4 col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4 mb-4">
        <div class="card" id="${data.id}">
            <a id="img-link" 
            href="#exampleModal" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
            onclick="insertModalDOM(getState(), ${data.id})">
                <span class="badge rounded-pill bg-dark views"><i class="fa fa-eye"> </i> ${data.views}</span>
                <span class="badge rounded-pill bg-dark likes"><i class="fa fa-heart"> </i> ${data.likes}</span>
                <img class="card-img-top" src="${data.webformatURL}" alt="${data.user}">
                <div class="overlay"><i class="fa fa-plus"></i></div>
            </a>
        </div>
    </div>`;
}


//TEMPLATE TO CREATE THE MODAL
function modalTemplate(data) { //create function that return the html
    const { id, user, tags, webformatURL, userImageURL, } = data;
    return `
        <div id="myModalContent" class="modal-header"><img src="${data.userImageURL}">
            <h5>${data.user}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div id="myModalBody" class="modal-body">
            
            <img src="${data.largeImageURL}" width="100%" class="modal-image">
            <div class="img-overlay">
            <a class="btn btn-light btn-sm" href="${data.pageURL}" role="button" target="_blank"><i class="fa fa-link"></i> Visit Profile</a>
            <a class="btn btn-light btn-sm" href="${data.largeImageURL}" role="button" target="_blank"><i class="fa fa-download"></i> Download</a>
            <div id="myModalTags">
            <div class="tags"><p><i class="fa fa-heart"></i> ${data.likes}</p></div>
            <div class="tags"><p><i class="fa fa-tag"></i> ${data.tags}</p></div>
            </div>
            </div>
        </div>`;
}

//TEMPLATE FOR MY RIGHTSIDEB BAR
function rightbarTemplate(data) { //create function that return the html
    const { id, user, tags, webformatURL, userImageURL } = data;
    return `
    <li class="list-group-item d-flex">
            <a id="img-link" 
            href="#exampleModal" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
            onclick="insertModalDOM(getState(), ${data.id})">
            <img src="${data.webformatURL}" width="100px">
            </a>
            <p>${data.user}<br /><span><i class="fa fa-heart"></i> ${data.likes}</span><span><i class="fa fa-eye"></i> ${data.views}</span>
            <span><i class="fa fa-download"></i> ${data.downloads}</span>
            </p>
    </li>`;
}


//FUNCTION TO INJECT THE IMAGES INTO THE DOM
function insertImagesDOM(data) {
    let images = data.filter((item, index) => index < 5).map((item) => cardTemplate(item)).join('');
    // console.log(images);
    imgContainer.innerHTML = `<div class="mySpinner"><div></div><div></div></div>`
    setTimeout(() => {
        imgContainer.innerHTML = images
    }, 1500)
}

//FUNCTION TO INJECT MODAL INTO THE DOM
function insertModalDOM(data, e) {
    let imageId = e;
    // console.log(imageId);
    data.forEach((item) => {
        if (item.id === imageId) {
            let images = modalTemplate(item)
            launchModal.innerHTML = images;
        } 
    });
}

// function handleSearchInputChange(e) {
//     const value = e.target.value.toLowerCase();
//     const data = getState();
//     const filteredItems = data.filter((item) => item.user.toLowerCase().includes(value));
//     insertImagesDOM(filteredItems);
// }

function handleEnter(e) { 
    if (e.key === "Enter") {
    searchImage();
    }
}



// GET AUTHOR NAMES 
function getUserNames(data) {
    const authors = data.map((item) => item.user);
    const uniqAuthor = [...new Set(authors)];
    return uniqAuthor;
}

//FUNCTION TO LOOP "data" AND TO INJECT THE AUTHOR NAMES INTO THE DOM
function selectAuthorDOM(data) {
    let author = ['<option selected value="all">All Authors</option>'];
    data.forEach((item) => {
        author.push(`<option value="${item}">${item}</option>`);
    });
    selectAuthor.innerHTML = author.join('');
}

//FUNCTOIN ATTACHED TO A EVENTLISTENER TO FILTER THE SELECTION WITH THE ITEMS STORED IN "data"
function handleSelectAuthor(e) {
const value = e.currentTarget.value.toLowerCase();
const data = getState();
    const filteredItems = data.filter((item) => value.toLowerCase() === 'all' ? item : item.user.toLowerCase() === value.toLowerCase()
    );
    insertImagesDOM(filteredItems);
}


//GET IMAGE TYPE NAMES
function getImageType(data) {
    const types = data.map((item) => item.type);
    const uniqTypes = [...new Set(types)];
    return uniqTypes;
}

//FUNCTION TO LOOP "data" AND TOINJECT THE IMAGE TYPE NAMES INTO THE DOM
function selectImageTypeDOM(data) {
    let imageType = ['<option selected value="all">All Types</option>'];
    data.forEach((item) => {
        imageType.push(`<option value="${item}">${item}</option>`);
    });
    selectType.innerHTML = imageType.join('');
}

//FUNCTION ATTACHED TO A EVENTLISTENER TO FILTER THE SELECTION WITH THE ITEMS STORED IN "data"
function handleSelectType(e) {
const value = e.currentTarget.value.toLowerCase(); 
const data = getState();
const filteredItems = data.filter((item) => value.toLowerCase() === 'all'? item: item.type.toLowerCase() === value.toLowerCase()
);
insertImagesDOM(filteredItems);
}


//FUNCTION TO DETECT WHICH RADIO WAS SELECTED AND RETURNING THE RESULT OF THE SELECTION
function radioOrientacion() {
    let numOrientations = document.getElementsByName('flexRadioDefault');
    let result = "all";
    for (let i = 0; i < numOrientations.length; i++) {
        result = document.querySelector('input[name="flexRadioDefault"]:checked').value  
    }
    // console.log(result);
    return result
}


//FUNCTION TO DETECT WHICH RADIO WAS SELECTED AND RETURNING THE RESULT OF THE SELECTION
function checkColor() {
    let colorSelected = document.getElementsByName('color');
    let checked = []
    for (let i = 0; i < colorSelected.length; i++) {
        if (colorSelected[i].checked) {
            checked.push(colorSelected[i].value)
        }
        var checkedColors = checked.join(',')   
    }
    return checkedColors
}

//FUNCTION TO ADD A CLASS IN THE SELECTED COLOR
function checkLabel() {
    let colorSelected = document.getElementsByName('color')
    let label = document.getElementsByClassName('color-select')
    let filter = document.getElementById("clean-filter")
    filter.style.opacity = "1";
    for (let i = 0; i < colorSelected.length; i++) {
        if (colorSelected[i].checked == true) {
            label[i].classList.add("checked")
            colorSelected[i].classList.add("checked")
        } else {
            label[i].classList.remove("checked")
            colorSelected[i].classList.add("checked")
        }
    }
}


//FUNCTION TO 
let mostPopularItem = async () => {
    let mostPopularTable = document.querySelector("#popular-list")
    let imagesPerPages = 20
    let query = `&per_page=${imagesPerPages}`
    let url = (auth + query)
    console.log(url)

    let response = await fetch(url)
    let data = await response.json()
    setState(data)
    let images = getState()

    images.sort((a,b)=> (a.likes < b.likes ? 1 : -1))
    let likes = images.filter((item, idx) => idx < 20).map((item) => rightbarTemplate(item)).join('');
    mostPopularTable.innerHTML = likes;
}


const refreshPage =  () => {
    window.location.reload();
}



let currentPage = 1
let totalPages = 0
let copyInput = ""
let copyValueTypeImage = ""
let copyValueOrientation = ""
let copyValueCategory = ""
let copyValueColor = ""

//FUNCTION TO DISPLAY IMAGES BASED ON A SEARCH TERM AND ALASO SOME FILTERS
let searchImage = async () => {
    let input = document.querySelector("#buscar").value
    let valueTypeImage = document.querySelector("#imageType").value
    let valueOrientation = document.querySelector('input[name="flexRadioDefault"]:checked').value
    let valueCategory = document.querySelector("#imgCategory").value
    let divPagination = document.querySelector("#pagination")
    divPagination.style.display = "none"
    let inputWithSpaces = input.replace(/ /g, '+');
    
    if (input === "") {
        mostrarError("#msg-error", "Please, type a searh term")
        return;
    }
    
    //SOME CONDITIONS TO GENERATE THE DEFAULT URL OR TO POPULATE IT BY TAKING VALUES FROM THE FORM
    if (input != copyInput || valueTypeImage != copyValueTypeImage || valueOrientation != copyValueOrientation || valueCategory != copyValueCategory) {
        currentPage = 1 
    }
    

    let orienta = radioOrientacion()
    let color = checkColor()
    let imgType = document.querySelector("#imageType").value
    let imgCategory = document.querySelector("#imgCategory").value
    let imagesPerPage = 6
    let query = `&q=${inputWithSpaces}&colors=${color}&image_type=${imgType}&category=${imgCategory}&orientation=${orienta}&per_page=${imagesPerPage}&page=${currentPage}`
    let url = (auth + query)

    let response = await fetch(url)
    let data = await response.json();
    setState(data)
    

    const images = getState();
    getUserNames(images)
    let imagesHTML = images.filter((item, index) => index < 9).map((item) => cardTemplate(item)).join('');

    const userNames = getUserNames(getState());
    selectAuthorDOM(userNames);
    const imageType = getImageType(getState());
    selectImageTypeDOM(imageType);

    divImgList = document.getElementById("api-data")
    divImgList.innerHTML = `<div class="mySpinner"><div></div><div></div></div>`

        
    totalPages = Math.ceil(data.totalHits / imagesPerPage)
    console.log("total: " + totalPages);
    console.log(url);

    let pagPrev = (currentPage === 1)?`<li class="page-item disabled"><a class="page-link" href="#prev" onclick="pagPrev()"><< Prev</a></li>`:`<li class="page-item"><a class="page-link" href="#prev" onclick="pagPrev()"><< Prev</a></li>`

    let pagNext = (currentPage === totalPages)?`<li class="page-item disabled"><a class="page-link" href="#prev" onclick="pagNext()">Next >></a></li>`:`<li class="page-item"><a class="page-link" href="#prev" onclick="pagNext()">Next >></a></li>`

    copyInput = input
    copyValueTypeImage = valueTypeImage
    copyValueOrientation = valueOrientation
    copyValueCategory = valueCategory

    setTimeout(() => {
        divImgList.innerHTML = imagesHTML
        divPagination.style.display = "flex"
        if (images.length != 0) {
            divPagination.innerHTML = `${pagPrev} ${pagNext}`
        } else {
        mostrarError("#msg-error", "No items for this search")
            divPagination.innerHTML = `   
            <div class="container col-xs-1 col-sm-12 mb-4 mt-4">             
                <div class="d-flex flex-column align-self-center mb-5">
                    <img src="./img/no-items.jpg" alt="No Items" width="426px" class="align-self-center">
                    <h1 class="text-center">No items found</h1>
                    <h3 class="text-center">Please, try to use a different search term</h3>
                </div>
            </div>`
        }
    }, 1500)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const pagPrev = () => {
    
    if (currentPage === 0) {
        return
    } else {
        currentPage--;
        searchImage();
    }
}
const pagNext = () => {
    
    if (currentPage>totalPages) {
        return
    } else {
        currentPage++
        searchImage();
    }
}

//FUNCTION TO SHOW POPUP ERROR FOR 2 SECONDS
const mostrarError = (element, message) => {
    divError = document.querySelector(element)
    divError.innerHTML = `<div class="alert alert-danger d-flex justify-content-center mt-4 w-50" role="alert">${message}</div>`
    setTimeout(() => { divError.innerHTML = ``;}, 2000)
}