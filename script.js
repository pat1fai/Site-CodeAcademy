// Cache DOM elements
const cache = {
  themeSwitcher: document.querySelector('.theme-switcher'),
  themeIcon: document.querySelector('.theme-switcher i'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  blogCards: document.querySelectorAll('.blog-card'),
  paginationButtons: document.querySelectorAll('.pagination-btn'),
  contactForm: document.querySelector('.contact-form'),
  courseButtons: document.querySelectorAll('.course .button'),
  navLinks: document.querySelectorAll('nav a')
};

// Apply theme immediately when script loads
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
if (cache.themeIcon) {
  cache.themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeBlogFilters();
  initializePagination();
  initializeForms();
  initializeNavigation();
  initializeAnimations();
  initializeSuccessFilters();
});

// Theme functions
function initializeTheme() {
  if (!cache.themeSwitcher) return;

  cache.themeSwitcher.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
  });
}

function updateThemeIcon(theme) {
  cache.themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Blog filters
function initializeBlogFilters() {
  if (!cache.filterButtons.length) return;

  cache.filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      
      cache.filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      filterBlogCards(category);
    });
  });
}

function filterBlogCards(category) {
  cache.blogCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// Pagination
function initializePagination() {
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  if (!paginationButtons.length) return;

  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get the page number
      const pageNumber = button.textContent;
      
      // Here you would typically load new content
      // For now, we'll just show an alert
      if (pageNumber !== '...') {
        alert(`Завантаження сторінки ${pageNumber}`);
      }
    });
  });
}

// Forms
function initializeForms() {
  if (cache.contactForm) {
    cache.contactForm.addEventListener('submit', handleFormSubmit);
  }

  if (cache.courseButtons.length) {
    cache.courseButtons.forEach(button => {
      button.addEventListener('click', handleCourseRegistration);
    });
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
  e.target.reset();
}

function handleCourseRegistration() {
  const courseName = this.closest('.course').querySelector('h3').textContent;
  alert(`Дякуємо за інтерес до курсу "${courseName}"! Наш менеджер зв\'яжеться з вами для уточнення деталей.`);
}

// Navigation
function initializeNavigation() {
  cache.navLinks.forEach(link => {
    link.addEventListener('click', handleNavigation);
  });

  const currentPage = window.location.pathname.split('/').pop();
  cache.navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

function handleNavigation(e) {
  if (this.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Animations
function initializeAnimations() {
  const animatedElements = document.querySelectorAll('.blog-card, .teacher-card, .course');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Success page filters
function initializeSuccessFilters() {
  const filterButtons = document.querySelectorAll('.success-filters .filter-btn');
  const successCards = document.querySelectorAll('.success-card');

  if (!filterButtons.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      filterSuccessCards(category);
    });
  });
}

function filterSuccessCards(category) {
  const successCards = document.querySelectorAll('.success-card');
  
  successCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
} 