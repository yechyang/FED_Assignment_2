document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65afdc5f482ae93fcb54da42";
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

        fetch("https://fedassg-a6f6.restdb.io/rest/item", settings)
            .then(response => response.json())
            .then(response => {
                allProducts = response; // Store all products for filtering
                filterProducts('All'); // Display all products initially
            });
    };

    // Filter products based on category
    function filterProducts(category) {
        let filteredProducts;

        if (category === 'All') {
            // Display all products
            filteredProducts = allProducts;
        } else {
            // Filter products based on category
            filteredProducts = allProducts.filter(product => product.Category === category);
        }

        // Update the HTML with the filtered products
        updateProductDisplay(filteredProducts);
    }

    // Update the HTML to display products
    function updateProductDisplay(products) {
        let content = "";

        for (let i = 0; i < products.length; i++) {
            let item = products[i];
            let imagePath = '/FED_Assignment_2/images/' + encodeURIComponent(item.Product) + '.png';

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
        filterProducts(selectedCategory);
    });
});