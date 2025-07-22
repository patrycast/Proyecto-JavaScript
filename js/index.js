const muebles= document.querySelector("#muebles");
const showMoreBtn= document.querySelector(".btn_load");
const categories= document.querySelector(".categories");
const categoryList= document.querySelectorAll(".category");


const carritoBtn=document.querySelector(".carrito-container"); //carrito
const cartModal=document.querySelector(".card-carrito");  //modal
const menuBtn = document.querySelector(".menu-label"); //menu hamburguesa
const menu= document.querySelector(".navbar-ul"); //ul

const productCard=document.querySelector(".card-container");
const overlay= document.querySelector(".overlay");
const total= document.querySelector(".total")
const addModal= document.querySelector(".modal");

const emptyCart= document.querySelector(".btn-vaciar");
const buyBtn= document.querySelector(".btn-comprar");
const cartBadge= document.querySelector(".carrito-badge");

let cart= JSON.parse(localStorage.getItem("cart")) || [];

const jsonCart= ()=> localStorage.setItem("cart", JSON.stringify(cart))



//template
const createProductTemplate=(producto)=>{
    const {id,name, img, price, txt}= producto
    return `
    <div class="muebles__container">
        <div class="card__muebles">
            <div class="mueble__img">
                <img src="${img}" alt="${name}">
            </div>
            <p>${name}</p>
            <span>U$D ${price}</span>
            <button class="btn-carrito"
            data-id='${id}'
            data-name='${name}'
            data-price='${price}'
            data-img='${img}'
            >${txt}</button>
        </div>        
    </div`

}

//renderizar productos
const renderProducts=(products)=>{
    muebles.innerHTML +=products.map(
        createProductTemplate).join("");
}



//mostrar mas productos
const getMoreProducts= ()=>{
    appState.currentProductIndex+=1;
    
    let {products, currentProductIndex, productLimit}=appState
    renderProducts(products[currentProductIndex])

    if(currentProductIndex === productLimit -1){
        showMoreBtn.classList.add("hidden")
    }
}

//filtros
const isInactiveFilter=(e)=>{
    return (e.classList.contains("category") && !e.classList.contains("active"))
}

//cambio de color active
const changeColorActive=(activeFilter)=> {
    const categories= [...categoryList]
    categories.forEach((categoryBtn)=>{
        if(categoryBtn.dataset.category !== activeFilter){
            categoryBtn.classList.remove("active")
            return;
        };
        categoryBtn.classList.add("active")
    });
   
};

const changeFilter=(btn)=>{
    appState.activeFilter=btn.dataset.category
    changeColorActive(appState.activeFilter)
    console.log(appState)
    if(!appState.activeFilter){
        showMoreBtn.classList.remove("hidden");
        return;
    }
    showMoreBtn.classList.add("hidden");
}

const addFilter=(e)=>{
    if(!isInactiveFilter(e.target))return;
    changeFilter(e.target)

    muebles.innerHTML="";

    if (appState.activeFilter){
        const filteredProducts=productsData.filter((product)  => 
            product.Category === appState.activeFilter)
            renderProducts(filteredProducts);
            return;
        }
        renderProducts(appState.products[0])
}




//logica menu
const switchMenu = () => {
    menu.classList.toggle("open-menu");
    if (cartModal.classList.contains("open-cart")) {
        cartModal.classList.remove("open-cart");
    }
}


//  carrito
const switchCart = () => {
    cartModal.classList.toggle("open-cart");
    if (menu.classList.contains("open-menu")) {
        menu.classList.remove("open-menu"); 
    }
    overlay.classList.toggle("overlayActive")

}

const closeMenuCart= ()=>{
    if(menu.classList.contains("open-menu") || cartModal.classList.contains("open-cart")){
        menu.classList.remove("open-menu")
        cartModal.classList.remove("open-cart")
        overlay.classList.remove("overlayActive")
    }
}


//logica carrito     
const createCartHTML=(cartProduct) =>{
    const {id, name, price, img, quantity} =cartProduct
    return `
      <div class="cart-prod">
            <img src="${img}" alt="${name}" />
           
              <h3 class="prod-title">${name}</h3>
              <div class="prod-price">USD ${price}</div>
           
            <div class="prod-quantity">
              <span class="quantity-controller down" data-id='${id}'>-</span>
              <span class="item-quantity">${quantity}</span>
              <span class="quantity-controller up" data-id='${id}'>+</span>
            </div>
          </div>
  `
};

const renderCart= ()=>{
    if(!cart.length){
        productCard.innerHTML=`<p class="renderCart-p">No hay Productos</p>`
        return;
    }
    productCard.innerHTML= cart.map(createCartHTML).join("");
}

