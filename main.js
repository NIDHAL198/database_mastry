// Menu Toggle
   const menuToggle = document.querySelector('.menu-toggle');
   const navLinks = document.querySelector('.nav-links');
   
   if (menuToggle) {
      menuToggle.addEventListener('click', () => {
         navLinks.classList.toggle('active');
      });
   }
   
   // Floating DB Animation
   function animateDBs() {
      gsap.to("#db1", {
         y: "+=20",
         duration: 2,
         ease: "sine.inOut",
         repeat: -1,
         yoyo: true
      });
      
      gsap.to("#db2", {
         y: "-=15",
         duration: 2.5,
         ease: "sine.inOut",
         repeat: -1,
         yoyo: true,
         delay: 0.5
      });
      
      gsap.to("#db3", {
         y: "+=25",
         duration: 3,
         ease: "sine.inOut",
         repeat: -1,
         yoyo: true,
         delay: 0.2
      });
   }
   
   // Scroll Animation
   function initScrollAnimation() {
      const fadeElements = document.querySelectorAll('.fade-in');
      
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               entry.target.classList.add('visible');
            }
         });
      }, { threshold: 0.1 });
      
      fadeElements.forEach(element => {
         observer.observe(element);
      });
   }
   
   // Modal Functionality
   function initModal() {
      const modalTriggers = document.querySelectorAll('[data-modal]');
      const closeButtons = document.querySelectorAll('.close-modal');
      
      modalTriggers.forEach(trigger => {
         trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
               modal.style.display = 'block';
            }
         });
      });
      
      closeButtons.forEach(button => {
         button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
               modal.style.display = 'none';
            }
         });
      });
      
      window.addEventListener('click', (e) => {
         if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
         }
      });
   }
   
   // Sample ER Model Link Event
   function initSampleLink() {
      const erModelLink = document.querySelector('a[href="er-model.html"]');
      if (erModelLink) {
         erModelLink.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('er-model-sample');
            if (modal) {
               modal.style.display = 'block';
            }
         });
      }
   }
   
   // Quiz Functionality
   function initQuiz() {
      const quizOptions = document.querySelectorAll('.quiz-options input');
      
      quizOptions.forEach(option => {
         option.addEventListener('change', (e) => {
            const selectedOption = e.target.value;
            const correctAnswer = 'd'; // In this sample, "Tables" is the correct answer
            
            // Reset all options
            quizOptions.forEach(opt => {
               opt.parentElement.style.color = '';
               opt.parentElement.style.fontWeight = '';
            });
            
            if (selectedOption === correctAnswer) {
               e.target.parentElement.style.color = 'var(--success)';
               e.target.parentElement.style.fontWeight = 'bold';
            } else {
               e.target.parentElement.style.color = 'var(--danger)';
               e.target.parentElement.style.fontWeight = 'bold';
               
               // Show correct answer
               quizOptions.forEach(opt => {
                  if (opt.value === correctAnswer) {
                     opt.parentElement.style.color = 'var(--success)';
                     opt.parentElement.style.fontWeight = 'bold';
                  }
               });
            }
         });
      });
   }
   
   // Initialize all functionality
   document.addEventListener('DOMContentLoaded', () => {
      animateDBs();
      initScrollAnimation();
      initModal();
      initSampleLink();
      initQuiz();
   });

   // Function to handle lesson navigation
   function setupLessonNavigation() {
      const lessonNavBtns = document.querySelectorAll('.lesson-nav-btn:not(.disabled)');
      
      lessonNavBtns.forEach(btn => {
         btn.addEventListener('click', function() {
            const targetLesson = this.getAttribute('data-next');
            
            // Hide all lessons
            document.querySelectorAll('.lesson').forEach(lesson => {
                  lesson.classList.remove('active');
            });
            
            // Show target lesson
            document.getElementById(targetLesson).classList.add('active');
            
            // Update course nav menu active state
            document.querySelectorAll('.course-nav-item').forEach(item => {
                  item.classList.remove('active');
                  if (item.getAttribute('data-lesson') === targetLesson) {
                     item.classList.add('active');
                  }
            });
            
            // Scroll to top of lesson
            window.scrollTo({
                  top: document.querySelector('.course-content').offsetTop - 80,
                  behavior: 'smooth'
            });
         });
      });
   }

   // Function to handle course navigation menu
   function setupCourseNavMenu() {
      const courseNavItems = document.querySelectorAll('.course-nav-item');
      
      courseNavItems.forEach(item => {
         item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetLesson = this.getAttribute('data-lesson');
            
            // Update active class in nav
            courseNavItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Show the selected lesson
            document.querySelectorAll('.lesson').forEach(lesson => {
                  lesson.classList.remove('active');
            });
            document.getElementById(targetLesson).classList.add('active');
            
            // Scroll to lesson content
            window.scrollTo({
                  top: document.querySelector('.course-content').offsetTop - 80,
                  behavior: 'smooth'
            });
         });
      });
   }

   // Function to handle quizzes
   function setupQuizzes() {
      const quizContainers = document.querySelectorAll('.quiz-container, .final-quiz');
      
      quizContainers.forEach(container => {
         const checkBtn = container.querySelector('.check-answers');
         if (!checkBtn) return;
         
         checkBtn.addEventListener('click', function() {
            // Define correct answers for each quiz
            const correctAnswers = {
                  q1: 'd', // Tables is not a basic component of ER model
                  q2: 'd', // Many-to-Many for Doctor-Patient
                  q3: 'b', // Double line for total participation
                  q4: 'a', // Aggregation for University-Department-Professor
                  q5: 'b', // Junction table for M:N relationship
                  q6: 'c'  // PK includes owner PK + partial key
            };
            
            // Check each question in the current container
            container.querySelectorAll('.quiz-question').forEach(question => {
                  const questionName = question.querySelector('input[type="radio"]').getAttribute('name');
                  const selectedOption = question.querySelector('input[type="radio"]:checked');
                  const feedbackEl = question.querySelector('.quiz-feedback');
                  
                  if (!selectedOption) {
                     feedbackEl.innerHTML = 'Please select an answer.';
                     feedbackEl.className = 'quiz-feedback error';
                     return;
                  }
                  
                  if (selectedOption.value === correctAnswers[questionName]) {
                     feedbackEl.innerHTML = 'Correct! 🎉';
                     feedbackEl.className = 'quiz-feedback correct';
                  } else {
                     feedbackEl.innerHTML = 'Incorrect. Try again!';
                     feedbackEl.className = 'quiz-feedback incorrect';
                  }
            });
         });
      });
   }

   // Function to handle attribute exercise in Lesson 2
   function setupAttributeExercise() {
      const attributeExercise = document.querySelector('.attribute-exercise');
      if (!attributeExercise) return;
      
      const checkBtn = attributeExercise.querySelector('.check-answers');
      
      checkBtn.addEventListener('click', function() {
         const selectElements = attributeExercise.querySelectorAll('.exercise-select');
         
         selectElements.forEach(select => {
            const correctAnswer = select.getAttribute('data-answer');
            const selectedValue = select.value;
            const feedbackEl = select.nextElementSibling;
            
            if (selectedValue === '') {
                  feedbackEl.textContent = 'Please select an option.';
                  feedbackEl.className = 'feedback error';
            } else if (selectedValue === correctAnswer) {
                  feedbackEl.textContent = 'Correct!';
                  feedbackEl.className = 'feedback correct';
            } else {
                  feedbackEl.textContent = 'Incorrect. Try again!';
                  feedbackEl.className = 'feedback incorrect';
            }
         });
      });
   }

   // Function to handle solution buttons
   function setupSolutionButtons() {
      const solutionBtns = document.querySelectorAll('.show-solution');
      
      solutionBtns.forEach(btn => {
         btn.addEventListener('click', function() {
            const solutionContainer = this.nextElementSibling;
            
            if (solutionContainer.style.display === 'none' || !solutionContainer.style.display) {
                  solutionContainer.style.display = 'block';
                  this.textContent = 'Hide Solution';
                  
                  // Smooth scroll to solution
                  setTimeout(() => {
                     solutionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                  
            } else {
                  solutionContainer.style.display = 'none';
                  this.textContent = 'Show Solution';
            }
         });
      });
   }

   // Function to handle tabs in Lesson 5
   function setupTabs() {
      const tabButtons = document.querySelectorAll('.tab-btn');
      
      tabButtons.forEach(btn => {
         btn.addEventListener('click', function() {
            // Get the tab to show
            const tabToShow = this.getAttribute('data-tab');
            
            // Update active button
            document.querySelectorAll('.tab-btn').forEach(btn => {
                  btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show the selected tab
            document.querySelectorAll('.tab-content').forEach(tab => {
                  tab.classList.remove('active');
            });
            document.getElementById(tabToShow).classList.add('active');
         });
      });
   }

   // Function to animate fade-in elements
   function setupFadeInAnimations() {
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.utils.toArray('.fade-in').forEach(element => {
         gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                  trigger: element,
                  start: 'top 80%',
                  toggleActions: 'play none none none'
            }
         });
      });
   }

   // Function to handle mobile menu
   function setupMobileMenu() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      
      menuToggle.addEventListener('click', function() {
         this.classList.toggle('active');
         navLinks.classList.toggle('active');
      });
}
   
