const API_KEY = "81a838f41d85405c987097a123d0833a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchnews("Technology"))

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    bindData(data.articles)
}

function bindData(articles){
    const cardscontainer = document.getElementById("contact")
    const template = document.getElementById("template-news")

    cardscontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return
        const cardclone = template.content.cloneNode(true)
        fillDatainCard (cardclone,article)
        cardscontainer.appendChild(cardclone)
    });

}
function fillDatainCard(cardclone,article){
    const newsimage = cardclone.querySelector(`#newsimg`)
    const newstitle = cardclone.querySelector(`#newstitle`)
    const newsdate = cardclone.querySelector(`#newsdate`)
    const newsinfo = cardclone.querySelector(`#newsinfo`)

    newsimage.src = article.urlToImage
    newstitle.innerHTML = article.title
    newsinfo.innerHTML = article.description
    
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/Jakarta"})

    newsdate.innerHTML = `${article.source.name}  ${date}`

    cardclone.firstElementChild.addEventListener("click",() => {
          window.open(article.url, "_blank")
    })

}
