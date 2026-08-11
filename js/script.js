//navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
        hamburger.textContent = "X";
    } else {
        hamburger.textContent = "☰";
    }
});

//blog posts in home page show the most recent blog
document.querySelectorAll(".boxes").forEach(boxes => {
    const entries = Array.from(boxes.querySelectorAll(".box"));

    entries.sort((a, b) => {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
    });

    entries.forEach(entry => boxes.appendChild(entry));
});

//text contents in blog page posts
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

if (toggleBtn && sidebar) {
     toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
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

//scroll button in home page (left and right)
const boxes = document.getElementById("boxes");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const box = boxes.querySelector(".box");

rightBtn.addEventListener("click", function () {
    const scrollAmount = (box.offsetWidth + 16) * 3;

    boxes.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
    });
});

leftBtn.addEventListener("click", function () {
    const scrollAmount = (box.offsetWidth + 16) * 3;

    boxes.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
    });
});