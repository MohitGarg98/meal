const selectDish = document.getElementById('select-dish');

function addDishFunc(params) {
    var dishArr = params.split(",");
    console.log(dishArr);
    var dishContainer = document.createElement("div");
    dishContainer.setAttribute("class", "dish");
    var select = document.createElement("select");
    select.setAttribute("name", "dish");
    for (let i = 0; i < dishArr.length; i++) {
        var dish = dishArr[i];
        var option = document.createElement("option");
        option.textContent = dish;
        option.value = dish;
        select.appendChild(option);        
    }

    dishContainer.innerHTML = `<span class="text">Please Select a Dish: </span>`;
    dishContainer.appendChild(select);

    var serveNum = document.createElement("div");
    serveNum.setAttribute("class", "serve-num");
    serveNum.innerHTML = `
        <span class="text">Please Enter Number of Servings:</span>
        <input type="number" name="no_of_serve" id="no-of-serve" required>
    `;
    dishContainer.appendChild(serveNum);

    selectDish.appendChild(dishContainer);
}