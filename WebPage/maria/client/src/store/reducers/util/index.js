
export const createContent = (text, separator) => {
  return text.split(separator)
    .map(elem => ({
        text: elem
      })
    )
};