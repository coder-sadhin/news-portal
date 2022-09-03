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
        <p onclick="getNews(${category.category_id})"> ${category.category_name}</p>
        `
        categoryContainer.appendChild(categoryList);
    });
}

getGategory();
// get news with id 
const getNews = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${newsId}`;
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.length)
    displayNews(data.data);
}


// display news 

const displayNews = (data) => {
    // console.log(data);
    const newsContainer = document.getElementById('news-container');
    data.forEach(news => {
        console.log(news.total_view);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML = `
        <div class="row p-3">
     
            <div class="col-sm-3">
                <img class="img-fluid w-100 rounded" src="${news.image_url}" alt="">
            </div>
            <div class="col-sm-9 ">
                <div class="p-3">
                    <p>Copy paste the HTML and CSS.</p>
                    <p>Change around the content for awsomenes</p>
                    <br>
                    <a href="#" class="btn btn-primary btn-sm float-right">Read More</a>
                </div>
                <div>
                    <div class="d-flex justify-content-around">
                        <div class="d-flex align-items-center ">
                            <div class="d-flex align-items-center">
                                <img class="author-img" src="${news.author.img}" alt="">
                            </div>
                            <div class="ms-3 d-flex align-items-center">
                                <div>
                                    <span class="fs-5 fw-semibold">Awlad Hossain</span>
                                    <p>UI Designer</p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-eye fs-4"></i>
                            </div>
                            <div class="ms-3 fw-bold d-flex align-items-center">
                                <p>${news.total_view}</p>
                            </div>
                        </div>
                       
                        <div></div>
                        <div></div>
                    </div> 
                </div>
            </div>
       
        </div>
        `
        newsContainer.appendChild(newsDiv);
    })
}


getNews(8);