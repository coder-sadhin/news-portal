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

const getNews = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${newsId}`;
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.length)
    console.log(data.data);
}
