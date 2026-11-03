let page = 1;
const page_limit = 10;

const container = document.querySelector(".container");
const loader = document.querySelector("#loader");
const scrollTrigger = document.querySelector("#scroll-trigger");
const endMessage = document.querySelector(".message p");

let isLoading = false;
let hasMorePosts = true;

async function loadPosts() {
    if (isLoading || !hasMorePosts) return;

    isLoading = true;
    loader.hidden = false;
    loader.textContent = "Loading posts...";

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${page_limit}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();

        
        if (posts.length === 0) {
            hasMorePosts = false;
            endMessage.hidden = false;
            return;
        }

      
        posts.forEach(post => {
            const postElement = document.createElement("article");
            postElement.className = "post";

            const title = document.createElement("h2");
            title.textContent = post.title;

            const body = document.createElement("p");
            body.textContent = post.body;

            postElement.append(title, body);
            container.appendChild(postElement);
        });

        page++;

       
        if (posts.length < page_limit) {
            hasMorePosts = false;
            endMessage.hidden = false;
        }
    } catch (error) {
        console.error("Error:", error);
        loader.textContent = "Could not load posts. Please refresh and try again.";
        return;
    } finally {
        isLoading = false;

        if (hasMorePosts) {
            loader.hidden = true;
        } else {
            loader.hidden = true;
        }
    }
}


const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        loadPosts();
    }
});

observer.observe(scrollTrigger);
loadPosts();
