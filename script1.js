const api_url = "http://www.omdbapi.com/?i=tt3896198&apikey=fc4b9e36&t=";
const x = localStorage.getItem('movieNameMovie');
console.log(x);

async function setMovie()
{
    // Making an API call (request)
    // and getting the response back
    const response = await fetch(api_url+x);
    // Parsing it to JSON format
    const data = await response.json();
    console.log(data);
    let div = document.getElementById('content');
    div.innerHTML = `<h1>${data.Title}</h1>
    <img src=${data.Poster}/>
    <h3>Languages Avaiable in:- ${data.Language} </h3>
    <p>Date of Release :- ${data.Released}</p>
    <p>Imdb Rating => ${data.imdbRating}</p>
    <h2>Duration :- ${data.Runtime}</h2>
    <p id="plot">${data.Plot}</p>
    <h4>${data.Actors}</h4>`;
}

setMovie();
