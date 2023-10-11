const API_KEY = "91976ec44a2d4f9ba6028edc8a037637"
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"))

const reload = () => {
    window.location.reload();
}

const fetchNews = async (query) => {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`)
    const data = await res.json()
    blindData(data.articles)
}

const blindData = (articles) => {
    const cardsContainer = document.getElementById("cards-container")
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

const fillDataInCard = (cardClone, article) => {
    const newsImg = cardClone.querySelector("#news-img")
    const newsTitle = cardClone.querySelector("#news-title")
    const newsSource = cardClone.querySelector("#news-source")
    const newsDesc = cardClone.querySelector("#news-desc")

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description

    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} ${date}`

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
const onNavItemClick = (id) => {
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')
}

const searchBtn = document.getElementById ("search-btn");
const searchInput = document.getElementById("news-input");


searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query)
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})