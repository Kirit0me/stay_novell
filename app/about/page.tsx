"use client"

import Image from "next/image"
import { useState } from "react"

export default function AboutPage() {

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    const res = await fetch("/api/commission", {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    if (data.whatsappURL) {
      window.open(data.whatsappURL, "_blank")
    }

    alert("Request sent!")
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16 space-y-16">

      {/* ABOUT ME CARD */}

      <div className="max-w-xl w-full bg-neutral-900/60 backdrop-blur-md p-8 rounded-3xl border border-neutral-700 text-center space-y-6">

        <Image
          src="/stay_novel.png"
          alt="Shreeya"
          width={140}
          height={140}
          className="rounded-full mx-auto border-4 border-pink-300 shadow-lg"
        />

        <h1 className="text-3xl font-semibold text-pink-300">
          About Me
        </h1>

        <div className="text-gray-300 leading-relaxed space-y-3">

          <p>Welcome to my page! 💖</p>

          <p>
            My name's <span className="text-pink-300 font-medium">Shreeya</span>,
            a 21 year old artist.
          </p>

          <p>
            I started my art journey with traditional art back in 2019
            and recently began exploring digital art as well.
          </p>

          <p>
            Most of the premade merch here is fandom inspired because
            personally I feel there is a shortage in India :(
          </p>

        </div>

      </div>


      {/* ABOUT COMMISSIONS */}

      <div className="max-w-xl w-full bg-neutral-900/60 backdrop-blur-md p-8 rounded-3xl border border-neutral-700 space-y-4">

        <h2 className="text-2xl text-pink-300 font-semibold text-center">
          About Commissions
        </h2>

        <div className="text-gray-300 space-y-3">

          <p className="font-medium text-white">Digitally:</p>

          <ul className="list-disc list-inside text-gray-400">
            <li>Prints</li>
            <li>Stickers</li>
            <li>Portraits</li>
          </ul>

          <p className="font-medium text-white mt-4">Traditionally:</p>

          <ul className="list-disc list-inside text-gray-400">
            <li>Portrait sketches</li>
            <li>Custom artwork</li>
          </ul>

        </div>

      </div>


      {/* COMMISSION FORM */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-neutral-900/60 backdrop-blur-md p-8 rounded-3xl border border-neutral-700 space-y-5"
      >

        <h2 className="text-2xl font-semibold text-center text-pink-300">
          Request a Commission
        </h2>

        <input
          name="name"
          placeholder="Your name"
          required
          className="w-full p-3 bg-black/40 rounded-lg border border-neutral-700"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 bg-black/40 rounded-lg border border-neutral-700"
        />

        <input
          name="phone"
          placeholder="Phone / WhatsApp number"
          required
          className="w-full p-3 bg-black/40 rounded-lg border border-neutral-700"
        />

        <textarea
          name="message"
          rows={5}
          placeholder="Describe the artwork you want..."
          required
          className="w-full p-3 bg-black/40 rounded-lg border border-neutral-700"
        />

        <input
          name="files"
          type="file"
          multiple
          className="w-full text-gray-400"
        />

        <button
          disabled={loading}
          className="w-full bg-pink-300 text-black p-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Submit Request"}
        </button>

      </form>

    </main>
  )
}