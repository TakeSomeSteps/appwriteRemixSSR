
// seting up an estimation for password strength
// returns a number from 0 to 10
export const estimatePasswordStrength = (password: string): number => {
  // Define criteria weights
  const lengthWeight = 2;
  const uppercaseWeight = 1.5;
  const lowercaseWeight = 1.5;
  const digitWeight = 2;
  const specialCharWeight = 3;

  // Calculate scores for each criterion
  const lengthScore = Math.min(password.length / 8, 1) * 10 * lengthWeight;
  const uppercaseScore = (/[A-Z]/.test(password) ? 1 : 0) * 10 * uppercaseWeight;
  const lowercaseScore = (/[a-z]/.test(password) ? 1 : 0) * 10 * lowercaseWeight;
  const digitScore = (/\d/.test(password) ? 1 : 0) * 10 * digitWeight;
  const specialCharScore = (/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password) ? 1 : 0) * 10 * specialCharWeight;

  // Calculate total score
  const totalScore = lengthScore + uppercaseScore + lowercaseScore + digitScore + specialCharScore;

  console.log("strength", totalScore)
  // Map the total score to a range from 0 to 10
  const strength = Math.round(totalScore / 10);

  console.log("strength", strength)
  return strength;
}