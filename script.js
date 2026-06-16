// Khepri Access Control System
class KhepriOverlay {
    constructor() {
        this.accessTrigger = document.querySelector('.access-trigger');
        this.overlay = document.getElementById('khepri-overlay');
        this.message = document.querySelector('.khepri-message');
        this.isActive = false;
        this.clickCount = 0;
        
        this.init();
    }

    init() {
        this.setupStyles();
        this.attachEventListeners();
        this.addKeyboardShortcut();
        this.logSystemStatus();
    }

    setupStyles() {
        // Estilo visual do trigger
        this.accessTrigger.style.cursor = 'pointer';
        this.accessTrigger.style.textDecoration = 'underline';
        this.accessTrigger.style.transition = 'all 0.3s ease';
    }

    attachEventListeners() {
        // Hover effects
        this.accessTrigger.addEventListener('mouseover', () => this.onTriggerHover());
        this.accessTrigger.addEventListener('mouseout', () => this.onTriggerOut());

        // Click para ativar overlay
        this.accessTrigger.addEventListener('click', (e) => this.activateOverlay(e));

        // Click no overlay para desativar
        this.overlay.addEventListener('click', () => this.deactivateOverlay());

        // ESC para fechar
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Double-click easter egg
        this.accessTrigger.addEventListener('dblclick', () => this.easterEgg());
    }

    onTriggerHover() {
        this.accessTrigger.style.color = '#ff3333';
        this.accessTrigger.style.textShadow = '0 0 10px rgba(255, 51, 51, 0.8)';
        this.accessTrigger.style.transform = 'scale(1.05)';
    }

    onTriggerOut() {
        this.accessTrigger.style.color = '#ff6600';
        this.accessTrigger.style.textShadow = 'none';
        this.accessTrigger.style.transform = 'scale(1)';
    }

    activateOverlay(e) {
        e.preventDefault();
        if (this.isActive) return;

        this.isActive = true;
        this.clickCount++;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Efeitos sonoros e visuais
        this.playActivationEffect();

        // Após a animação, pode adicionar mais interatividade
        setTimeout(() => this.addOverlayInteractivity(), 1500);
    }

    deactivateOverlay() {
        if (!this.isActive) return;

        this.isActive = false;
        this.overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    handleKeyPress(e) {
        // ESC para fechar
        if (e.key === 'Escape' && this.isActive) {
            this.deactivateOverlay();
        }

        // ENTER para ativar (Easter egg)
        if (e.key === 'Enter' && !this.isActive && document.activeElement === this.accessTrigger) {
            this.activateOverlay(e);
        }

        // CTRL+K para efeito especial
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            this.specialEffect();
        }
    }

    addOverlayInteractivity() {
        // Adiciona mensagens aleatórias após a ativação
        const messages = [
            'EU VEJO',
            'USURPADOR',
            'INTRUSÃO',
            'KHEPRI DESPERTO',
            'A RODA GIRA',
            'SUA HORA CHEGOU'
        ];

        // Criar elementos de texto flutuante
        if (Math.random() > 0.4) {
            this.createFloatingText(messages[Math.floor(Math.random() * messages.length)]);
        }

        // Criar mais de um texto se for clique múltiplo
        if (this.clickCount > 2) {
            setTimeout(() => {
                this.createFloatingText(messages[Math.floor(Math.random() * messages.length)]);
            }, 500);
        }
    }

    createFloatingText(text) {
        const floatingText = document.createElement('div');
        floatingText.style.position = 'fixed';
        floatingText.style.fontSize = Math.random() * 30 + 30 + 'px';
        floatingText.style.color = Math.random() > 0.5 ? '#ff6600' : '#ff3333';
        floatingText.style.fontWeight = 'bold';
        floatingText.style.opacity = '0.4';
        floatingText.style.pointerEvents = 'none';
        floatingText.style.zIndex = '10000';
        floatingText.style.textShadow = '0 0 20px rgba(255, 102, 0, 0.5)';
        floatingText.style.fontFamily = "'Courier New', monospace";
        floatingText.textContent = text;

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        floatingText.style.left = x + 'px';
        floatingText.style.top = y + 'px';

        document.body.appendChild(floatingText);

        // Animar flutuação com movimento
        let opacity = 0.4;
        let posY = y;
        const speed = Math.random() * 2 + 1;

        const animate = setInterval(() => {
            opacity -= 0.02;
            posY -= speed;
            floatingText.style.opacity = opacity;
            floatingText.style.top = posY + 'px';

            if (opacity <= 0) {
                clearInterval(animate);
                floatingText.remove();
            }
        }, 50);
    }

    playActivationEffect() {
        // Criar efeito visual de ativação (ondas concêntricas)
        const waveCount = 3;
        for (let i = 0; i < waveCount; i++) {
            setTimeout(() => {
                this.createWave();
            }, i * 150);
        }
    }

    createWave() {
        const wave = document.createElement('div');
        wave.style.position = 'fixed';
        wave.style.borderRadius = '50%';
        wave.style.border = '2px solid #ff3333';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '10000';
        wave.style.boxShadow = '0 0 20px rgba(255, 51, 51, 0.6)';

        const startSize = 50;
        let currentSize = startSize;

        wave.style.width = startSize + 'px';
        wave.style.height = startSize + 'px';
        wave.style.left = (window.innerWidth / 2 - startSize / 2) + 'px';
        wave.style.top = (window.innerHeight / 2 - startSize / 2) + 'px';
        wave.style.opacity = '1';

        document.body.appendChild(wave);

        const expandWave = setInterval(() => {
            currentSize += 25;
            const newLeft = window.innerWidth / 2 - currentSize / 2;
            const newTop = window.innerHeight / 2 - currentSize / 2;

            wave.style.width = currentSize + 'px';
            wave.style.height = currentSize + 'px';
            wave.style.left = newLeft + 'px';
            wave.style.top = newTop + 'px';

            const opacity = 1 - (currentSize - startSize) / 500;
            wave.style.opacity = Math.max(0, opacity);

            if (currentSize > window.innerWidth * 2) {
                clearInterval(expandWave);
                wave.remove();
            }
        }, 30);
    }

    easterEgg() {
        // Easter egg ao fazer double-click
        this.createFloatingText('🔥 KHEPRI ACORDADO 🔥');
        this.createFloatingText('⚠ AVISO ⚠');
        this.specialEffect();
    }

    specialEffect() {
        // Efeito especial (piscada de fundo)
        const originalBg = document.body.style.background;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                document.body.style.filter = i % 2 === 0 ? 'brightness(1.5)' : 'brightness(1)';
            }, i * 100);
        }

        setTimeout(() => {
            document.body.style.filter = 'brightness(1)';
        }, 500);
    }

    logSystemStatus() {
        // Log no console
        console.log('%cSISTEMA KHEPRI ATIVADO', 'color: #ff3333; font-size: 16px; font-weight: bold;');
        console.log('%cA RODA GIRA...', 'color: #ff6600; font-size: 14px;');
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new KhepriOverlay();
});

