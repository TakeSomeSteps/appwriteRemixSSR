// Here are input validators that can be used all over. for example in the TextInputComponent component:
export const validateEmail = (email: string) => {
  // new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  return /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm.test(email);
}

export const validateMinimumLength = (text: string, length: number) => {
  return text.length >= length;
}

export const validateCharsAndDigits = (text: string) => {
  return /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(text);
}

// for full name, we must have a space
export const validateAtLeastOneSpace = (text: string) => {
  return /\s/.test(text);
}

export const validateMinWordsCount = (text: string, count: number) => {
  return text.split(' ').length >= count;
}

export const validateStringsMatch = (text1: string, text2: string) => {
  return text1 === text2;
}


