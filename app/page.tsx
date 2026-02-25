import ArtWall from "@/components/ArtWall"
import ArtFullWall from "@/components/ArtFullWall"
import Art_Wall from "@/components/Art_Wall"
import LogoOverlay from "@/components/LogoOverlay"
import ArtCollage from "@/components/ArtCollage"

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* <ArtWall /> */}
      {/* <ArtFullWall /> */}
      {/* <Art_Wall /> */}
      <ArtCollage />
      <LogoOverlay />
    </main>
  )
}