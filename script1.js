const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search');
let products = [];

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
  });

function displayProducts(productList) {
  productContainer.innerHTML = '';
  productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.addEventListener('click', () => {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = 'product.html';
    });

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <div class="price">$${product.price.toFixed(2)}</div>
       <button class="hov" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(keyword)
  );
  displayProducts(filtered);
});

// const productDetail = document.getElementById('product-detail');
// const product = JSON.parse(localStorage.getItem('selectedProduct'));

// if (product) {
//   productDetail.innerHTML = `
//     <div class="product-card">
//       <img src="${product.image}" alt="${product.title}" />
//       <h2>${product.title}</h2>
//       <p>${product.description}</p>
//       <div class="price">$${product.price.toFixed(2)}</div>
//       <button onclick="addToCart(${product.id})">Add to Cart</button>
//     </div>
//   `;
// } else {
//   productDetail.innerHTML = '<p>No product found.</p>';
// }

// function addToCart(productId) {
//   let cart = JSON.parse(localStorage.getItem('cart')) || [];
//   const existing = cart.find(item => item.id === productId);
//   if (existing) {
//     existing.qty += 1;
//   } else {
//     cart.push({ ...product, qty: 1 });
//   }
//   localStorage.setItem('cart', JSON.stringify(cart));
//   alert('Product added to cart!');
// }
