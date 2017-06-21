export function name(rawName) {
  const [firstName, lastName] = rawName.split(' ');
  return lastName + ', ' + firstName;
}
