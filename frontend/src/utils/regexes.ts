export const PasswordStrength = (p: string) => {
  switch (getPasswordStrength(p)) {
    case true:
      return true
    default:
      return false
  }
}

const getPasswordStrength = (p: string) => {
  if (new RegExp(strongPassworedRegex).test(p)) {
    return true
  }
}
const strongPassworedRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

const _mediumPasswordRegex =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/
