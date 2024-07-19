export function useTextDivider() {
  const processText = (text) => {
    const lines = text.split("\n");
    return lines
      .reduce((acc, line, index) => {
        if (line.trim() === "" && lines[index - 1]?.trim() === "") {
          // If current line and previous line are empty, add an extra newline
          return acc + "\n\n";
        } else if (line.trim() === "") {
          // If only current line is empty, add a single newline
          return acc + "\n";
        } else {
          // Otherwise, add the line with a newline
          return acc + line + "\n";
        }
      }, "")
      .trim();
  };

  return {
    processText,
  };
}
