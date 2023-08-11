(function () {
    
    let blogs = [
        {title: "AppSecCon: Application Security Conference", description: "Attending the virual security conference.", link: "blog/appseccon2023.html"},
        {title: "NahamCon: Offensive Security Conference", description: "Attending the virual security conference.", link: "blog/nahamcon2023.html"},
        {title: "Tripwire: Leveraging Adversarial Tactics", description: "How learning from an attacker's tactics, teechniques, and procedures (TTPs) can help security teams.", link: "blog/tripwire.html"},
        {title: "Dependalyzer: Understanding Your Software Supply Chain", description: "Expanding on GitHub's Dependabot to help teams tackle software supply chain security.", link: "blog/dependalyzer.html"},
        {title: "BSides San Francisco: Infosec Conference", description: "Attending the BSides event.", link: "blog/bsidessf2023.html"},
        {title: "What is Endpoint Security?", description: "Learn the importance of endpoint security.", link: "blog/endpointsecurity.html"},
        {title: "Basics of Threat Modeling", description: "Learn how threat modeling can help identify potential security threats.", link: "blog/threatmodel.html"},
        {title: "Intro to Packet Sniffing", description: "Learn about packet sniffing and it's importance", link: "blog/packetsniffer.html"},
        {title: "Intro to Burp Suite", description: "Learn about an essential tool for web application security testing.", link: "blog/burpsuite.html"},
        {title: "SVUS Awards", description: "Attending my first awards on behalf of my previous employer.", link: "blog/svusawards2019.html"},
    ];


    let blogsPerPage = 8;

    // Retrieve the current page from localStorage or default to 1
    let currentPage = localStorage.getItem('currentPage') || 1;

    function displayBlogs() {
        const start = (currentPage - 1) * blogsPerPage;
        const end = start + blogsPerPage;
        const blogsToDisplay = blogs.slice(start, end);
        const blogsContainer = document.querySelector('.section-2');

        // Clear the existing content
        blogsContainer.innerHTML = '';

        // Create and append the h2 tag
        const h2Tag = document.createElement('h2');
        h2Tag.textContent = 'Blogs';
        h2Tag.style.fontWeight = 'bold';
        blogsContainer.appendChild(h2Tag);

        for (const blog of blogsToDisplay) {
            const blogLink = document.createElement('a');
            blogLink.href = blog.link;
            blogLink.textContent = blog.title;

            const blogDescription = document.createElement('p');
            blogDescription.style.fontSize = '0.75rem';
            blogDescription.textContent = blog.description;

            blogsContainer.appendChild(blogLink);
            blogsContainer.appendChild(blogDescription);
        }
    }



    function createPagination() {
        let totalPages = Math.ceil(blogs.length / blogsPerPage);
        
        let paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        
        for (let i = 1; i <= totalPages; i++) {
            let pageLink = document.createElement('a');
            pageLink.href = "#";
            pageLink.textContent = i;
            if(i == currentPage) {
                pageLink.className = 'active';
            }
            pageLink.addEventListener('click', function(event) {
                event.preventDefault();
                currentPage = i;

                // Save the current page to localStorage
                localStorage.setItem('currentPage', i);

                displayBlogs();
                updatePagination();
            });
            
            paginationContainer.appendChild(pageLink);
        }
        
        let section2 = document.querySelector('.section-2');
        section2.appendChild(paginationContainer);
    }

    function updatePagination() {
        // Your existing code...
        let paginationContainer = document.querySelector('.pagination');
        if (paginationContainer) {
            paginationContainer.parentNode.removeChild(paginationContainer);
        }
        createPagination();
    }

    // Everything we return will be public
    window.blogModule = {
        displayBlogs,
        updatePagination
    };

})();

// These functions are now accessed through our module
window.addEventListener('DOMContentLoaded', function() {
    window.blogModule.displayBlogs();
    window.blogModule.updatePagination();
});