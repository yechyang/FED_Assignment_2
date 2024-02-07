document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c39dd1bd65338552113602";
    let allProducts; // Store all products for filtering

    // Initial fetch to get all products
    getContacts();

    function getContacts() {
        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        }

        fetch("https://testfed-475d.restdb.io/rest/item", settings)
            .then(response => response.json())
            .then(response => {
                allProducts = response; // Store all products for filtering
                filterProducts('All', 100); // Display all products initially
            });
    };

    // Filter products based on category, price, and search query
    function filterProducts(category, price, searchQuery) {
        let filteredProducts = allProducts;

        // Filter products based on category
        if (category !== 'All') {
            filteredProducts = filteredProducts.filter(product => product.Category === category);
        }

        // Filter products based on price
        if (price > 0) {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.Price) <= price);
        }

        // Filter products based on search query
        if (searchQuery.trim() !== '') {
            filteredProducts = filteredProducts.filter(product => product.Product.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Update the HTML with the filtered products
        updateProductDisplay(filteredProducts);
    }

    // Update the HTML to display products
    function updateProductDisplay(products) {
        let content = "";

        for (let i = 0; i < products.length; i++) {
            let item = products[i];
            let imagePath = 'images/' + encodeURIComponent(item.Product) + '.png';

            content += `<div class="col-md-4">
                <div class="box text-center"> 
                    <img src="${imagePath}" alt="${item.Product}">
                    <p>${item.Product}</p>
                    <p>$${item.Price}</p>
                </div>
            </div>`;
        }

        document.querySelector(".box-container .row").innerHTML = content;
    }

    // Event listener for the dropdown change
    document.getElementById("dropdown1").addEventListener("change", function () {
        let selectedCategory = this.value;
        let selectedPrice = parseInt(document.getElementById("priceRange").value); // Get the selected price
        let searchQuery = document.getElementById("searchInput").value;
        filterProducts(selectedCategory, selectedPrice, searchQuery);
    });

    // Event listener for the price range change
    document.getElementById("priceRange").addEventListener("input", function () {
        let selectedCategory = document.getElementById("dropdown1").value; // Get the selected category
        let selectedPrice = parseInt(this.value);
        document.getElementById("priceValue").textContent = selectedPrice;
        let searchQuery = document.getElementById("searchInput").value;
        filterProducts(selectedCategory, selectedPrice, searchQuery);
    });

    // Event listener for the search input change
    document.getElementById("searchInput").addEventListener("input", function () {
        let selectedCategory = document.getElementById("dropdown1").value; // Get the selected category
        let selectedPrice = parseInt(document.getElementById("priceRange").value); // Get the selected price
        let searchQuery = this.value;
        filterProducts(selectedCategory, selectedPrice, searchQuery);
    });

    let defaultPrice = 100;
    document.getElementById("priceRange").value = defaultPrice;
    document.getElementById("priceValue").textContent = defaultPrice;
});