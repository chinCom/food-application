const searchFood = document.getElementById('search-food');
const submitFood = document.getElementById('submit-food');
const srchFail = document.getElementById('srch-fail');
const renderTest = document.getElementById('meal');
const learnMoreBtn = document.getElementById('learn-more-btn');
const randomMeal = document.getElementById('random-meal');
let testsomecase = '';


/* note: link API lấy từ https://www.themealdb.com/api.php */
/*
Search meal by name
    www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

List all meals by first letter
    www.themealdb.com/api/json/v1/1/search.php?f=a

Lookup full meal details by id
    www.themealdb.com/api/json/v1/1/lookup.php?i=52772

Lookup a single random meal
    www.themealdb.com/api/json/v1/1/random.php
    
Lookup a selection of 10 random meals (only available to Paypal supporters)
    www.themealdb.com/api/json/v1/1/randomselection.php

List all meal categories
    www.themealdb.com/api/json/v1/1/categories.php

Latest Meals (only available to Paypal supporters)
    www.themealdb.com/api/json/v1/1/latest.php

List all Categories, Area, Ingredients
    www.themealdb.com/api/json/v1/1/list.php?c=list
    www.themealdb.com/api/json/v1/1/list.php?a=list
    www.themealdb.com/api/json/v1/1/list.php?i=list

Filter by main ingredient
    www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

Filter by multi-ingredient (only available to Paypal supporters)
    www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast,garlic,salt

Filter by Category
    www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

Filter by Area
    www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

/* 

src="${meal.strMealThumb}"
<p style="font-weight: bold;font-family: Philosopher, sans-serif;font-size: 25px;">${meal.strMeal}</p>
                                <p style="font-family: Philosopher, sans-serif;font-weight: bold;font-size: 25px;">${getRandomNumber()}$
*/

/* Random meal */
function getRandomMeal(e) {
    e.preventDefault();
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const meal = data.meals[0];
            /* Mỗi lần chỉ render 3 loại thức ăn */
            for (let i = 0; i < 3; i++) {
                addMealToDOM(meal);
            }
        });

}

/* Add meal to DOM and render it */
function addMealToDOM(meal) {
    const ingredients = [];
    console.log(meal.strIngredient1);
    for (let i = 0; i < 3; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            console.log('test');
        } else {
            break;
        }
    }

    console.log(ingredients + 'test');

    renderToDom(meal);

}


/* cho phép mỗi lần chỉ render 3 hình */
let displayImageCouter = 3;

// Tìm kiếm món ăn
async function searchForFood(e) {
    try {
        e.preventDefault();

        const foodName = searchFood.value;// lấy giá trị từ ô input và đọc

        console.log(foodName);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
        const data = await response.json();

        console.log(data);
        /* check if users doesn't input any value */
        if ((e.target === submitFood && foodName.length === 0) || data.meals === null) {

            srchFail.innerHTML = `
                <p style="font-size: 26px;font-weight: bold;font-style: italic;text-decoration: underline;color: var(--bs-red);">Sorry, we couldn&#39;t find any food with that name</p>
                `
        }

        /* after users input valid value,  */
        else {
            displayImageCouter = 3;

            srchFail.innerHTML = '';

            renderToDom(data);


            // Khi người dùng click chuột vào nút Learn More thì sẽ hiện ra 3 món ăn tiếp theo
            learnMoreBtn.addEventListener('click', () => {
                displayImageCouter += 3;
                if (displayImageCouter >= data.meals.length) {
                    learnMoreBtn.style.display = 'none';
                }
                /* render to dom */
                renderToDom(data);
            });
        }
        searchFood.value = '';

    } catch (error) {
        console.log(error);
    }


}


function renderToDom(data) {
    renderTest.innerHTML = data.meals.slice(0, displayImageCouter).map(meal => `
                <div class="col-sm-5 col-md-4 col-xl-3"
                style="margin-bottom: 50px;margin-left: 4px;margin-right:4px;margin-top:4px;padding-left: 0px;padding-right: 0px;border-top-left-radius: 65px;border-bottom-right-radius: 10px;border-bottom-left-radius: 10px;border: 0.5px solid var(--bs-gray-400);">
                <div class="d-xl-flex justify-content-xl-center" style="border-top-left-radius: 65px;">
                    <img src="${meal.strMealThumb}"
                        style="width: 100%;border-top-left-radius: 65px;border-bottom-right-radius: 65px;">
                </div>
                <div class="row"
                    style="padding-left: 23px;padding-right: 23px;padding-top: 15px;padding-bottom: 15px;">
                    <div class="col">
                        <div class="row">
                            <div class="col-12 offset-0 d-flex d-sm-flex d-md-flex d-xl-flex justify-content-between">
                                <p style="font-weight: bold;font-family: Philosopher, sans-serif;font-size: 25px;">${meal.strMeal}</p>
                                <p style="font-family: Philosopher, sans-serif;font-weight: bold;font-size: 25px;">${getRandomNumber()}$
                                </p>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col d-xl-flex">
                                <p class="d-xl-flex" style="font-family: Roboto, sans-serif;color: #150C01;">There are
                                    many things are needed to start the Fast Food Business.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col d-flex d-xl-flex justify-content-between align-items-xl-center"
                                style="margin-top: 14px;"><span
                                    class="d-xl-flex justify-content-xl-center align-items-xl-center"
                                    style="background: #DC780B;border-radius: 11px;">
                                    <a href="#menu" id="meal-btn"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                            fill="currentColor" viewBox="0 0 16 16" class="bi bi-plus"
                                            style="font-size: 30px;color: white;padding-left: 0px;padding-right: 0px;padding-top: 0px;padding-bottom: 0px;margin-top: 7px;margin-bottom: 7px;margin-left: 7px;margin-right: 7px;">
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                                            </path>
                                        </svg></a></span>
                                <div class="d-xl-flex justify-content-xl-center" style="color: #DC780B;"><svg
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                        height="1em" fill="currentColor" style="color: #DC780B;">
                                        <path
                                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                        height="1em" fill="currentColor" style="color: #DC780B;">
                                        <path
                                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                        height="1em" fill="currentColor" style="color: #DC780B;">
                                        <path
                                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                        height="1em" fill="currentColor" style="color: #DC780B;">
                                        <path
                                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em"
                                        height="1em" fill="currentColor" style="color: #DC780B;">
                                        <path
                                            d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z">
                                        </path>
                                    </svg></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `).join('');
}



// function get random number for price of food range 100
function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

randomMeal.addEventListener('click', searchForFood);
submitFood.addEventListener('submit', searchForFood);
