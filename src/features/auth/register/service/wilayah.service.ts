export async function getRW() {
  const res = await fetch("/api/wilayah/rw");
  return res.json();
}

export async function getRT(rw: string) {
  const res = await fetch(`/api/wilayah/rt?rw=${rw}`);
  return res.json();
}