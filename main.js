const url = 'https://pixabay.com/api/?key=26639219-c988cadef2f5d334da840ad52&per_page=51';
// const url = 'https://communityoneapi.herokuapp.com/projects';

async function getData(url) {
const response = await fetch(url);
const data = await response.json();
return data;
}

async function handleInitialLoad() {
    const data = await getData(url);
    setState(data);

    const imageAuthor = getUserNames(getState());
    createSelectAuthor(imageAuthor);

    const imageType = getImageType(getState());
    createSelectImageType(imageType);

    insertImages(getState());
    
}

const imgContainer = document.querySelector('#api-data');
const searchField = document.querySelector('.search-bar');
const selectAuthor = document.querySelector('.select-author');
const selectType = document.querySelector('.select-type');

window.addEventListener('DOMContentLoaded', handleInitialLoad);
searchField.addEventListener('keyup', handleSearchInputChange);
selectAuthor.addEventListener('change', handleSelectAuthor);
selectType.addEventListener('change', handleSelectType);

function useState() {
let _state = null;
function getState() {return _state;}
function setState(data) {_state = [...data.hits];}
return [getState, setState];
}
const [getState, setState] = useState();


function insertImages(data) {
let items = data.map((item) => cardTemplate(item)).join('');
imgContainer.innerHTML = items;
}

function cardTemplate(data) {
    const { hits, id, user, likes, views, webformatURL, userImageURL } = data;
    return `
    
    <div class="col-sm-3 mb-4">
        <div class="card" id="${data.id}">
            <a id="img-link" 
            href="#exampleModal" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal">
                <span class="badge rounded-pill bg-dark views"><i class="fa fa-eye"> </i> ${data.views}</span>
                <span class="badge rounded-pill bg-dark likes"><i class="fa fa-heart"> </i> ${data.likes}</span>
                <img class="card-img-top" src="${data.webformatURL}" alt="${data.user}">
                <div class="overlay"><i class="fa fa-plus"></i></div>
            </a>
        </div>
    </div>`;
}


// GET USER NAMES FROM DATA
function getUserNames(data) {
    const users = data.map((item) => item.user);
    const uniqUserNames = [...new Set(users)];
    return uniqUserNames;
}

// GET IMAGE TYPE FROM DATA
function getImageType(data) {
    const types = data.map((item) => item.type);
    const uniqImageType = [...new Set(types)];
    return uniqImageType;
}

function handleSearchInputChange(e) {
    const value = e.target.value.toLowerCase();
    const data = getState();
    const filteredItems = data.filter((item) =>
        item.user.toLowerCase().includes(value)
    );
    insertImages(filteredItems);
}


function handleSelectAuthor(e) {
const value = e.currentTarget.value.toLowerCase();
const data = getState();
const filteredItems = data.filter((item) =>
value.toLowerCase() === 'all'
    ? item
    : item.user.toLowerCase() === value.toLowerCase()
);
insertImages(filteredItems);
}


function handleSelectType(e) {
const value = e.currentTarget.value.toLowerCase();
const data = getState();
const filteredItems = data.filter((item) =>
value.toLowerCase() === 'all'
    ? item
    : item.type.toLowerCase() === value.toLowerCase()
);
insertImages(filteredItems);
}



function createSelectAuthor(data) {
let itemsAuthor = ['<option selected value="all">All Authors</option>'];
data.forEach((item) => {
itemsAuthor.push(`<option value="${item}">${item}</option>`);
});
selectAuthor.innerHTML = itemsAuthor.join('');
}

function createSelectImageType(data) {
let itemsType = ['<option selected value="all">All Types</option>'];
data.forEach((item) => {
itemsType.push(`<option value="${item}">${item}</option>`);
});
selectType.innerHTML = itemsType.join('');
}




