"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const images = Array.from({ length: 39 }, (_, i) => `/art/${i + 1}.jpeg`)

function shuffle(arr: string[]) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function ArtWall() {
  const shuffled = shuffle(images)

  // duplicate MANY times so scroll never runs out
  const repeated = Array(6)
    .fill(shuffled)
    .flat()

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">

      <motion.div
        className="flex h-full items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >

        <div className="columns-7 gap-4 px-6 w-[6000px]">

          {repeated.map((src, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid opacity-35"
            >
              <Image
                src={src}
                alt=""
                width={500}
                height={500}
                className="rounded-lg w-full h-auto"
              />
            </div>
          ))}

        </div>

      </motion.div>

    </div>
  )
}