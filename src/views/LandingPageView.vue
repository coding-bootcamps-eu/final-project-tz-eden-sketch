<template>
  <div class="landingpage">
    <div class="content-wrapper">
      <q-btn
        label="Login"
        @click="login"
        class="btn-login bg-primary text-white"
        id="btn-login"
      ></q-btn>

      <h1 class="headline-main title">EdenSketch</h1>
      <h2 class="headline-sub subtitle">Dein Werkzeug um deinen Gemüsegarten zu planen</h2>

      <WatercanStroke class="watercan-stroke" />

      <article class="text-intro">
        <p>
          Mit EdenSketch kannst du deinen Gemüsegarten jetzt detailliert planen. Lege einen Beetplan
          an und plane deine Gemüsekulturen auf den verschiedenen Beeten über den Jahresverlauf. Die
          App unterstützt dich dabei die Fruchtfolge und Mischkultur bei deiner Planung mit zu
          bedenken.
        </p>
        <q-btn
          label="Los gehts!"
          @click="login"
          class="btn-login bg-primary text-white"
          id="btn-register"
        ></q-btn>
      </article>

      <div class="image-house">
        <img class="image" src="../assets/images/house-with-garden.svg" alt="house with garden" />
      </div>

      <BedAnimation class="bed-animation" />

      <article class="article bed">
        <div class="article-text-wrapper">
          <h3 class="headline-sub">Beeteinteilung</h3>
          <p>
            Teile deine Beetfläche in 6 gleich große Flächen. Idealerweise mit einer Breite von 1,2
            m und einer Länge von 2,5 m. Zwischen den Beeten gibt es Wege. Die Breite von 1,2m sind
            so ausgelegt dass du von beiden Seiten gut an das Gemüse heran kommst. Wenn du mehr
            Platz hast, kannst du auch Beete anlegen, die länger als 2,5m sind.
          </p>
        </div>

        <div class="info-grafic-beeteinteilung">
          <img
            class="image"
            src="@/assets/images/info-grafic-beeteinteilung.svg"
            alt="Beeteinteilung"
          />
        </div>
      </article>

      <article class="article fruchtfolge">
        <div class="article-text-wrapper">
          <h3 class="headline-sub">Fruchtfolge</h3>
          <p>
            Werden Gemüse derselben Pflanzenfamilie immer wieder auf derselben Stelle im Beet
            angebaut, kann dies dazu führen dass Schädlinge ein leichteres Spiel haben. Außerdem
            haben verschiedene Gemüse einen unterschiedlichen Nährstoffbedarf. Für die Beete gibt es
            daher eine Empfehlung welche Pflanzenfamilien in dem Beet stehen können. Im nächsten
            Jahr rotieren die Beete dann einen Platz weiter. Beet 2 wird zu Beet 1 und Beet 1 zu
            Beet 6 usw..
          </p>
        </div>

        <div class="info-grafic-fruchtfolge">
          <img class="image" src="@/assets/images/info-grafic-fruchtfolge.svg" alt="Fruchtfolge" />
        </div>
      </article>

      <article class="article mischkultur">
        <div class="article-text-wrapper">
          <h3 class="headline-sub">Mischkultur</h3>
          <p>
            Einige Pflanzen unterstützen sich gegenseitig darin Schädlinge fern zu halten oder
            passen gut zusammen aufgrund der Fläche die sie benötigen. Andere hingegen passen nicht
            gut zusammen weil sie sich gegenseitig zum Beispiel im Wachstum hemmen. Daher kannst du
            die Sätze im Beet verschieben, sodass du eventuell eine bessere Anordnung der
            Gemüsenachbarn findest.
          </p>
        </div>

        <div class="info-grafic-mischkultur">
          <img class="image" src="@/assets/images/info-grafic-mischkultur.svg" alt="Mischkultur" />
        </div>
      </article>
    </div>

    <footer class="footer">
      <router-link :to="{ name: 'impressum' }">Impressum</router-link>
    </footer>
  </div>

  <!-- <button @click="calc()">test</button> -->
</template>