document.addEventListener('DOMContentLoaded', function() {
   // Handle mobile menu toggle
   const menuToggle = document.querySelector('.menu-toggle');
   const navLinks = document.querySelector('.nav-links');
   
   if (menuToggle) {
      menuToggle.addEventListener('click', function() {
         this.classList.toggle('active');
         navLinks.classList.toggle('active');
      });
   }
   
   // Handle course navigation tabs
   const courseNavItems = document.querySelectorAll('.course-nav-item');
   const lessons = document.querySelectorAll('.lesson');
   
   courseNavItems.forEach(item => {
      item.addEventListener('click', function(e) {
         e.preventDefault();
         const targetLesson = this.getAttribute('data-lesson');
         
         // Update active navigation item
         courseNavItems.forEach(nav => nav.classList.remove('active'));
         this.classList.add('active');
         
         // Show the target lesson and hide others
         lessons.forEach(lesson => {
               if (lesson.id === targetLesson) {
                  lesson.classList.add('active');
               } else {
                  lesson.classList.remove('active');
               }
         });
         
         // Scroll to top of the lesson
         window.scrollTo({
               top: document.querySelector('.course-navigation').offsetTop,
               behavior: 'smooth'
         });
      });
   });
   
   // Handle lesson navigation buttons (next/previous)
   const lessonNavButtons = document.querySelectorAll('.lesson-nav-btn');
   
   lessonNavButtons.forEach(button => {
      if (!button.classList.contains('disabled')) {
         button.addEventListener('click', function() {
               const targetLesson = this.getAttribute('data-next');
               if (targetLesson) {
                  // Find the navigation item for this lesson and click it
                  const navItem = document.querySelector(`.course-nav-item[data-lesson="${targetLesson}"]`);
                  if (navItem) {
                     navItem.click();
                  }
               }
         });
      }
   });
   
   // Handle quiz functionality
   const quizForms = document.querySelectorAll('.quiz-container form, .interactive-exercise form, .final-quiz form');
   
   quizForms.forEach(form => {
      const checkButton = form.querySelector('.check-answers');
      if (checkButton) {
         checkButton.addEventListener('click', function() {
               // Handle quiz validation logic here
               // For example:
               const questions = form.querySelectorAll('.quiz-question');
               questions.forEach(question => {
                  const selectedOption = question.querySelector('input[type="radio"]:checked');
                  const feedback = question.querySelector('.quiz-feedback');
                  if (selectedOption && feedback) {
                     if (selectedOption.value === 'd' || selectedOption.value === 'b' || selectedOption.value === 'c') { // Example correct answers
                           feedback.textContent = 'Correct!';
                           feedback.style.color = 'green';
                     } else {
                           feedback.textContent = 'Try again!';
                           feedback.style.color = 'red';
                     }
                  }
               });
         });
      }
   });
   
   // Handle attribute exercise
   const attributeExercise = document.querySelector('.attribute-exercise');
   if (attributeExercise) {
      const checkButton = attributeExercise.querySelector('.check-answers');
      if (checkButton) {
         checkButton.addEventListener('click', function() {
               const exerciseItems = attributeExercise.querySelectorAll('.exercise-item');
               exerciseItems.forEach(item => {
                  const select = item.querySelector('.exercise-select');
                  const feedback = item.querySelector('.feedback');
                  if (select && feedback) {
                     const correctAnswer = select.getAttribute('data-answer');
                     if (select.value === correctAnswer) {
                           feedback.textContent = '✓';
                           feedback.style.color = 'green';
                     } else {
                           feedback.textContent = '✗';
                           feedback.style.color = 'red';
                     }
                  }
               });
         });
      }
   }
   
   // Show/hide solution
   const solutionButtons = document.querySelectorAll('.show-solution');
   solutionButtons.forEach(button => {
      button.addEventListener('click', function() {
         const solutionContainer = this.nextElementSibling;
         if (solutionContainer && solutionContainer.classList.contains('solution-container')) {
               if (solutionContainer.style.display === 'none') {
                  solutionContainer.style.display = 'block';
                  this.textContent = 'Hide Solution';
               } else {
                  solutionContainer.style.display = 'none';
                  this.textContent = 'Show Solution';
               }
         }
      });
   });
   
   // Handle tab switching in lesson 5
   const tabButtons = document.querySelectorAll('.tab-btn');
   const tabContents = document.querySelectorAll('.tab-content');
   
   tabButtons.forEach(button => {
      button.addEventListener('click', function() {
         const tabId = this.getAttribute('data-tab');
         
         // Update active button
         tabButtons.forEach(btn => btn.classList.remove('active'));
         this.classList.add('active');
         
         // Show active content
         tabContents.forEach(content => {
               if (content.id === tabId) {
                  content.classList.add('active');
               } else {
                  content.classList.remove('active');
               }
         });
      });
   });
   
   // Animate floating database icons in the hero section
   const dbIcons = document.querySelectorAll('.db-icon');
   if (window.gsap && dbIcons.length > 0) {
      dbIcons.forEach((icon, index) => {
         gsap.to(icon, {
               y: -20 - (index * 5),
               duration: 2 + (index * 0.5),
               repeat: -1,
               yoyo: true,
               ease: "power1.inOut"
         });
      });
   }
   
   // Fade in elements when they become visible
   const fadeElements = document.querySelectorAll('.fade-in');
   if (fadeElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  observer.unobserve(entry.target);
               }
         });
      }, { threshold: 0.1 });
      
      fadeElements.forEach(element => {
         observer.observe(element);
      });
   }
});