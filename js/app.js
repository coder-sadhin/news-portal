// catagory js code 

const getGategory = async () => {
    // get api 
    const url = 'https://openapi.programming-hero.com/api/news/categories';

    const res = await fetch(url);
    const data = await res.json();

    displayCategory(data.data.news_category);
}

// display category on web page 

const displayCategory = (data) => {
    // console.log(data);

    const categoryContainer = document.getElementById('category-container');
    data.forEach(category => {
        const categoryList = document.createElement('div');
        categoryList.classList.add('btn', 'fs-4', 'text-secondary');
        categoryList.innerHTML = `
        <p onclick="getNews(${category.category_id},'${category.category_name}')"> ${category.category_name}</p>
        `
        categoryContainer.appendChild(categoryList);
    });
}

getGategory();
// get news with id 
const getNews = async (newsId, categoryName = "All News") => {
    const showCategory = document.getElementById('category-name');
    const itemOfCategory = document.getElementById('item-of-category');
    const displayNoNews = document.getElementById('no-news');

    const url = `https://openapi.programming-hero.com/api/news/category/0${newsId}`;
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    showCategory.innerText = categoryName;
    const newsCount = data.data.length;
    itemOfCategory.innerText = newsCount;

    if (newsCount > 0) {
        displayNoNews.classList.add('d-none');
        displayNews(data.data);

    }
    else {
        displayNoNews.classList.remove('d-none');
        displayNews(data.data);
    };


}


// display news 

const displayNews = (data) => {
    // console.log(data);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerText = '';
    data.forEach(news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'my-4');
        newsDiv.innerHTML = `
        <div class="row p-3">
     
            <div class="col-sm-4">
                <img style="object-fit: cover;" class="img-fluid w-100 h-100 rounded-lg" src="${news.image_url}" alt="">
            </div>
            <div class="col-sm-8 ">
                <div class="p-3">
                    <h2>${news.title}.</h2>
                    <p>${news.details ? news.details.substring(0, 250) : " No Any Details"}</p>
                    <p>${news.details ? news.details.substring(250, 400) : " No Any Details"}...</p>
                </div>
                <div>
                    <div class="d-flex justify-content-around">
                        <div class="d-flex align-items-center ">
                            <div class="d-flex align-items-center">
                                <img class="author-img" src="${news.author.img}" alt="">
                            </div>
                            <div class="ms-3 d-flex align-items-center">
                                <div>
                                    <span class="fs-5 fw-semibold">${news.author.name ? news.author.name : "No Author"}</span>
                                    <p>${news.author.published_date}</p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <p class="fw-bold"><i class="fa-solid fa-eye me-2"></i>${news.total_view ? news.total_view : "No data"}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <p class="fw-bold"><i class="fa-solid fa-star me-2"></i>${news.rating ? news.rating.number : "No Rating"}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <p class="fw-bold fs-5"><i class="fa-solid text-primary fa-arrow-right"></i></p>
                        </div>
                    </div> 
                </div>
            </div>
       
        </div>
        `
        newsContainer.appendChild(newsDiv);
    })
}


getNews(8);




// function for splilt and join details 

const splitJoin = (data, from, end) => {

    const dataArray = data.split(". ");
    const sliceArray = dataArray.slice(from, end);
    // console.log(sliceArray.join('.'));
    return sliceArray.join('.');

}