"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

const TOTAL_IMAGES = 54
const DESKTOP_COLS = 5
const MOBILE_COLS = 2

function shuffle(arr: string[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ArtCollage() {

  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [cols, setCols] = useState(DESKTOP_COLS)

  const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/art/${i + 1}.webp`)

  // detect mobile columns
  useEffect(() => {

    const update = () => {
      if (window.innerWidth < 768) setCols(MOBILE_COLS)
      else setCols(DESKTOP_COLS)
    }

    update()
    window.addEventListener("resize", update)

    return () => window.removeEventListener("resize", update)

  }, [])

  // animation
  useEffect(() => {
  const animationIds: number[] = [];

  containerRefs.current.forEach((col, i) => {
    if (!col) return;

    let offset = 0;
    const speed = 0.4 + Math.random() * 0.5; // Slightly faster for smoother perception
    const direction = i % 2 === 0 ? 1 : -1;
    
    // We only need to scroll the height of ONE set of images
    // Since you filled the stack 6 times, scrollHeight / 6 is one "loop"
    const loopHeight = col.scrollHeight / 6;

    const animate = () => {
      // 1. Update offset
      offset += speed * direction;

      // 2. The Magic: Wrap the offset so it never grows infinitely
      // This ensures that as soon as image A leaves, image A' enters 
      // at the exact same pixel position.
      const wrappedOffset = ((offset % loopHeight) + loopHeight) % loopHeight;
      
      // 3. Use translate3d for GPU acceleration
      // We subtract loopHeight for the upward columns to keep them in view
      const finalY = direction === 1 ? -wrappedOffset : -(loopHeight - wrappedOffset);
      
      col.style.transform = `translate3d(0, ${finalY}px, 0)`;

      animationIds[i] = requestAnimationFrame(animate);
    };

    animate();
  });

  return () => animationIds.forEach(cancelAnimationFrame);
}, [cols]); // Only restart if column count changes

  // distribute images across columns
  const shuffled = useMemo(() => shuffle(images), []);

  const columns = Array.from({ length: cols }, (_, colIndex) =>
    shuffled.filter((_, i) => i % cols === colIndex)
  )

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">

      <div className={`grid gap-4 p-4 h-full ${cols === 2 ? "grid-cols-2" : "grid-cols-5"}`}>

        {columns.map((col, i) => {

          // repeat stack so it's tall enough
          const stack = Array(6).fill(col).flat()

          return (
            <div key={i} className="overflow-hidden">

              <div
                ref={(el) => {
                  containerRefs.current[i] = el
                }}
                className="flex flex-col gap-4 will-change-transform"
                style={{ willChange: 'transform' }}
                >

                {stack.map((src, j) => (
                  <div
                    key={j}
                    className="relative rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={src}
                      alt="art"
                      width={400}
                      height={400}
                      className="
                        w-full
                        h-auto
                        opacity-60
                        object-contain
                        transition
                        duration-300
                        group-hover:opacity-100
                        group-hover:scale-105
                      "
                    />
                  </div>
                ))}

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}