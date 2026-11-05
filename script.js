function buildLiveChatModal() {
  const existing = document.getElementById('liveChatModal');
  if (existing) return;

  const modal = document.createElement('div');
  modal.id = 'liveChatModal';
  modal.className = 'live-chat-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="live-chat-backdrop"></div>
    <div class="live-chat-dialog" role="dialog" aria-modal="true" aria-labelledby="liveChatTitle">
      <div class="chat-dialog-header">
        <div>
          <span class="chat-kicker">Faheem Care</span>
          <h3 id="liveChatTitle">Live Chat</h3>
        </div>
        <button class="chat-close" aria-label="Close chat">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="chat-dialog-body">
        <div class="chat-message bot">
          <span class="message-avatar"><i class="fa-solid fa-plus"></i></span>
          <div class="chat-bubble">
            <span class="chat-bubble-title">Care Assistant</span>
            <p>How can I help you today? Tell me your disease or symptoms.</p>
          </div>
        </div>
        <div class="chat-message user hidden-chat" id="userConcern">
          <div class="chat-bubble user-bubble"></div>
        </div>
        <div class="chat-message bot hidden-chat" id="chatAnswerWrap">
          <span class="message-avatar"><i class="fa-solid fa-plus"></i></span>
          <div class="chat-bubble">
            <span class="chat-bubble-title">Precautions</span>
            <p id="chatAnswer"></p>
          </div>
        </div>
      </div>
      <form class="chat-form" id="chatDiseaseForm">
        <label class="form-label" for="chatDiseaseInput">Enter disease or symptoms</label>
        <div class="chat-input-row">
          <textarea id="chatDiseaseInput" class="form-control" rows="3" placeholder="Example: fever, cold, cough, headache..." required></textarea>
          <button type="submit" class="btn btn-primary chat-button">Send</button>
        </div>
        <div class="chat-status" id="chatStatus"></div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
}

function getDiseasePrecautions(query) {
  const disease = query.toLowerCase();

  if (/fever|temperature|high body|body heat|hot/i.test(disease)) {
    return 'Take rest and stay hydrated. Keep a cool environment, drink water, and use a thermometer. If fever is high or lasts more than 2 days, consult a clinician promptly.';
  }

  if (/cough|cold|sore throat|throat|runny nose|flu|nasal|sinus/i.test(disease)) {
    return 'Keep warm, drink warm fluids, and avoid smoke or cold air. Rest, wash hands often, and use a humidifier if needed. Seek care if breathing worsens or symptoms continue.';
  }

  if (/headache|migraine|pain in head|dizziness/i.test(disease)) {
    return 'Rest in a quiet, dark room, drink water, and avoid stress or heavy screen use. Avoid overuse of pain medicines without guidance. Seek help if headache is severe or accompanied by weakness.';
  }

  if (/stomach|gas|vomit|diarrhea|indigestion|nausea|abdominal/i.test(disease)) {
    return 'Drink oral rehydration fluids or water slowly. Avoid oily or spicy food for a day, eat light meals, and keep hygiene high. Seek urgent care if vomiting, dehydration, or severe pain is present.';
  }

  if (/skin|rash|allergy|itch|hives/i.test(disease)) {
    return 'Keep the skin clean and avoid known triggers or new medicines. Avoid scratching, use a cool compress, and watch for swelling, redness, or spreading. Consult a doctor if symptoms spread or breathing changes.';
  }

  if (/diabetes|sugar|bp|blood pressure|hypertension/i.test(disease)) {
    return 'Follow your regular medication schedule and avoid skipping meals. Maintain hydration, monitor blood pressure or sugar if advised, and seek urgent advice for chest pain, confusion, or very high readings.';
  }

  return 'Rest, stay hydrated, and monitor your symptoms. Avoid self-medicating with strong medicines without guidance. If the symptom is severe, persistent, or worsening, contact a healthcare professional or visit a hospital.';
}

