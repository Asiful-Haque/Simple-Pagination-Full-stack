document.addEventListener("DOMContentLoaded", () => {
    const reviewContainer = document.getElementById("review-container");
    const paginationContainer = document.getElementById("pagination-container");

    async function fetchReviews(page = 1) {
        try {
            const response = await fetch(`/api/getReviews?page=${page}`);
            const data = await response.json();

            reviewContainer.innerHTML = "";
            data.reviews.forEach((review) => {
                const card = document.createElement("div");
                card.classList.add("review-card");

                const title = document.createElement("h2");
                title.classList.add("review-title");
                title.textContent = review.title;

                const content = document.createElement("p");
                content.textContent = review.review;

                card.appendChild(title);
                card.appendChild(content);
                reviewContainer.appendChild(card);
            });

            renderPagination(data.totalPages, page);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    function renderPagination(totalPages, currentPage) {
        paginationContainer.innerHTML = "";

        const maxPagesToShow = 5; // Number of page buttons to show at once
        const ellipsis = "...";

        // Helper function to add a page button
        function addPageButton(page, isActive = false) {
            const button = document.createElement("button");
            button.textContent = page;
            button.classList.add("page-button");
            if (isActive) {
                button.classList.add("active");
            }
            button.addEventListener("click", () => fetchReviews(page));
            paginationContainer.appendChild(button);
        }

        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are fewer pages than the maxPagesToShow
            for (let i = 1; i <= totalPages; i++) {
                addPageButton(i, i === currentPage);
            }
        } else {
            // Show first pages, ellipsis, and last pages
            if (currentPage <= Math.floor(maxPagesToShow / 2)) {
                // If the current page is near the beginning
                for (let i = 1; i <= maxPagesToShow - 2; i++) {
                    addPageButton(i, i === currentPage);
                }
                addPageButton(maxPagesToShow - 1, false);
                paginationContainer.appendChild(document.createTextNode(ellipsis));
                addPageButton(totalPages);
            } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
                // If the current page is near the end
                addPageButton(1);
                paginationContainer.appendChild(document.createTextNode(ellipsis));
                for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
                    addPageButton(i, i === currentPage);
                }
            } else {
                // If the current page is in the middle
                addPageButton(1);
                paginationContainer.appendChild(document.createTextNode(ellipsis));
                for (
                    let i = currentPage - Math.floor(maxPagesToShow / 2);
                    i <= currentPage + Math.floor(maxPagesToShow / 2);
                    i++
                ) {
                    addPageButton(i, i === currentPage);
                }
                paginationContainer.appendChild(document.createTextNode(ellipsis));
                addPageButton(totalPages);
            }
        }
    }


    fetchReviews();
});
