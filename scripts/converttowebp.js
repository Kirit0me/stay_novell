const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const folder = "./public/art"   // change if needed

async function convert() {

  const files = fs.readdirSync(folder)

  for (const file of files) {

    if (!file.match(/\.(jpg|jpeg)$/i)) continue

    const input = path.join(folder, file)
    const output = path.join(folder, file.replace(/\.(jpg|jpeg)$/i, ".webp"))

    try {

      await sharp(input)
        .webp({ quality: 80 })
        .toFile(output)

      console.log(`Converted: ${file}`)

    } catch (err) {
      console.error(`Error converting ${file}`, err)
    }

  }

}

convert()