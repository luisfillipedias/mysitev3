function redirecionar() {
    window.location.href = 'https://www.google.com/search?client=opera-gx&hs=Z15&sca_esv=6e9a037c22a2405d&sca_upv=1&sxsrf=ADLYWIK_ZsODPOZitAqKGhvJBG4vGBi7RQ:1722799376651&q=GET+AWAY&source=lnms&fbs=AEQNm0AuaLfhdrtx2b9ODfK0pnmi046uB92frSWoVskpBryHTrdWqiVbaH6EqK0Fq9hkAkpzZAUrzMRTkxw2Zo-uHyQFA5W1NggT0eZ4FzYQZg2iRB5hdiytPNwNnAtnIMD9rUQ_oqALN9e4FWLeilKvDJa5yIpg0T7nY8Srz3lfg2sW_iHqwC4DysdxUtZmHBGtbWkZMBP9Z45_Ofrb6w4i8nveLKhU5A&sa=X&ved=2ahUKEwiThfXmh9yHAxUELrkGHcsvCPoQ0pQJegQIExAB&biw=1485&bih=799&dpr=1'; 
}

document.addEventListener('DOMContentLoaded', function () {
    var botao = document.getElementById('fechar-botao');
    if (botao) {
        botao.addEventListener('click', redirecionar);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var welcomeMessage = document.getElementById('welcome-message');
    var mainContent = document.querySelector('main');
    var continueButton = document.getElementById('continue-button');
    var backgroundMusic = document.getElementById('background-music');

    continueButton.addEventListener('click', function () {
        welcomeMessage.style.display = 'none';

        mainContent.style.display = 'block';

        backgroundMusic.play().catch(function (error) {
            console.error('Erro ao tentar reproduzir a música:', error);
        });
    });
});

function playSound(event) {
    event.preventDefault();

    // Verificação e log do elemento alvo do evento
    const targetElement = event.currentTarget;
    console.log("Event target element:", targetElement);

    if (!targetElement) {
        console.error("Target element is null");
        return;
    }

    var audio = new Audio('./images/error2.mp3');

    audio.oncanplaythrough = function () {
        console.log("Audio can play through");
        audio.play();
    };

    audio.onended = function () {
        console.log("Audio ended, redirecting to:", targetElement.href);
        window.location.href = targetElement.href;
    };

    // Fallback para garantir o redirecionamento após um tempo limite
    setTimeout(function () {
        console.log("Fallback triggered, redirecting to:", targetElement.href);
        window.location.href = targetElement.href;
    }, 3000);
}




document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var darkModeToggle = document.getElementById('dark-mode-toggle');
    var headerContent = document.querySelector('.header-content');
    var lastScrollTop = 0;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.setAttribute('data-theme', 'dark');
        body.style.backgroundImage = "url('images/Cefetback-dark2.png')";
    } else {
        body.setAttribute('data-theme', 'light');
        body.style.backgroundImage = "url('images/Cefetback-dark2.png')";
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            if (body.getAttribute('data-theme') === 'dark') {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('darkMode', 'disabled');
                body.style.backgroundImage = "url('images/Cefetback-dark2.png')";
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
                body.style.backgroundImage = "url('images/Cefetback-dark2.png')";
            }
        });
    }

    window.addEventListener('scroll', function () {
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

