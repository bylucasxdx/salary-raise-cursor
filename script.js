document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    
    // Função para mover o botão "Não" para uma posição aleatória
    function moveNoButton() {
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noButton.style.position = 'fixed';
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
        noButton.style.transition = 'all 0.3s ease';
    }
    
    // Event listener para mover o botão quando o mouse passar por cima
    noButton.addEventListener('mouseenter', moveNoButton);
    
    // Adicionar alguns efeitos extras ao botão "Não"
    noButton.addEventListener('click', function(e) {
        e.preventDefault();
        moveNoButton();
        
        // Adicionar efeito de shake
        noButton.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            noButton.style.animation = '';
        }, 500);
    });
    
    // Adicionar CSS para animação de shake
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Efeito de partículas quando clicar no botão "Sim"
    yesButton.addEventListener('click', function() {
        createParticles();
        // Aguarda um pouco para mostrar as partículas antes de redirecionar
        setTimeout(() => {
            window.location.href = 'agradecimento.html';
        }, 800);
    });
    
    function createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const rect = yesButton.getBoundingClientRect();
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 100 + Math.random() * 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let opacity = 1;
            const animate = () => {
                const currentLeft = parseFloat(particle.style.left);
                const currentTop = parseFloat(particle.style.top);
                
                particle.style.left = currentLeft + vx * 0.02 + 'px';
                particle.style.top = currentTop + vy * 0.02 + 'px';
                particle.style.opacity = opacity;
                
                opacity -= 0.02;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
}); 