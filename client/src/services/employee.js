export function name(rawName) {
  const [firstName, lastName] = rawName.split(' ');

  if (!lastName) {
    return firstName;
  }

  return lastName + ', ' + firstName;
}
