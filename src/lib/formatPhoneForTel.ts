export default function formatPhoneForTel(phone?: string) {
  if (!phone) return "";

  const match = phone.match(/\d{2,4}-\d{3,4}-\d{4}/);
  if (!match) return "";

  return match[0].replace(/-/g, "");
}
