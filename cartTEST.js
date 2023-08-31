// document.addEventListener('DOMContentLoaded', function() {
//     const cartButton = document.querySelector('.cart');
//     const cartCount = document.querySelector('#count');
//     const cartItems = document.querySelector('#cartItem');
//     const totalElement = document.querySelector('#total');
//     const checkoutButton = document.querySelector('#checkout');
    
//     let cart = [];
//     let total = 0;

//     function updateCartDisplay() {
//         cartCount.textContent = cart.length;
//         cartItems.innerHTML = cart.map(item => `<div>${item.name} - ₦${item.price.toFixed(2)}</div>`).join('');
//         totalElement.textContent = `₦${total.toFixed(2)}`;
//     }

//     function addToCart(item) {
//         cart.push(item);
//         total += item.price;
//         updateCartDisplay();
//     }

//     const itemsContainer = document.querySelector('#items');

//     // This function is called when the "Add to cart" button is clicked
//     function handleAddToCartClick(event) {
//         const productDiv = event.currentTarget.parentElement;
//         const productName = productDiv.querySelector('name').textContent;
//         const productPrice = parseFloat(productDiv.querySelector('price').textContent);
//         const productImage = productDiv.querySelector('img').src;

//         const item = {
//             name: productName,
//             price: productPrice,
//             image: productImage
//         };

//         addToCart(item);
//     }

//     // Attach click event listeners to "Add to cart" buttons
//     const addToCartButtons = document.querySelectorAll('add');
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', handleAddToCartClick);
//     });

//     // ... (other code)
//     console.log('Add to cart');
  
// });





// var cart = [];

// function addtocart(a) {
//   cart.push({...categories[a]});
//   displaycart();
// }

// function delElement(a){
//   cart.splice(a, 1);
//   displaycart();
// }

// function displaycart(a){
//   let j = 0, total = 0;
//   document.querySelector('#count').innerHTML =cart.length;
//   if(cart.length == 0){
//       document.querySelector('#cartItem').innerHTML = "Your cart is empty";
//       document.querySelector('#total').innerHTML = "₦ "+0+" .00";
//   }
//   else{
//       document.querySelector('#cartItem').innerHTML = cart.map((items) =>
//       {
//           var{image, title, price, quantity} = items;
//           total += price;
//           document.querySelector('#total').innerHTML = "₦ "+total+" .00";
//           return(
//               `<div class='cart-item'>
//                   <div class='row-img'>
//                       <img class='rowimg' src=${image}>
//                   </div>
//                   <p style = 'font-size: 12px;'>${title}</p>
//                   <h2 style = 'font-size: 15px;'>₦ ${price}.00</h2>` +
//                   "<i class='fa-solid fa-trash' onclick = 'delElement("+ (j++) +")'></i></div>"
//           );        
//           }).join('');
//   }    
     
// }

















// document.addEventListener('DOMContentLoaded', function() {
//     const cartButton = document.querySelector('.cart');
//     const cartCount = document.querySelector('#count');
//     const cartItems = document.querySelector('#cartItem');
//     const totalElement = document.querySelector('#total');
//     const checkoutButton = document.querySelector('#checkout');
    
//     let cart = [];
//     let total = 0;

//     function updateCartDisplay() {
//         cartCount.textContent = cart.length;
//         var numericPrice = parseFloat(item.price);
//         var numericTotal = parseFloat(total.price);
//         cartItems.innerHTML = cart.map(item => `<div>${item.name} - ₦${numericPrice.toFixed(2)}</div>`).join('');
//         // console.log(typeof(numericPrice))
//         totalElement.textContent = `₦${numericTotal.toFixed(2)}`;
//         // console.log(typeof(numericTotal));
//     }

//     function addToCart(item) {
//         cart.push(item);
//         total += item.price;
//         updateCartDisplay();
//     }

//     cartButton.addEventListener('click', function() {
//         // Implement cart dropdown or modal if needed
//         console.log('Cart clicked');
//     });

//     checkoutButton.addEventListener('click', function() {
//         // Implement checkout logic if needed
//         console.log('Checkout clicked');
//     });

//     // Sample usage of adding items to the cart
//     // Replace this with your actual logic
//     const item = {
//         name: 'beeff',
//         price: 200, 
//     };

//     addToCart(item);
// });