document.addEventListener('DOMContentLoaded', () => {
  buildLiveChatModal();

  // Loader
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 650);
    }
  });

  // AOS initialization
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    });
  }

  // Sticky nav shadow on scroll
  const nav = document.querySelector('.navbar');
  function handleScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    const topButton = document.querySelector('.back-to-top');
    if (topButton) {
      if (window.scrollY > 560) {
        topButton.classList.add('visible');
      } else {
        topButton.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Hospital image slider controls
  const hospitalSlider = document.getElementById('hospitalSlider');
  if (hospitalSlider) {
    const slides = Array.from(hospitalSlider.querySelectorAll('.hospital-slide'));
    const dots = Array.from(hospitalSlider.querySelectorAll('.dot'));
    const prev = hospitalSlider.querySelector('.hospital-slider-arrow.prev');
    const next = hospitalSlider.querySelector('.hospital-slider-arrow.next');
    let currentSlide = 0;

    function showHospitalSlide(index) {
      const slideIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, idx) => {
        slide.classList.toggle('is-active', idx === slideIndex);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === slideIndex);
      });

      currentSlide = slideIndex;
    }

    if (slides.length > 1) {
      if (next) {
        next.addEventListener('click', () => showHospitalSlide(currentSlide + 1));
      }

      if (prev) {
        prev.addEventListener('click', () => showHospitalSlide(currentSlide - 1));
      }

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showHospitalSlide(idx));
      });

      setInterval(() => showHospitalSlide(currentSlide + 1), 3600);
    }
  }

  // Product search and category filter
  const searchInput = document.getElementById('productSearch');
  const filterButtons = document.querySelectorAll('[data-category]');
  const productCards = document.querySelectorAll('#productGrid .product-card-wrap');

  function applyProductFilter() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const activeCategory = document.querySelector('[data-category].active')?.dataset.category || 'All';

    productCards.forEach((card) => {
      const category = card.dataset.category;
      const productName = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const productText = card.querySelector('.product-text')?.textContent.toLowerCase() || '';

      const matchesSearch = productName.includes(searchTerm) || productText.includes(searchTerm);
      const matchesCategory = activeCategory === 'All' || category === activeCategory;

      card.classList.toggle('is-hidden', !(matchesSearch && matchesCategory));
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyProductFilter);
  }

  filterButtons.forEach((button) => {
    if (button.classList.contains('filter-chip')) {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-category].filter-chip').forEach((chip) => {
          chip.classList.toggle('active', chip === button);
        });
        applyProductFilter();
      });
    }
  });

  // Testimonial slider
  const testimonialBoxes = document.querySelectorAll('.testimonial-box');
  if (testimonialBoxes.length > 0) {
    let testimonialIndex = 0;
    setInterval(() => {
      testimonialBoxes.forEach((box, idx) => {
        box.classList.toggle('active', idx === testimonialIndex);
      });
      testimonialIndex = (testimonialIndex + 1) % testimonialBoxes.length;
    }, 4200);
  }

  // Stats counters
  const counters = document.querySelectorAll('[data-count]');
  function animateCounter(element) {
    const target = Number(element.dataset.count);
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  function setupCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((counter) => observer.observe(counter));
  }

  setupCounters();

  // Accordion bootstrap built-in available in page, no custom handling required.
  const faqAccordion = document.getElementById('faqAccordion');
  if (faqAccordion) {
    faqAccordion.querySelectorAll('[data-bs-toggle="collapse"]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const panel = trigger.getAttribute('data-bs-target');
        const collapse = document.querySelector(panel);
        if (collapse) {
          const isOpen = collapse.classList.contains('show');
          if (!isOpen) {
            const allPanels = document.querySelectorAll('[id^="faq"]');
            allPanels.forEach((item) => item.classList.remove('show'));
          }
        }
      });
    });
  }

  // Newsletter subscription validation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const message = form.querySelector('.form-msg');

      if (!input.checkValidity() || !input.value.trim()) {
        if (message) {
          message.textContent = 'Please enter a valid email.';
        }
        input.classList.add('is-invalid');
        return;
      }

      input.classList.remove('is-invalid');
      if (message) {
        message.textContent = 'Thank you for subscribing!';
      }
      form.reset();
    });
  });

  // Contact form validation
  const contactForms = document.querySelectorAll('.contact-form');
  contactForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const result = form.closest('.contact-form-panel')?.querySelector('.form-result');
      if (result) {
        result.textContent = 'Request submitted successfully';
      }

      form.reset();
      form.classList.remove('was-validated');
    });
  });

  // Hospital appointment form validation
  const hospitalForms = document.querySelectorAll('.hospital-appointment-form');
  hospitalForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const result = form.querySelector('.form-result');
      if (result) {
        result.textContent = 'Appointment request sent';
      }

      form.reset();
      form.classList.remove('was-validated');
    });
  });

  // Live chat modal controls
  const liveChatLauncher = document.querySelector('.live-chat');
  const chatModal = document.getElementById('liveChatModal');
  const chatClose = document.querySelector('#liveChatModal .chat-close');

  function openChatModal() {
    if (!chatModal) return;
    chatModal.classList.add('is-open');
    chatModal.setAttribute('aria-hidden', 'false');
    const input = document.getElementById('chatDiseaseInput');
    if (input) {
      setTimeout(() => input.focus(), 80);
    }
  }

  function closeChatModal() {
    if (!chatModal) return;
    chatModal.classList.remove('is-open');
    chatModal.setAttribute('aria-hidden', 'true');
  }

  if (liveChatLauncher) {
    liveChatLauncher.addEventListener('click', (event) => {
      event.preventDefault();
      openChatModal();
    });
  }

  if (chatClose) {
    chatClose.addEventListener('click', closeChatModal);
  }

  if (chatModal) {
    chatModal.querySelector('.live-chat-backdrop')?.addEventListener('click', closeChatModal);

    const chatForm = document.getElementById('chatDiseaseForm');
    if (chatForm) {
      chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.getElementById('chatDiseaseInput');
        const status = document.getElementById('chatStatus');
        const answer = document.getElementById('chatAnswer');
        const userConcern = document.getElementById('userConcern');
        const chatAnswerWrap = document.getElementById('chatAnswerWrap');

        if (!input || !input.value.trim()) {
          if (status) status.textContent = 'Please enter a disease or symptom.';
          return;
        }

        const diseaseText = input.value.trim();
        const precaution = getDiseasePrecautions(diseaseText);

        if (userConcern) {
          userConcern.querySelector('.chat-bubble').textContent = diseaseText;
          userConcern.classList.remove('hidden-chat');
        }

        if (answer) {
          answer.textContent = precaution;
        }

        if (chatAnswerWrap) {
          chatAnswerWrap.classList.remove('hidden-chat');
        }

        if (status) {
          status.textContent = 'Care guidance prepared.';
        }

        chatForm.reset();
      });
    }
  }

  // Smooth scroll for back-to-top
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
