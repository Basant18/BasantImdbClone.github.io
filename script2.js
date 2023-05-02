const api_url = "https://www.omdbapi.com/?i=tt3896198&apikey=fc4b9e36&t=";
//Getting ul list tag
let list = document.getElementById('myList');
let string;
let movies;
const x = localStorage.getItem('movieNameFav');
console.log(x);

async function addMovie()
{
    if(x == null)
    {
        return;
    }
    // Making an API call (request)
    // and getting the response back
    const response = await fetch(api_url+x);
    // Parsing it to JSON format
    const data = await response.json()
    //console.log(data);
    let found = movies.find((element) => {return element == data.Title});
    if(!found)
    {
        //adding movie into the localStorage movie for future reference
        movies.push(data.Title);
        string = JSON.stringify(movies);
        localStorage.setItem('movies',string);
        console.log(localStorage.getItem('movies'));
        //creating new li tag inside ul tag and adding data into it
        let li = document.createElement("li");
        li.setAttribute("id",data.Title);
        li.innerHTML = `<h1>${data.Title}</h1>
        <img src=${data.Poster} alt="Movie Image" height="150px" width="150px">
        <button onclick="deleteMovie('${data.Title}')">Remove Favourite</button>`;
        list.appendChild(li);
        let collections = document.getElementsByTagName('li');
        // This is done to loop over all the li  tags
        let collectionsList = Array.prototype.slice.call(collections);
        collectionsList.forEach((item) => {
            item.addEventListener('mouseover',()=>{item.style.backgroundColor = "grey"});
            item.addEventListener('mouseout',()=>{item.style.backgroundColor = "white"});
        });
    }
}

function deleteMovie(title)
{
    let collections = document.getElementsByTagName('li');
    // This is done to loop over all the li  tags
    let collectionsList = Array.prototype.slice.call(collections);
    collectionsList.forEach((item) => {
        //matching title with the movie title store in localStorage movie
        if(item.id == title)
        {
            list.removeChild(item);
        }
    });
    //delete the movie from localStorage movie
    movies.pop(title);
    string = JSON.stringify(movies);
    localStorage.setItem('movies',string);
}


async function setMovies()
{
    //Here we loop through all the movies stored in localStorage movie and put them into li tags
    string = localStorage.getItem('movies');
    movies = JSON.parse(string);
    console.log(movies);
    if(movies.length == 0)
    {
        addMovie();
        return;
    }
    for(let i=0;i<movies.length;i++)
    {
        // Making an API call (request)
        // and getting the response back
        const response = await fetch(api_url+movies[i]);
        // Parsing it to JSON format
        const data = await response.json();
        //console.log(data);
        //check if data entered is present in the backend
        if(data.Response == "True")
        {
            //creating new li tag inside ul tag and adding data into it
            let li = document.createElement("li");
            li.innerHTML = `<h1>${data.Title}</h1>
            <img src=${data.Poster} alt="Movie Image" height="150px" width="150px">
            <button onclick="deleteMovie('li','title')">Remove Favourite</button>`;
            list.appendChild(li);
            let collections = document.getElementsByTagName('li');
            let collectionsList = Array.prototype.slice.call(collections);
            collectionsList.forEach((item) => {
               item.addEventListener('mouseover',()=>{item.style.backgroundColor = "grey"});
               item.addEventListener('mouseout',()=>{item.style.backgroundColor = "white"});
            }); 
        }
    }
    addMovie();
}

setMovies();
