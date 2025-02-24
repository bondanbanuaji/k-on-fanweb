import React, { useEffect, useState } from 'react';

const CursorPointer = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        const manageCursor = () => {
            if (!isDesktop) return;
        
            const cursor = document.createElement('div');
            cursor.style.width = '7.5px';
            cursor.style.height = '7.5px';
            cursor.style.borderRadius = '50%';
            cursor.style.backgroundColor = '#4FE8DD';
            cursor.style.position = 'fixed';
            cursor.style.pointerEvents = 'none';
            cursor.style.zIndex = '1000';
            cursor.style.transition = 'width 0.3s ease, height 0.3s ease, transform 0.3s ease, background-color 0.5s ease';
        
            const cursorRing = document.createElement('div');
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.borderRadius = '50%';
            cursorRing.style.border = '1px solid #4FE8DD';
            cursorRing.style.position = 'fixed';
            cursorRing.style.pointerEvents = 'none';
            cursorRing.style.zIndex = '999';
            cursorRing.style.transition = 'transform 0.3s ease-out';
            cursorRing.style.transformOrigin = 'center';
        
            document.body.appendChild(cursorRing);
            document.body.appendChild(cursor);
        
            let cursorX = 0, cursorY = 0;
            let ringX = 0, ringY = 0;
            let targetX = 0, targetY = 0;
        
            const lerpFactorCursor = 0.3; 
            const lerpFactorRing = 0.1; 
            const moveCursor = (e) => {
                targetX = e.clientX;
                targetY = e.clientY;
            };
        
            const animateCursor = () => {
                cursorX += (targetX - cursorX) * lerpFactorCursor;
                cursorY += (targetY - cursorY) * lerpFactorCursor;
                cursor.style.left = `${cursorX - 4}px`;
                cursor.style.top = `${cursorY - 4}px`;

                ringX += (targetX - ringX) * lerpFactorRing;
                ringY += (targetY - ringY) * lerpFactorRing;
                cursorRing.style.left = `${ringX - 30}px`;
                cursorRing.style.top = `${ringY - 30}px`;
        
                requestAnimationFrame(animateCursor);
            };
        
            const enlargeCursor = () => {
                cursor.style.width = '10px';
                cursor.style.height = '10px';
                cursor.style.opacity = '0.75';
                cursor.style.backgroundColor = '#4FE8DD';
                cursorRing.style.transform = 'scale(0)';
            };
        
            const shrinkCursor = () => {
                cursor.style.width = '7.5px';
                cursor.style.height = '7.5px';
                cursor.style.backgroundColor = '#4FE8DD';
                cursorRing.style.transform = 'scale(1)';
            };
        
            window.addEventListener('mousemove', moveCursor);
            animateCursor();
        
            const elements = document.querySelectorAll('button, img, a, .arrow');
            elements.forEach(element => {
                element.addEventListener('mouseenter', enlargeCursor);
                element.addEventListener('mouseleave', shrinkCursor);
            });
        
            return () => {
                window.removeEventListener('mousemove', moveCursor);
                elements.forEach(element => {
                    element.removeEventListener('mouseenter', enlargeCursor);
                    element.removeEventListener('mouseleave', shrinkCursor);
                });
                document.body.removeChild(cursor);
                document.body.removeChild(cursorRing);
            };
        };

        manageCursor();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isDesktop]);

    return null;
};

export default CursorPointer;
