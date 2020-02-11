import React from 'react'

// Check if the string contains links
export const containsLinks = (msg: string) => msg.includes('https://')

// Parse links in a string into clickable links inside a tags
export const linkify = (msg: string) => {
  const arr = msg.split(' ')
  return arr.map((word, i) =>
    word.includes('https://') ? (
      <a key={i} href={word}>
        {word.substring(8, word.length)}
      </a>
    ) : i === 0 ? (
      word
    ) : (
      ` ${word} `
    )
  )
}
