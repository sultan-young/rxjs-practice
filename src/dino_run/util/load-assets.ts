export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

export async function loadFont(url: string, fontName: string) {
  if (!fontName) fontName = getFontName(url)
  const styleEl = document.createElement('style')

  styleEl.innerHTML = `
    @font-face {
      font-family: ${fontName};
      src: url(${url});
    }
  `
  document.head.appendChild(styleEl)
  await document.fonts.load(`12px ${fontName}`)
}

function getFontName(url: string) {
  const ext = url.slice(url.lastIndexOf('.'))
  const pathParts = url.split('/')

  return pathParts[pathParts.length - 1].slice(0, -1 * ext.length)
}
