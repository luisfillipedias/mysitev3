function playSound(event) {
    event.preventDefault();
    
    const targetElement = event.currentTarget;
    console.log("Event target element:", targetElement);
    
    if (!targetElement) {
        console.error("Target element is null");
        return;
    }

    var audio = new Audio('./images/error2.mp3');
    
    audio.oncanplaythrough = function() {  
        console.log("Audio can play through");
        audio.play();
    };

    audio.onended = function() {
        console.log("Audio ended, redirecting to:", targetElement.href);
        window.location.href = targetElement.href;
    };

    setTimeout(function() {
        console.log("Fallback triggered, redirecting to:", targetElement.href);
        window.location.href = targetElement.href;
    }, 3000);
}




document.addEventListener('DOMContentLoaded', function() {
    var body = document.body;
    var darkModeToggle = document.getElementById('dark-mode-toggle');
    var headerContent = document.querySelector('.header-content');
    var lastScrollTop = 0;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.setAttribute('data-theme', 'dark');
        body.style.backgroundImage = "url('images/Cefetback-dark.jpg')"; 
    } else {
        body.setAttribute('data-theme', 'light');
        body.style.backgroundImage = "url('images/Cefetback.png')"; 
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            if (body.getAttribute('data-theme') === 'dark') {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('darkMode', 'disabled');
                body.style.backgroundImage = "url('images/Cefetback.png')"; 
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
                body.style.backgroundImage = "url('images/Cefetback-dark.jpg')"; 
            }
        });
    }

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            if (headerContent) {
                headerContent.classList.remove('show');
                headerContent.classList.add('hide');
            }
        } else {
            if (headerContent) {
                headerContent.classList.remove('hide');
                headerContent.classList.add('show');
            }
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    });

    
    var menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        fetch('menu.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o menu. Status: ' + response.status);
                }
                return response.text();
            })
            .then(data => {
                menuContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Erro ao carregar o menu:', error);
            });
    } else {
        console.error('Elemento com ID "menu-container" não encontrado.');
    }
});

