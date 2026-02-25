"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const TOTAL_IMAGES = 39
const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/art/${i + 1}.jpeg`)

function shuffle(arr: string[]) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function Column({
  duration,
  direction,
}: {
  duration: number
  direction: "up" | "down"
}) {
  const shuffled = shuffle(images)
  const repeated = [...shuffled, ...shuffled]

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{
          y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-4"
      >
        {repeated.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            width={300}
            height={300}
            className="w-full h-auto object-contain rounded-xl opacity-35"
          />
        ))}
      </motion.div>
    </div>
  )
}

export default function Art_Wall() {
  return (
    <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-black overflow-hidden">

      <Column duration={120} direction="up" />
      <Column duration={140} direction="down" />
      <Column duration={130} direction="up" />
      <Column duration={150} direction="down" />
      <Column duration={135} direction="up" />

    </div>
  )
}