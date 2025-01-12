cart_items = document.getElementById("cart-items")
fav_items = document.getElementById("fav-items")
counter = document.getElementById("counter")
fav_counter = document.getElementById("fav-counter")

total = document.getElementById("total-price")
var subtotal =0;




counter.innerHTML = JSON.parse(localStorage.getItem("cart-items")).length;
fav_counter.innerHTML = JSON.parse(localStorage.getItem("fav-items")).length;

api = new XMLHttpRequest()
api.open("GET","./B.Tech.json")


api.onload = function () {
    if (api.status === 200) {
        const data = JSON.parse(api.responseText);

        displayProducts(data.categories);
    } else {
        console.error("Error loading JSON:", api.statusText);
    }
};


api.onerror = function () {
    console.error("Network Error");
};

api.send()


function displayProducts(categories) {

    categories.forEach((category) => {

        category.products.forEach(product => { 

            JSON.parse(localStorage.getItem("cart-items")).forEach(cart =>{
                
            
                if (category.id == cart.c_id )
                {
                    if(product.id == cart.p_id){

                        subtotal += parseInt(product.price.toFixed(2));

                        cart_items.innerHTML += `

                            <div class="product" id="_${product.id}">

                                <div class="cart-p-img">
                                    <img src="${product.img}" alt="${product.title}">
                                </div>
                                <div class="descrpt">
                                    <h3>${product.title}</h3>
                                    <p class="product-description">${product.description}</p>
                                    <p class="product-price">${product.price.toFixed(2)} $</p>
                                    
                                </div>  
                                <div class="action">  
                                    <select calss="num">
                                        <option value="1"> 1 </option>
                                        <option value="2"> 2 </option>
                                    </select>
                                    <a class="delete" href="" onclick="remove_cart(${category.id},${product.id})"><img src="./Images/delete-trash.png">Remove</a><br>
                                    <a class="delete" href="" onclick="add_fav(${category.id},${product.id})"><img src="./Images/fav1.png">Save to later</a>
                                    

                            </div>`;


                        document.getElementById("q").innerHTML=counter.innerHTML;
                        document.getElementById("sub").innerHTML=subtotal;
                    }
                }
                    

            })
        
            JSON.parse(localStorage.getItem("fav-items")).forEach(fav =>{
                if (fav.c_id == category.id) {
                    if (fav.p_id == product.id) {
                                    
                               
                            fav_items.innerHTML += `
                                <div class="hide" id="${product.id}">
                                <div class="cart-p-img">
                                    <img src="${product.img}" alt="${product.title}">
                                </div>
                                <div class="descrpt">
                                    <h3>${product.title}</h3>
                                    <p class="product-description">${product.description}</p>
                                    <p class="product-price">${product.price.toFixed(2)} $</p>
                                    
                                </div>  
                                <div class="action">  
                                  
                                    <a href=""><button class="add-to-cart"   onclick="add_cart(${category.id},${product.id})" >Add to cart</button></a>
                                    <a class="delete" href=""onclick="remove_fav(${category.id},${product.id})" ><img src="./Images/delete-trash.png">Remove</a><br>
                                    

                                    </div>`;
                    }
                }
            })
        })
    })
}
        
                    
            
            
        
    
    


            
        


                    
                                
        

                
            
          
 
    

function show () {
    fav_product= document.querySelectorAll(".hide")
    fav_product.forEach(one => {one.classList.toggle('show')})

    rotate = document.querySelector(".arrow")
    rotate.classList.toggle('rotate')
   
}
function  remove_cart(c_id , p_id) {
    cart =  JSON.parse(localStorage.getItem("cart-items"));
    i=cart.indexOf(`{c_id:${c_id},p_id:${p_id}}`)
    cart.splice(i,1)
    localStorage.setItem("cart-items",JSON.stringify(cart));

}

function remove_fav(c_id,p_id) {
    fav = JSON.parse(localStorage.getItem("fav-items"));
    i=fav.indexOf(`{c_id:"${c_id}",p_id:"${p_id}"}`)
    fav.splice(i,1)
    localStorage.setItem("fav-items",JSON.stringify(fav));
    
}
function  add_cart(c_id , p_id) {
    cart =  JSON.parse(localStorage.getItem("cart-items"));
    cart.push({ c_id : c_id , p_id : p_id })
    localStorage.setItem("cart-items",JSON.stringify(cart));

}

function add_fav(c_id,p_id) {
    fav = JSON.parse(localStorage.getItem("fav-items"));
    fav.push({c_id: c_id, p_id: p_id});
    
    localStorage.setItem("fav-items", JSON.stringify(fav));
    
}