<script setup>
import { useRouter } from 'vue-router'
import WatercanStroke from '@/components/WatercanStroke.vue'
import BedAnimation from '@/components/BedAnimation.vue'

const router = useRouter()

function login() {
  //check: is known user?
  if (localStorage.getItem('edenSketchUserId') === null) {
    router.push({ name: 'new-user' })
  } else {
    //user is known
    // const userID = localStorage.getItem('edenSketchUserId')
    router.push({ name: 'home' })
  }
}
</script>

<style scoped>
.landingpage {
  background-image: url('/backgroung_watercolor-green.svg');
  background-repeat: no-repeat;
  background-size: 6000px 4000px;

  position: relative;
}

.content-wrapper {
  padding-top: 2rem;
  padding-inline: 3rem;

  position: relative;
  /* max-width: 1000px; */
  margin-inline: auto;

  /* display: grid;
  grid-template-columns: 1fr; */
  /* align-items: center; */

  padding-inline: 2rem;
}

#btn-login {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
}

.title {
  font-size: 4.5rem;
  margin-bottom: 0;
  text-align: center;
}
.subtitle {
  font-size: 2rem;
  line-height: 2.125rem;
  text-align: center;
  padding-inline: 2rem;
}
.watercan-stroke {
  max-width: 10ch;
  margin-block: 1rem;
  margin-left: auto;
}
.text-intro {
  font-size: 1.25em;
  padding-inline: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
}

.text-intro > p {
  margin-bottom: 0;
  font-size: 0.75em;
}

#btn-register {
  max-width: 20ch;
  margin-inline: auto;
}
#btn-register:hover {
  scale: 1.25;
  animation: tilt-shaking 0.25s 2;
}

@keyframes tilt-shaking {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(2deg);
  }
  50% {
    transform: rotate(0eg);
  }
  75% {
    transform: rotate(-2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.image-house {
  min-width: 20ch;
  max-width: 40ch;
  margin-top: 1.5rem;
  margin-inline: auto;
}

.bed-animation {
  min-width: 20rem;
  max-width: 30rem;
  display: block;
  margin-inline: auto;
}

.article-text-wrapper > h3 {
  margin-bottom: 1rem;
}
.article + article {
  margin-top: 4rem;
}

.info-grafic-beeteinteilung,
.info-grafic-mischkultur,
.info-grafic-fruchtfolge {
  max-width: 20rem;
  margin-inline: auto;
}

.image {
  width: 100%;
}

.footer {
  background-color: var(--clr-primary);

  /* background: linear-gradient(to top, var(--clr-primary) 15%, transparent 90%); */
  background: radial-gradient(ellipse at 50% 110%, var(--clr-primary) 20%, transparent 70%);



  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: end;

  padding-bottom: 2rem;
  margin-top: 3rem;
}

footer > a:visited,
a:link {
  font-weight: 500;
  color: white;
}

footer > a:hover {
  color: var(--clr-secondary);
}

@media screen and (max-width: 380px) {
  /* iPhone SE */
}

@media screen and (min-width: 768px) {
  /* @media screen and (min-width: 992px) { */
  /* Tablet */

  .content-wrapper {
    max-width: 1000px;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
  .title {
    grid-column: span 3;
    text-align: start;
  }
  .subtitle {
    grid-column: span 4;
    grid-row: span 2;
    padding-inline: 0;
    text-align: start;
  }
  .watercan-stroke {
    translate: -80px 30px;

    max-width: 60ch;

    grid-row-start: 1;
    grid-column-start: 5;
    grid-row-end: 3;
    grid-column-end: 6;
  }
  .text-intro {
    grid-column: span 2;
    padding-block: 3em;
  }

  #btn-register:hover {
    scale: 1.5;
    animation: tilt-shaking 0.25s infinite;
  }
  .image-house {
    width: 100%;
    grid-column: span 3;
  }

  .bed-animation {
    max-width: 100%;
  }
  .article {
    grid-column: span 5;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 1rem;
  }

  .article-text-wrapper {
    grid-column: span 3;
  }
}

/* @media screen and (min-width: 993px) { */
/* Desktop */
/* } */
</style>
