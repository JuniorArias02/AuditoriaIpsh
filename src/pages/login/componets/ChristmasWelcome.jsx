import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ChristmasWelcome({ onComplete }) {
    const canvasRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let rockets = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Rocket {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height;
                this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
                this.velocity = {
                    x: Math.random() * 4 - 2,
                    y: Math.random() * -4 - 12
                };
                this.alpha = 1;
                this.trail = [];
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;

                // Draw trail
                ctx.beginPath();
                if (this.trail.length > 0) {
                    ctx.moveTo(this.trail[0].x, this.trail[0].y);
                    for (let i = 1; i < this.trail.length; i++) {
                        ctx.lineTo(this.trail[i].x, this.trail[i].y);
                    }
                    ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.trail.push({ x: this.x, y: this.y });
                if (this.trail.length > 10) this.trail.shift();

                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.velocity.y += 0.15; // Gravity
                this.alpha -= 0.005;
            }
        }

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                this.velocity = {
                    x: Math.cos(angle) * speed,
                    y: Math.sin(angle) * speed
                };
                this.alpha = 1;
                this.friction = 0.96;
                this.gravity = 0.08;
                this.decay = Math.random() * 0.015 + 0.005;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.velocity.x *= this.friction;
                this.velocity.y *= this.friction;
                this.velocity.y += this.gravity;

                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= this.decay;
            }
        }

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Randomly launch rockets
            if (Math.random() < 0.03) {
                rockets.push(new Rocket());
            }

            // Update and draw rockets
            rockets.forEach((rocket, index) => {
                rocket.update();
                rocket.draw();

                // Explode at peak
                if (rocket.velocity.y >= -1 || rocket.alpha <= 0) {
                    rockets.splice(index, 1);
                    // Create particles
                    const particleCount = 80;
                    for (let i = 0; i < particleCount; i++) {
                        particles.push(new Particle(rocket.x, rocket.y, rocket.color));
                    }
                }
            });

            // Update and draw particles
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                }
            });
        };

        animate();

        // Auto dismiss after 6 seconds
        const timer = setTimeout(() => {
            handleClose();
        }, 6000);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timer);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (onComplete) onComplete();
        }, 1000); // Wait for exit animation
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
                >
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                    />

                    <div className="relative z-10 text-center p-8 select-none">
                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 20,
                                delay: 0.3
                            }}
                            className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-yellow-200 to-green-500 mb-2 drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            ¡Feliz Navidad!
                        </motion.h1>

                        <motion.h2
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 1.0
                            }}
                            className="text-2xl md:text-4xl font-light tracking-widest text-white/90 mb-12 uppercase"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            y Próspero Año Nuevo
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.0, duration: 0.8 }}
                            className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-sm font-medium tracking-wide"
                        >
                            Iniciando sistema...
                        </motion.div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                    >
                        <X size={32} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
