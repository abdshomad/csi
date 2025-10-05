import React, { FC, useEffect, useRef, useState } from 'react';

interface WelcomeScreenProps {
    onEnter: () => void;
}

const WelcomeScreen: FC<WelcomeScreenProps> = ({ onEnter }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showText, setShowText] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const textTimeout = setTimeout(() => setShowText(true), 1000);
        const buttonTimeout = setTimeout(() => setShowButton(true), 3000);

        return () => {
            clearTimeout(textTimeout);
            clearTimeout(buttonTimeout);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const characters = katakana + latin + nums;
        
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = window.requestAnimationFrame(draw);
        };
        
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-green-500 font-mono">
                <div 
                    className={`transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}
                >
                    <h1 className="text-3xl md:text-5xl tracking-widest mb-4">INITIALIZING SYSTEM...</h1>
                    <p className="text-lg md:text-2xl text-center">ACCESSING CRIMINAL DATABASE</p>
                </div>

                <div 
                    className={`mt-12 transition-opacity duration-1000 ${showButton ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button
                        onClick={onEnter}
                        className="text-2xl border-2 border-green-500 px-8 py-3 hover:bg-green-500 hover:text-black transition-colors animate-pulse"
                        aria-label="Enter System"
                    >
                        [ ENTER ]
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
