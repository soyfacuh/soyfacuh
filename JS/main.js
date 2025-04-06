
/**
 * CV Profesional - Facundo Matías Centurión
 * Código JavaScript optimizado con arquitectura modular
 * Implementa patrones de diseño profesionales y manejo eficiente de eventos
 */

// IIFE para evitar contaminar el espacio global
(function() {
  'use strict';

  // Configuración global
  const CONFIG = {
    scrollThreshold: 500,
    animationDuration: {
      fast: 300,
      normal: 500,
      slow: 1000
    },
    typingEffect: {
      text: "Full Stack Developer & Marketing Digital",
      typingSpeed: 100,
      deletingSpeed: 50,
      pauseBeforeDelete: 2000,
      pauseBeforeType: 500,
      minCharacters: 1  // Mantener al menos 1 carácter para evitar el salto
    },
    parallaxSpeed: 0.5
  };

  // Gestor de utilidades
  const Utils = {
    /**
     * Comprueba si un elemento está en el viewport
     * @param {HTMLElement} element - Elemento a comprobar
     * @returns {boolean} - Verdadero si está visible
     */
    isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight && 
        rect.bottom >= 0
      );
    },

    /**
     * Aplica una transición suave a un elemento
     * @param {HTMLElement} element - Elemento para aplicar la transición
     * @param {Object} properties - Propiedades CSS a aplicar
     * @param {number} duration - Duración de la transición en ms
     */
    smoothTransition(element, properties, duration) {
      element.style.transition = `all ${duration}ms ease`;
      Object.entries(properties).forEach(([prop, value]) => {
        element.style[prop] = value;
      });
    },

    /**
     * Gestiona la adición y eliminación de clases con retraso
     * @param {HTMLElement} element - Elemento objetivo
     * @param {string} className - Clase a agregar/eliminar
     * @param {boolean} add - Agregar o eliminar la clase
     * @param {number} delay - Retraso en ms
     */
    toggleClassWithDelay(element, className, add, delay = 0) {
      if (delay) {
        setTimeout(() => {
          add ? element.classList.add(className) : element.classList.remove(className);
        }, delay);
      } else {
        add ? element.classList.add(className) : element.classList.remove(className);
      }
    }
  };

  // Módulo para gestionar animaciones
  const AnimationManager = {
    /**
     * Inicializa todas las animaciones
     */
    init() {
      this.setupPageFadeIn();
      this.setupScrollAnimations();
      this.setupParallaxEffect();
      this.setupImageZoomEffect();
      this.setupPulseEffect();
    },

    /**
     * Configura la animación de aparición inicial de la página
     */
    setupPageFadeIn() {
      const body = document.querySelector('body');
      body.style.opacity = '0';

      setTimeout(() => {
        Utils.smoothTransition(body, { opacity: '1' }, CONFIG.animationDuration.slow);
      }, 200);
    },

    /**
     * Configura las animaciones basadas en scroll
     */
    setupScrollAnimations() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      const handleScrollAnimation = () => {
        elements.forEach(element => {
          const isVisible = Utils.isInViewport(element);
          
          Utils.smoothTransition(element, { 
            opacity: isVisible ? '1' : '0',
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)'
          }, CONFIG.animationDuration.normal);
          
          Utils.toggleClassWithDelay(element, 'visible', isVisible);
        });
      };

      window.addEventListener('scroll', handleScrollAnimation, { passive: true });
      // Ejecutar al inicio para elementos ya visibles
      handleScrollAnimation();
    },

    /**
     * Configura el efecto parallax para elementos de fondo
     */
    setupParallaxEffect() {
      const parallaxElements = document.querySelectorAll('.parallax');
      
      if (parallaxElements.length === 0) return;
      
      const handleParallax = () => {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach(element => {
          element.style.backgroundPositionY = `${scrollPosition * CONFIG.parallaxSpeed}px`;
        });
      };

      window.addEventListener('scroll', handleParallax, { passive: true });
    },

    /**
     * Configura el efecto de zoom para imágenes
     */
    setupImageZoomEffect() {
      const zoomElements = document.querySelectorAll('.zoom-on-scroll');
      
      if (zoomElements.length === 0) return;
      
      const handleZoomEffect = () => {
        zoomElements.forEach(element => {
          const isVisible = Utils.isInViewport(element);
          
          Utils.smoothTransition(element, {
            transform: isVisible ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isVisible ? '0px 4px 10px rgba(0, 0, 0, 0.15)' : 'none'
          }, CONFIG.animationDuration.normal);
        });
      };

      window.addEventListener('scroll', handleZoomEffect, { passive: true });
    },

    /**
     * Configura el efecto de pulsación para botones
     */
    setupPulseEffect() {
      const pulseButton = document.querySelector('.pulse-button');
      
      if (!pulseButton) return;
      
      pulseButton.addEventListener('click', () => {
        Utils.toggleClassWithDelay(pulseButton, 'pulsing', true);
        Utils.toggleClassWithDelay(pulseButton, 'pulsing', false, 600);
      });
    }
  };

  // Módulo para gestión de navegación
  const NavigationManager = {
    /**
     * Inicializa todas las funcionalidades de navegación
     */
    init() {
      this.setupBackToTop();
      this.setupMobileMenu();
      this.setupSmoothScrolling();
    },

    /**
     * Configura el botón de volver arriba
     */
    setupBackToTop() {
      const backToTop = document.querySelector('.back-to-top');
      
      if (!backToTop) return;
      
      const handleBackToTopVisibility = () => {
        const shouldBeVisible = window.scrollY > CONFIG.scrollThreshold;
        Utils.toggleClassWithDelay(backToTop, 'visible', shouldBeVisible);
      };

      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
      
      // Configurar efectos de hover
      backToTop.addEventListener('mouseenter', () => {
        Utils.smoothTransition(backToTop, { 
          transform: 'translateY(-10px) rotate(15deg)' 
        }, CONFIG.animationDuration.fast);
      });

      backToTop.addEventListener('mouseleave', () => {
        Utils.smoothTransition(backToTop, { 
          transform: 'translateY(0) rotate(0)' 
        }, CONFIG.animationDuration.fast);
      });
      
      // Comprobar visibilidad inicial
      handleBackToTopVisibility();
    },

    /**
     * Configura el menú móvil
     */
    setupMobileMenu() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      
      if (!menuToggle || !navLinks) return;
      
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });
      
      // Cerrar menú al hacer clic en un enlace
      const navItems = document.querySelectorAll('.nav-links a');
      
      navItems.forEach(item => {
        item.addEventListener('click', () => {
          if (navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
          }
        });
      });
    },

    /**
     * Configura el desplazamiento suave para enlaces de anclaje
     */
    setupSmoothScrolling() {
      const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.back-to-top)');
      
      anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const headerOffset = 100; // Ajuste para la barra de navegación
            
            window.scrollTo({
              top: targetPosition - headerOffset,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // Módulo para efectos de texto
  const TextEffectsManager = {
    /**
     * Inicializa todos los efectos de texto
     */
    init() {
      this.setupTypingEffect();
    },

    /**
     * Configura el efecto de escritura
     */
    setupTypingEffect() {
      const typingElement = document.querySelector('.subtitle');
      
      if (!typingElement) return;
      
      const { 
        text, 
        typingSpeed, 
        deletingSpeed, 
        pauseBeforeDelete, 
        pauseBeforeType,
        minCharacters 
      } = CONFIG.typingEffect;
      
      let index = 0;
      let isDeleting = false;

      function typeText() {
        if (isDeleting) {
          // Aseguramos que al menos se mantenga 'F' para evitar el salto del layout
          if (index > minCharacters) {
            typingElement.textContent = text.substring(0, index);
            index--;
            setTimeout(typeText, deletingSpeed);
          } else {
            // Cuando llegamos al mínimo de caracteres, cambiamos a modo escritura
            isDeleting = false;
            setTimeout(typeText, pauseBeforeType);
          }
        } else {
          typingElement.textContent = text.substring(0, index);
          index++;
          
          if (index > text.length) {
            isDeleting = true;
            setTimeout(typeText, pauseBeforeDelete);
          } else {
            setTimeout(typeText, typingSpeed);
          }
        }
      }
      
      // Iniciar el efecto de escritura
      typeText();
    }
  };

  // Módulo para la gestión de eventos de intersección
  const IntersectionManager = {
    /**
     * Inicializa el observer de intersección
     */
    init() {
      this.setupSectionObserver();
    },

    /**
     * Configura el observer para detectar secciones visibles
     */
    setupSectionObserver() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-links a');
      
      if (sections.length === 0 || navLinks.length === 0) return;
      
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };
      
      const handleIntersect = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id;
            
            // Actualizar clase activa en enlaces de navegación
            navLinks.forEach(link => {
              const href = link.getAttribute('href').substring(1);
              Utils.toggleClassWithDelay(link, 'active', href === targetId);
            });
          }
        });
      };
      
      const observer = new IntersectionObserver(handleIntersect, observerOptions);
      
      sections.forEach(section => {
        observer.observe(section);
      });
    }
  };

  // Inicialización principal cuando el DOM está listo
  document.addEventListener('DOMContentLoaded', () => {
    // Detección de capacidades del navegador
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    // Inicializar todos los módulos
    NavigationManager.init();
    AnimationManager.init();
    TextEffectsManager.init();
    
    // Solo inicializar intersección si es compatible
    if (supportsIntersectionObserver) {
      IntersectionManager.init();
    }
    
    // Notificar que la página está completamente cargada
    console.log('Portfolio CV inicializado correctamente');
    
    // Optimización para dispositivos móviles
    if ('orientation' in window) {
      window.addEventListener('orientationchange', () => {
        // Ajustar elementos después del cambio de orientación
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('scroll'));
        }, 200);
      });
    }
  });
})();
