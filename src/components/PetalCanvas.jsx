import React, { useEffect, useRef } from 'react';

/**
 * PetalCanvas — Interactive HTML5 Canvas particle system of floating Cempasúchil (marigold) petals.
 * Petals drift gently with wind physics, flutter in 3D perspective, and react dynamically to mouse movement.
 */
export default function PetalCanvas({ enabled = true, count = 35 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse wind interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseSpeedX = 0;
    let lastMouseX = mouseX;

    const handleMouseMove = (e) => {
      mouseSpeedX = (e.clientX - lastMouseX) * 0.05;
      lastMouseX = e.clientX;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Click to spawn petal burst
    const handleClick = (e) => {
      for (let i = 0; i < 8; i++) {
        petals.push(createPetal(e.clientX, e.clientY, true));
      }
    };
    window.addEventListener('click', handleClick);

    // Palette of vibrant Aztec marigold hues
    const petalColors = [
      '#ff8c00', // Deep radiant orange
      '#ffa500', // Saffron gold
      '#ffb703', // Marigold amber
      '#e85d04', // Fiery sunset orange
      '#ffd166', // Bright sunlight yellow
      '#dc2f02'  // Deep crimson petal tip
    ];

    function createPetal(x, y, isBurst = false) {
      const angle = isBurst ? Math.random() * Math.PI * 2 : 0;
      const speed = isBurst ? Math.random() * 4 + 2 : Math.random() * 0.8 + 0.6;

      return {
        x: x !== undefined ? x : Math.random() * width,
        y: y !== undefined ? y : Math.random() * -height * 0.5,
        size: Math.random() * 9 + 8,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        vx: isBurst ? Math.cos(angle) * speed : Math.random() * 0.8 - 0.4,
        vy: isBurst ? Math.sin(angle) * speed : Math.random() * 1.2 + 0.7,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2.5,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.015,
        opacity: Math.random() * 0.35 + 0.65,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 1.5 + 0.5
      };
    }

    const petals = Array.from({ length: count }, () => createPetal());

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      mouseSpeedX *= 0.95; // Decay mouse wind

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Wave motion + mouse breeze
        p.x += p.vx + Math.sin(frame * p.oscillationSpeed) * p.oscillationDistance + mouseSpeedX;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Draw petal with 3D flutter transform
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.sin(p.flip), 1); // 3D tumbling perspective
        ctx.globalAlpha = p.opacity;

        // Organic curved marigold petal geometry
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(
          p.size * 0.8, -p.size * 0.5,
          p.size * 0.7, p.size * 0.6,
          0, p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.7, p.size * 0.6,
          -p.size * 0.8, -p.size * 0.5,
          0, -p.size
        );
        ctx.fillStyle = p.color;
        ctx.fill();

        // Subtle glowing vein highlight
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.lineTo(0, p.size * 0.8);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();

        // Recycle petal if offscreen
        if (p.y > height + 20 || p.x < -40 || p.x > width + 40) {
          petals[i] = createPetal(Math.random() * width, -20);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [enabled, count]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5
      }}
      aria-hidden="true"
    />
  );
}
