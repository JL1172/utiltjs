export const zenityCommand = (filePath: string, err: string) => {
  return `zenity --info --title="Error" --text="There Was An Error Opening Application ${filePath}: ${err}" --width=400 --height=700`;
};
