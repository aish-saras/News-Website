console.log("news website")
// f55314020cb54890a867c399f650cbb2

//initializing variables

let source = 'bbc-news';
let apiKey = 'f55314020cb54890a867c399f650cbb2';

// grab the news accordian

const newsAccordian = document.getElementById("newsAccordian");
const searchBox = document.querySelector("#searchBox");

searchBox.addEventListener('keyup', searchNews);

// create an ajax GET request

const xhr = new XMLHttpRequest();

xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

// what to do when response is ready
xhr.onload = function () {
    if (this.status == 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        // console.log(articles);

        let newsHTML = '';
        console.log(articles);
        articles.forEach(function (element, index) {

            let newNews = ` <div class="card forSearch">
            <div class="card-header" id="heading${index}">
            
            <h5><span class="badge badge text-primary"> Breaking News ${index + 1}: </span></h5>
            <button class="btn btn-link btn-block text-left collapsed titleBtn" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
            ${element["title"]}
            </button>
            
            </div>
            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample">
            <div class="card-body">
            <div class="card" style="width: 18rem;">
  <img src="${element.urlToImage}" class="card-img-top" alt="No Img available">
  <div class="card-body">
    <p class="card-text">${element.author}</p>
  </div>
</div>
            <br>${element["content"]}
            <br>
            <h5><a href="${element.url}"class="badge badge-info">Read More</a></h5>

            </div>
            </div>
            </div>
            `
                ;

            newsHTML += newNews;
        });
        accordionExample.innerHTML = newsHTML;
        document.getElementById('collapse0').classList.add('show')


    }
    else {
        console.log("some error occured");
    }
};


xhr.send();

function searchNews(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    (document.querySelectorAll(".titleBtn")).forEach(function (element, index) {
        //  console.log(element);
        const searchTitle = element.textContent;
        console.log(searchTitle);

        if (searchTitle.toLowerCase().indexOf(text) != -1) {
            element.parentElement.parentElement.style.display = 'block';
        }
        else
            element.parentElement.parentElement.style.display = 'none';


    });
}
