//blog posts in home page show the most recent blog
document.querySelectorAll(".boxes").forEach(boxes => {
    const entries = Array.from(boxes.querySelectorAll(".box"));

    entries.sort((a, b) => {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
    });

    entries.forEach(entry => boxes.appendChild(entry));
});

//texts in blog page posts
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.life-blog, .interest-blog, .reflection-blog').forEach(blogSection => {
        const entries = [...blogSection.querySelectorAll('.blog-content')];
        entries.sort((a, b) => {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        });

        entries.forEach(entry => blogSection.appendChild(entry));
    });

    document.querySelectorAll('.blog-content').forEach(entry => {
        entry.querySelector('.preview')?.addEventListener('click', function () {
            entry.classList.toggle('active');
        });
    });
});

//SIDEBAR BUTTON
const toggleBtn = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const sidebarIcon = document.getElementById("sidebarIcon");

if (toggleBtn && sidebar && sidebarIcon) {
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
        if (sidebar.classList.contains("show")) {
            sidebarIcon.src = "../imgs/close-symbol.png";
        } else {
            sidebarIcon.src = "../imgs/sidebar-icon.png";
        }
    });
}

//SIDEBAR
const sections = document.querySelectorAll("section[id]");
const sidebarLinks = document.querySelectorAll(".sidebar a");

const observer = new IntersectionObserver((entries) => {
    let visibleSection = null;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (
                !visibleSection ||
                entry.intersectionRatio > visibleSection.intersectionRatio
            ) {
                visibleSection = entry;
            }
        }
    });

    if (visibleSection) {
        sidebarLinks.forEach(link => link.classList.remove("active"));

        const activeLink = document.querySelector(
            `.sidebar a[href="#${visibleSection.target.id}"]`
        );

        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
}, {
    threshold: [0.2, 0.4, 0.6, 0.8]
});

sections.forEach(section => observer.observe(section));

window.addEventListener("scroll", () => {
    const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;

    if (atBottom) {
        sidebarLinks.forEach(link => link.classList.remove("active"));

        const galleryLink = document.querySelector('.sidebar a[href="#gallery"]');

        if (galleryLink) {
            galleryLink.classList.add("active");
        }
    }
});