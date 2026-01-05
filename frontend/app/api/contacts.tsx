export async function fetchContacts() {
  const res = await fetch("/api/contacts/");
  return res.json();
}
