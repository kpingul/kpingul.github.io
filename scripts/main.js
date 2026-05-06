(function () {

    let blogs = [
        // {title: "Building My First Security Lab: Experimenting with AI Agents (Part 2)", description: "Experimenting with AI Agents", link: "blog/lab_2.html"},
        {title: "BSides San Francisco: Infosec Conference 2026", description: "Attending the BSides event.", link: "blog/bsidessf2026.html"},
        {title: "Building My First Security Lab", description: "A personal sandbox for exploring Red/Blue team tools", link: "blog/lab_1.html"},
        {title: "Learning to Build with Claude Code Opus 4.5", description: "How AI-assisted development changed my workflow on Lantern and Intel Mesh.", link: "blog/claude-code-opus.html"},
        {title: "Gen AI vs Agentic AI: What I'm Learning and Why It Matters for Security", description: "Understanding the differences between Generative AI and Agentic AI in cybersecurity.", link: "blog/genai-vs-agentic-ai.html"},
        {title: "Lantern: A Practical Lens Into Your Local Network", description: "Understand what is happening on your local network.", link: "blog/lantern.html"},
        {title: "DEF CON 33: Hacking Conference", description: "A First-Timer's Experience at the World's Biggest Hacker Playground", link: "blog/defcon2025.html"},
        {title: "RSA Conference 2025: 1 Day Pass", description: "A First-Timer's Experience in Cybersecurity's Biggest Arena.", link: "blog/rsa2025.html"},
        {title: "BSides San Francisco: Infosec Conference 2025", description: "Attending the BSides event.", link: "blog/bsidessf2025.html"},
        {title: "Why is Threat Intelligence Important?", description: "Learn the importance of threat intel.", link: "blog/threat_intel.html"},
        {title: "BSides San Francisco: Infosec Conference 2024", description: "Attending the BSides event.", link: "blog/bsidessf2024.html"},
        {title: "Tripwire: Leveraging Adversarial Tactics", description: "How learning from an attacker's tactics, techniques, and procedures (TTPs) can help security teams.", link: "blog/tripwire.html"},
        {title: "BSides San Francisco: Infosec Conference 2023", description: "Attending the BSides event.", link: "blog/bsidessf2023.html"},
        {title: "Dependalyzer: Understanding Your Software Supply Chain", description: "Expanding on GitHub's Dependabot to help teams tackle software supply chain security.", link: "blog/dependalyzer.html"},
        {title: "Activate: BitGo Developer Conference 2022", description: "Attending the Activate event as a staff member.", link: "blog/activate2022.html"},

        {title: "Basics of Threat Modeling", description: "Learn how threat modeling can help identify potential security threats.", link: "blog/threatmodel.html"},
        {title: "AppSecCon: Application Security Conference 2023", description: "Attending the virual security conference.", link: "blog/appseccon2023.html"},
        {title: "NahamCon: Offensive Security Conference 2023", description: "Attending the virual security conference.", link: "blog/nahamcon2023.html"},
        {title: "What is Endpoint Security?", description: "Learn the importance of endpoint security.", link: "blog/endpointsecurity.html"},
        {title: "Intro to Packet Sniffing", description: "Learn about packet sniffing and it's importance", link: "blog/packetsniffer.html"},
        {title: "Intro to Burp Suite", description: "Learn about an essential tool for web application security testing.", link: "blog/burpsuite.html"},
        {title: "SVUS Awards", description: "Attending my first awards on behalf of my previous employer.", link: "blog/svusawards2019.html"},
    ];


    let blogsPerPage = 8;

    // Retrieve the current page from localStorage or default to 1
    let currentPage = parseInt(localStorage.getItem('currentPage'), 10) || 1;

    function displayBlogs() {
        const start = (currentPage - 1) * blogsPerPage;
        const end = start + blogsPerPage;
        const blogsToDisplay = blogs.slice(start, end);
        const blogsContainer = document.getElementById('blog-list');

        // Clear the existing content
        blogsContainer.innerHTML = '';

        const h2Tag = document.createElement('h2');
        h2Tag.textContent = 'Blog Posts';
        blogsContainer.appendChild(h2Tag);

        for (const blog of blogsToDisplay) {
            const blogLink = document.createElement('a');
            blogLink.href = blog.link;
            blogLink.className = 'blog-entry';
            blogLink.textContent = blog.title;

            const blogDescription = document.createElement('p');
            blogDescription.className = 'blog-description';
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
            if(i === currentPage) {
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

        let container = document.getElementById('blog-list');
        container.appendChild(paginationContainer);
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
