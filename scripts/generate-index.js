import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.resolve('posts')
const OUTPUT_DIR = path.resolve('public')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'index.json')

function walk(dir) {
  let results = []

  const list = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of list) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      results = results.concat(walk(fullPath))
    } else if (item.isFile() && item.name.endsWith('.md')) {
      results.push(fullPath)
    }
  }

  return results
}

function generateIndex() {
  const files = walk(POSTS_DIR)

  if (files.length === 0) {
    console.warn('⚠️ No markdown posts found')
  }

  const index = files.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)

    const relativePath = path.relative(POSTS_DIR, filePath)
    const slug = relativePath.replace(/\.md$/, '')
    const category = path.dirname(relativePath).split(path.sep)[0]

    if (!data.title || !data.short_description) {
      throw new Error(`❌ Missing front-matter in ${relativePath}`)
    }

    return {
      slug,
      title: data.title,
      thumbnail: data.thumbnail || null,
      short_description: data.short_description,
      category: data.category || category,
      date: data.date || null,
      url: `posts/${relativePath.replace(/\\/g, '/')}`
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(index, null, 2),
    'utf-8'
  )

  console.log(`✅ index.json generated (${index.length} posts)`)
}

generateIndex()
