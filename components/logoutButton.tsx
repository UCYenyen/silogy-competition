export default function LogoutButton() {
  const functionLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
  }

  return (
    <button onClick={functionLogout} className="border p-2 rounded-lg border-2">
      Logout
    </button>
  )
}