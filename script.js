

function updatePlayerDisplay(position, playerId) {
    const playerNames = {
        1: { name: 'Luis', img: './images/luis.png' },
        2: { name: 'N/A', img: './images/placeholder.png' },
        3: { name: 'Otavio', img: './images/otavio.png' },
        4: { name: 'Samuel', img: './images/samuel.png' },
        5: { name: 'Raphael', img: './images/raphael.png' },
        6: { name: 'Leandro', img: './images/leandro.png' },
        7: { name: 'Gabriel Cezar', img: './images/gabriel_cezar.png' },
        8: { name: 'Hike', img: './images/hike.png' },
        9: { name: 'Thiers', img: './images/thiers.png' },
        10: { name: 'Mateus Tertuliano', img: './images/mateus_tertuliano.png' }
    };

    const positionMap = {
        goalkeeper: 'goalkeeper-position',
        player1: 'player1-position',
        player2: 'player2-position',
        player3: 'player3-position',
        player4: 'player4-position'
    };

    const player = playerId ? playerNames[playerId] : { name: 'Nenhum Selecionado', img: './images/placeholder.png' };
    document.getElementById(positionMap[position]).style.backgroundImage = `url(${player.img})`;
}
document.addEventListener('DOMContentLoaded', function() {
    const playerSelects = document.querySelectorAll('.player-select');
    const positions = {
        goalkeeper: document.getElementById('goalkeeper-position'),
        player1: document.getElementById('player1-position'),
        player2: document.getElementById('player2-position'),
        player3: document.getElementById('player3-position'),
        player4: document.getElementById('player4-position')
    };

    function updatePositions() {
        for (let key in positions) {
            const select = document.getElementById(key);
            const selectedOption = select.options[select.selectedIndex];
            const image = selectedOption.getAttribute('data-image');
            const playerImage = image ? image : './images/placeholder.png'; 
            positions[key].style.backgroundImage = `url(${playerImage})`;
        }
    }

    function restoreSelection() {
        const goalkeeper = localStorage.getItem('goalkeeper');
        const player1 = localStorage.getItem('player1');
        const player2 = localStorage.getItem('player2');
        const player3 = localStorage.getItem('player3');
        const player4 = localStorage.getItem('player4');

        document.getElementById('goalkeeper').value = goalkeeper || '';
        document.getElementById('player1').value = player1 || '';
        document.getElementById('player2').value = player2 || '';
        document.getElementById('player3').value = player3 || '';
        document.getElementById('player4').value = player4 || '';

        updatePositions();
    }

    playerSelects.forEach(select => {
        select.addEventListener('change', updatePositions);
    });

    restoreSelection();
});
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
document.getElementById('saves').addEventListener('click', function() {
    const goalkeeper = document.getElementById('goalkeeper').value;
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const player3 = document.getElementById('player3').value;
    const player4 = document.getElementById('player4').value;

    localStorage.setItem('goalkeeper', goalkeeper);
    localStorage.setItem('player1', player1);
    localStorage.setItem('player2', player2);
    localStorage.setItem('player3', player3);
    localStorage.setItem('player4', player4);

    updatePlayerDisplay('goalkeeper', goalkeeper);
    updatePlayerDisplay('player1', player1);
    updatePlayerDisplay('player2', player2);
    updatePlayerDisplay('player3', player3);
    updatePlayerDisplay('player4', player4);
});

