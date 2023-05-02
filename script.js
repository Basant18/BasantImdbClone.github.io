const api_url = "https://www.omdbapi.com/?i=tt3896198&apikey=fc4b9e36&t=";
let arr = localStorage.getItem('movies');
//here I am using localStorage to store data and transfer it among html pages
//movies is storing all the favourite movies in localStorage
if(arr == null)
{
    let arr1 = [];
    let string = JSON.stringify(arr1);
    localStorage.setItem('movies',string);
    console.log(localStorage.getItem('movies'));
}


async function getMovies()
{
    // Getting the user entered value and appending in url
    let x = document.getElementById('search').value;
    console.log(x);
    // Making an API call (request)
    // and getting the response back
    const response = await fetch(api_url+x);
    // Parsing it to JSON format
    const data = await response.json();
    console.log(data);
    //Getting ul list tag
    let list = document.getElementById('myList');
    //Remove the previous data if any
    list.innerHTML = '';
    //check if data entered is present in the backend
    if(data.Response == "True")
    {
        //creating new li tag inside ul tag and adding data into it
        let li = document.createElement("li");
        li.innerHTML = `<a id="li_link" href = "movie.html">
        <img src=${data.Poster} alt="Movie Image" height="150px" width="150px">
        <h2>${data.Title}</h2>
        </a>
        <div id="ratings-link">
        <p>Imdb Ratings => ${data.imdbRating}</p>
        <a id="fav_link" href="favourite.html">Add to Favourites</a>
        </div>`;
        //here I am storing movie title so that it can be passed to movie.html page
        localStorage.setItem('movieNameMovie',x);
        list.appendChild(li);
        let collections = document.getElementsByTagName('li');
        //This is used to loop over all the li tags
        let collectionsList = Array.prototype.slice.call(collections);
        //Adding events on li tags
        collectionsList.forEach((item) => {
            let a = document.getElementById('fav_link');
            a.addEventListener('click',()=>{localStorage.setItem('movieNameFav',data.Title)});
            item.addEventListener('mouseover',()=>{item.style.backgroundColor = "grey"});
            item.addEventListener('mouseout',()=>{item.style.backgroundColor = "white"});
        });
    }
}

document.getElementById('search').addEventListener("keyup",getMovies);
