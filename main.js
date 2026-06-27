
/* ---- Navbar scroll state ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
}, { passive: true });

/* ---- Active nav link on scroll ---- */
function updateActiveLink() {
  const sections = ['hero','about','services','projects','testimonials','contact'];
  const scrollY = window.scrollY + 100;
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}

const words = [
    " Full-Stack Developer.",
    " Backend Developer.",
    " Cyber Tool Developer.",
    " Python Programmer."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const changingText = document.getElementById("changing-text");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        changingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        changingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1200; // pause after typing whole word
        isDeleting = true;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300; // pause before next word
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

/* ---- Hamburger ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

/* ---- Scroll reveal ---- */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
        if (e.target.classList.contains('skills-side')) animateBars();
      }, i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ---- Skill bars animation ---- */
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const w = bar.dataset.w;
    setTimeout(() => { bar.style.width = w + '%'; }, 100);
  });
}

/* ---- Project filter ---- */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // active button switch
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach(card => {
      const categories = card.getAttribute("data-cat").split(" ");

      if (filterValue === "all" || categories.includes(filterValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

function openCertificate(file){
    const modal=document.getElementById("certificateModal");
    const img=document.getElementById("certificateImage");
    const pdf=document.getElementById("certificatePdf");
    modal.classList.add("show");
    if(file.endsWith(".pdf")){
        pdf.src=file;
        pdf.style.display="block";
        img.style.display="none";
    }else{
        img.src=file;
        img.style.display="block";
        pdf.style.display="none";
    }
    document.body.style.overflow="hidden";
}

function closeCertificate(){
    const modal=document.getElementById("certificateModal");
    const pdf=document.getElementById("certificatePdf");
    modal.classList.remove("show");
    pdf.src="";
    document.body.style.overflow="auto";
}

/* ---- Contact form ---- */
function sendMessage() {

    const firstName = document.getElementById("fname").value.trim();
    const lastName = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("msg").value.trim();

    if (!firstName || !lastName || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    emailjs.send(
        "service_loen5xj",
        "template_7pjf0z2",
        {
            from_name: firstName + " " + lastName,
            from_email: email,
            subject: subject,
            message: message
        }
    )
    .then(function(response) {

        console.log("SUCCESS!", response);

        document.getElementById("contactForm").reset();

        const toast = document.getElementById("toast");
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);

    })
    .catch(function(error) {
    console.error("EmailJS Error:", error);
    alert("Error: " + JSON.stringify(error));
});

}

emailjs.init({
    publicKey: "1FkKZaWPhNDeGnwyU"
});

function openResume(){

    document
        .getElementById("resumeModal")
        .classList.add("show");

    document.body.style.overflow="hidden";

}

function closeResume(){

    document
        .getElementById("resumeModal")
        .classList.remove("show");

    document.body.style.overflow="auto";

}

const resumeModal=document.getElementById("resumeModal");

resumeModal.addEventListener("click",(e)=>{

    if(e.target===resumeModal){

        closeResume();

    }

});