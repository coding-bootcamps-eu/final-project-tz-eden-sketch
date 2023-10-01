<template>
  <main>
    <h1 class="headline-main">Garten-Wissen</h1>
    <h2 class="headline-sub">Hier ist noch Baustelle...</h2>
    <img class="image" src="@/assets/images/books.jpg" alt="Bücher mit Pflanzen" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  height: 100vh; /* gibt es eine bessere Lösung? */
  background-color: white;
}
h1 {
  color: var(--clr-primary);
  margin: 0;
  margin-top: 2rem;
}
.image {
  position: absolute;
  max-width: 600px;
  bottom: 0;
  left: 0;
  transform-origin: bottom left;
}
</style>
