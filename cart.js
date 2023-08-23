const product = [
    {
        id: 0,
        image: './assets/jolloff-rice.jpeg',
        title: 'Jollof Rice',
        price: 300,
    },
    {
        id: 1,
        image: './assets/friedd-rice.jpg',
        title: 'Fried Rice',
        price: 300,
    },
    {
        id: 2,
        image: './assets/chickenn.jpg',
        title: 'Chicken',
        price: 900,
    },
    {
        id: 3,
        image: './assets/beeff.jpg',
        title: 'Beef',
        price: 200,
    },
    {
        id: 4,
        image: './assets/meatt-pie.jpg',
        title: 'Meat pie',
        price: 750,
    },
    {
        id: 4,
        image: './assets/bottledd-Water.jpg',
        title: 'Bottled Water',
        price: 150,
    }
];

const categories = [...new Set(product.map((item) =>
    {return item}))]
    let i = 0;
document.querySelector('#root').innerHTML = categories.map((item) =>
{
    var{image, title, price, quantity} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
         <p>${title}</p> 
         <h2>₦ ${price}.00</h2>` +
         "<button onclick= 'addtocart("+(i++)+")'>Add to cart</button>"+
         `</div>
         </div>`
    )
}).join('')

var cart = [];

function addtocart(a) {
    cart.push({...categories[a]});
    displaycart();
}

function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(a){
    let j = 0, total = 0;
    document.querySelector('#count').innerHTML =cart.length;
    if(cart.length == 0){
        document.querySelector('#cartItem').innerHTML = "Your cart is empty";
        document.querySelector('#total').innerHTML = "₦ "+0+" .00";
    }
    else{
        document.querySelector('#cartItem').innerHTML = cart.map((items) =>
        {
            var{image, title, price, quantity} = items;
            total += price;
            document.querySelector('#total').innerHTML = "₦ "+total+" .00";
            return(
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style = 'font-size: 12px;'>${title}</p>
                    <h2 style = 'font-size: 15px;'>₦ ${price}.00</h2>` +
                    "<i class='fa-solid fa-trash' onclick = 'delElement("+ (j++) +")'></i></div>"
            );        
            }).join('');
    }    
       
}