document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuBtn')
  const nav = document.getElementById('mobileNav')
  if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('hidden'))
})
