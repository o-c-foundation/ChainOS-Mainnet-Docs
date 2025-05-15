document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
  }
  
  // Copy code button functionality
  document.querySelectorAll('pre').forEach(function(codeBlock) {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.textContent = 'Copy';
    codeBlock.appendChild(copyButton);
    
    // Add click event
    copyButton.addEventListener('click', function() {
      const code = codeBlock.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(function() {
        copyButton.textContent = 'Copied!';
        setTimeout(function() {
          copyButton.textContent = 'Copy';
        }, 2000);
      }).catch(function(err) {
        console.error('Could not copy text: ', err);
      });
    });
  });
  
  // Tab functionality
  document.querySelectorAll('.tabs').forEach(function(tabContainer) {
    const tabs = tabContainer.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(function(t) {
          t.classList.remove('active');
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding tab content
        const target = this.getAttribute('data-target');
        tabContents.forEach(function(content) {
          content.classList.remove('active');
          if (content.id === target) {
            content.classList.add('active');
          }
        });
      });
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to current page in sidebar
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(function(link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
    animateElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        element.classList.add('animate-fadeIn');
      }
    });
  }
  
  // Run once on page load
  checkScroll();
  
  // Run on scroll
  window.addEventListener('scroll', checkScroll);
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const searchResults = document.getElementById('search-results');
      
      if (searchTerm.length < 2) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        return;
      }
      
      // Simple search through page content
      const contentElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      const results = [];
      
      contentElements.forEach(function(element) {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          let heading = '';
          
          // Find the nearest heading
          if (!element.tagName.startsWith('H')) {
            let current = element.previousElementSibling;
            while (current && !current.tagName.startsWith('H')) {
              current = current.previousElementSibling;
            }
            if (current) {
              heading = current.textContent;
            }
          } else {
            heading = element.textContent;
          }
          
          if (!results.some(r => r.heading === heading)) {
            results.push({
              heading: heading,
              text: element.textContent,
              id: element.id || (element.closest('[id]') ? element.closest('[id]').id : '')
            });
          }
        }
      });
      
      // Display results
      if (results.length > 0) {
        searchResults.innerHTML = '';
        results.forEach(function(result) {
          const resultItem = document.createElement('div');
          resultItem.className = 'search-result-item';
          
          const resultLink = document.createElement('a');
          resultLink.href = result.id ? `#${result.id}` : '#';
          resultLink.textContent = result.heading;
          
          resultItem.appendChild(resultLink);
          searchResults.appendChild(resultItem);
          
          resultLink.addEventListener('click', function() {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            searchInput.value = '';
          });
        });
        
        searchResults.style.display = 'block';
      } else {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        searchResults.style.display = 'block';
      }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
      const searchResults = document.getElementById('search-results');
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
      }
    });
  }
});