const cartTotal = () => {
    const total = cart.reduce((acc, cur) => {
        const price = parseFloat(cur.price); 
        const quantity = parseInt(cur.quantity, 10);  
    
        if (isNaN(price) || isNaN(quantity)) {
            console.log(`Datos inválidos en el producto: ${cur.name}, Precio: ${cur.price}, Cantidad: ${cur.quantity}`);
            return acc;
        }

        return acc + (price * quantity);
    }, 0);
    return total;
};

const showTotal= ()=>{
    total.textContent= ` USD ${cartTotal()}`

}

const renderBadge= ()=>{
    cartBadge.textContent= cart.reduce( (acc,cur)=>
    acc + cur.quantity,0)
}


const disableButton= (btn) =>{
    if(!cart.length){
        btn.classList.add("disabled");
    }else{
        btn.classList.remove("disabled");
    }
}


//funcion integradora
const modifyCartState= ()=>{
    jsonCart()
    cartTotal()
    renderCart()
    showTotal()
    renderBadge()
    disableButton(buyBtn)
    disableButton(emptyCart)
}

const showAddModal =(msg)=>{
    addModal.classList.add("activeModal")
    addModal.innerHTML=msg
    setTimeout(() =>{
        addModal.classList.remove("activeModal")
    }, 2000)
}

const addMueble= (e) =>{
    if(!e.target.classList.contains("btn-carrito")) return;
    const mueble= dataMueble(e.target.dataset)

    if( isProductInCart(mueble)){
        appendUnitToProduct(mueble)
    }else{
        cart=[...cart, {...mueble, quantity: 1}]}
        modifyCartState();
        showAddModal("El producto se agregó al carrito")
        console.log(cart);
    }


const appendUnitToProduct= (mueble)=>{
    cart=cart.map((cartProduct)=> cartProduct.id === mueble.id
    ? {...cartProduct, quantity: cartProduct.quantity+1}
    : cartProduct)
}    

const dataMueble=(mueble)=>{
    const {id, name, price, img}= mueble;
    return {id, name, price, img}
}   

const isProductInCart = (mueble) => {
    return cart.find((item) => item.id === mueble.id);
}

const incrementQuantityPlus=(id) =>{
    const isProductInCart= cart.find(item => item.id === id)
    console.log(isProductInCart)
    appendUnitToProduct(isProductInCart)
}


const handleReduceEvent=(id) => {
    const isProductInCart= cart.find(item => item.id === id)
    console.log(isProductInCart)

    if(isProductInCart.quantity ===1){
        if(window.confirm("¿Deseas eliminar el producto del carrito?")){
            deleteProduct(isProductInCart)
        }
        return
    }

    reduceProductUnit(isProductInCart)
    modifyCartState();  
}

const deleteProduct=(existingProduct) =>{
    cart= cart.filter((product) => product.id !== existingProduct.id )
    modifyCartState()
}


const reduceProductUnit=(existingProduct) =>{
    cart= cart.map(product =>{
        return product.id === existingProduct.id
        ? {...product, quantity: Number(product.quantity) -1}
        :product
    })
}


const controlQuantity= (e) =>{
    console.log(e.target)
    if(e.target.classList.contains("down")){ 
        console.log("resta")
        handleReduceEvent(e.target.dataset.id)
    }else if(e.target.classList.contains("up")){
        incrementQuantityPlus(e.target.dataset.id)
    }
    modifyCartState();
}






const resetCart= ()=>{
    cart=[];
    modifyCartState(); 
}

const confirmCartAction= (confirmMsg, successMsg)=>{
    if (!cart.length) return;
    if( window.confirm(confirmMsg)){
        resetCart()
        alert(successMsg)
    }
}

const removerCart= ()=>{
   confirmCartAction(
    "Deseas vaciar el carrito?",
    "No hay productos en el carrito"
   )
}

const finishBuy= ()=>{
    confirmCartAction(
        "Queres terminar la compra?",
        "Gracias por tu compra!"
    )
}



const init=()=>{
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener("click", getMoreProducts);
    categories.addEventListener("click", addFilter);

    carritoBtn.addEventListener("click", switchCart);
    menuBtn.addEventListener("click", switchMenu);
    overlay.addEventListener("click", closeMenuCart);
    window.addEventListener("scroll", closeMenuCart);

    muebles.addEventListener("click", addMueble);
    document.addEventListener("DOMContentLoaded", renderCart);
    productCard.addEventListener("click", controlQuantity);
    emptyCart.addEventListener("click", removerCart);
    buyBtn.addEventListener("click", finishBuy);
    renderBadge(cart);
}
init()