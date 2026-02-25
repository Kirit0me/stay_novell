"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LogoOverlay() {

  const router = useRouter()

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-20">

      <div
        className="pointer-events-auto cursor-pointer transition hover:scale-110 flex flex-col items-center"
        onClick={() => router.push("/about")}
      >
        <Image
          src="/stay_novel.png"
          alt="Artist Logo"
          width={180}
          height={180}
          className="backdrop-blur-md rounded-full shadow-2xl"
        />

        <p className="mt-3 text-sm text-white/70 tracking-wide">
          click here to know more...
        </p>

      </div>

    </div>
  )
}