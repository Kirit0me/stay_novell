"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const images = Array.from({ length: 39 }, (_, i) => `/art/${i + 1}.jpeg`)

function shuffle(array: string[]) {
  return [...array].sort(() => Math.random() - 0.5)
}

function Row({
  direction,
  rowImages,
}: {
  direction: number
  rowImages: string[]
}) {
  const duplicated = [...rowImages, ...rowImages]

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicated.map((src, i) => (
          <div
            key={i}
            className="relative w-[220px] md:w-[260px] lg:w-[300px] aspect-[4/3] opacity-40"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function ArtWall() {
  const shuffled = shuffle(images)

  const rows = [
    shuffled.slice(0, 8),
    shuffled.slice(8, 16),
    shuffled.slice(16, 24),
    shuffled.slice(24, 32),
    shuffled.slice(32, 39),
  ]

  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-6 bg-black overflow-hidden">

      <Row direction={1} rowImages={rows[0]} />
      <Row direction={-1} rowImages={rows[1]} />
      <Row direction={1} rowImages={rows[2]} />
      <Row direction={-1} rowImages={rows[3]} />
      <Row direction={1} rowImages={rows[4]} />

    </div>
  )
}