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
        categoryList.classList.add('btn', 'fs-4', 'text-secondary', 'row');
        categoryList.innerHTML = `
        <p id="categori-section-item" onclick="getNews(${category.category_id},'${category.category_name}')"> ${category.category_name}</p>
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
    toggoleSpining(true);
    console.log(data[0].total_view);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerText = '';

    // news sorting by viws 
    data.sort(function (a, b) {
        return b.total_view - a.total_view;
    });
    data.forEach(news => {
        console.log(news.author.img);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'my-4');
        newsDiv.innerHTML = `
        <div onclick="detailsModal('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsModal" class="row p-3  d-flex flex-column flex-sm-row flex-md-row flex-lg-row">
     
            <div class="col-sm-4">
                <img style="object-fit: cover;" class="img-fluid w-100 h-100 rounded" src="${news.image_url}" alt="">
            </div>
            <div class="col-sm-8">
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
                                    <p>${news.author.published_date ? news.author.published_date : "no data found"}</p>
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
        toggoleSpining(false);
    })
}

getNews(8);


// model show function here 
const detailsModal = async (newsId) => {
    // console.log(data);
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    const res = await fetch(url);
    const data = await res.json();

    setModalData(data.data[0]);
}

const setModalData = (data) => {
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = data.title;
    const modalContainer = document.getElementById('modal-body');
    modalContainer.innerText = '';
    const innerModal = document.createElement('div');
    innerModal.classList.add('card', 'w-100');
    innerModal.innerHTML = `
            <div class="m-auto">
            <img src="${data.thumbnail_url}" class="card-img-top w-100 pt-3" alt="...">
            </div>
            <div class="card-body">
             <p class="card-text fs-4 fw-bold"><span class="text-info">Publisher Name: </span>${data.author ? data.author.name : "No data found"}.</p>
             <p class="card-text fs-5 fw-bold"><span class="text-info">Published Date: </span>${data.author.published_date ? data.author.published_date : "No data found"}.</p>
             <p class="card-text fs-5 fw-bold"><span class="text-info pe-2">Total Views: </span>${data.total_view ? data.total_view : "No data found"}.</p>
            </div>
`
    modalContainer.appendChild(innerModal);
}


const toggoleSpining = isLoading => {
    const spinnerDiv = document.getElementById('spinner-div');
    if (isLoading) {
        spinnerDiv.classList.remove('d-none');
    }
    else {
        spinnerDiv.classList.add('d-none')
    }
}