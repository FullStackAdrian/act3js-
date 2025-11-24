const form = document.getElementById("form-basic");

// form.addEventListener("submit", e => {
//   e.preventDefault();
//   const data = Object.fromEntries(new FormData(e.target).entries());
//   console.log(data);
// });

form.addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const values = [...fd.values()];
  console.log(values);
});

