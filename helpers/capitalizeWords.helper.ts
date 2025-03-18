const capitalizeWords = (string: string) => {
  string = string.toLowerCase();
  const words = string.split(" ");
  for (let i = 0; i < words.length; i++) {
    const firstChar = words[i].charAt(0).toUpperCase();
    const restOfWord = words[i].slice(1);
    words[i] = firstChar + restOfWord;
  }
  return words.join(" ");
}

export { capitalizeWords }