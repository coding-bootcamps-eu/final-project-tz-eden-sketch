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

      <WatercanStroke class="test" />

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

      <div class="scaling-svg-container image-house">
        <img
          class="scaling-svg"
          src="../assets/images/house-with-garden.svg"
          alt="house with garden"
        />
      </div>

      <BedAnimation />

      <article class="article bed">
        <div class="atricle-text-wrapper">
          <h3 class="headline-sub">Beeteinteilung</h3>
          <p>
            Teile deine Beetfläche in 6 gleich große Flächen. Idealerweise mit einer Breite von 1,2
            m und einer Länge von 2,5 m. Zwischen den Beeten gibt es Wege. Die Breite von 1,2m sind
            so ausgelegt dass du von beiden Seiten gut an das Gemüse heran kommst. Wenn du mehr
            Platz hast, kannst du auch Beete anlegen, die länger als 2,5m sind.
          </p>
        </div>

        <div class="scaling-svg-container info-grafic-beeteinteilung">
          <img
            class="scaling-svg"
            src="@/assets/images/info-grafic-beeteinteilung.svg"
            alt="Beeteinteilung"
          />
        </div>
      </article>

      <article class="article fruchtfolge">
        <div class="atricle-text-wrapper">
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

        <div class="scaling-svg-container info-grafic-fruchtfolge">
          <img
            class="scaling-svg"
            src="@/assets/images/info-grafic-fruchtfolge.svg"
            alt="Fruchtfolge"
          />
        </div>
      </article>

      <article class="article mischkultur">
        <div class="atricle-text-wrapper">
          <h3 class="headline-sub">Mischkultur</h3>
          <p>
            Einige Pflanzen unterstützen sich gegenseitig darin Schädlinge fern zu halten oder
            passen gut zusammen aufgrund der Fläche die sie benötigen. Andere hingegen passen nicht
            gut zusammen weil sie sich gegenseitig zum Beispiel im Wachstum hemmen. Daher kannst du
            die Sätze im Beet verschieben, sodass du eventuell eine bessere Anordnung der
            Gemüsenachbarn findest.
          </p>
        </div>

        <div class="scaling-svg-container info-grafic-mischkultur">
          <img
            class="scaling-svg"
            src="@/assets/images/info-grafic-mischkultur.svg"
            alt="Mischkultur"
          />
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

// function calc() {
//   for (let i = 28; i < 35; i++) {
//     let path = document.querySelector('.path' + i)
//     let length = path.getTotalLength()
//     // console.log('path', i, ': ', length)
//     // console.log(length)
//     console.log(
//       '.path',
//       i,
//       ' {stroke-dasharray: ',
//       length,
//       ';',
//       'stroke-dashoffset: ',
//       length,
//       ';}'
//     )
//   }
// }
</script>

<style scoped>
.landingpage {
  background-image: url('/backgroung_watercolor-green.svg');
  background-repeat: no-repeat;
  background-size: 6000px 4000px;

  position: relative;
}

.content-wrapper {
  position: relative;
  max-width: 1000px;
  margin-inline: auto;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  gap: 1rem;

  padding-inline: 1rem;
}

@media screen and (max-width: 600px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .article + .article {
    margin-top: 3rem;
  }

  #btn-register:hover {
    scale: 1;
    animation: paused;
  }
}

#btn-login {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
}

#btn-register {
  max-width: 20ch;
  margin-inline: auto;
}
#btn-register:hover {
  scale: 1.5;
  animation: tilt-shaking 0.25s infinite;
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

.title {
  grid-column: span 3;
  font-size: 4.5rem;
  margin-bottom: 0;
}
.subtitle {
  grid-column: span 4;
  grid-row: span 2;
  font-size: 2rem;
  line-height: 2.125rem;
}

.text-intro {
  grid-column: span 2;
  padding-block: 3em;
  font-size: 1.5em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}
.image-house {
  width: 100%;
  grid-column: span 3;
}

.image-animation-bed {
  width: 100%;
  grid-column: span 5;
  /* grid-row-start: 5;
  grid-column-start: 1; */
  /* grid-row-end: 3;
  grid-column-end: 6; */
}

.article {
  grid-column: span 5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 1rem;
}

@media screen and (max-width: 600px) {
  .article {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.atricle-text-wrapper {
  grid-column: span 3;
}

.scaling-svg-container {
  /* position: relative;
  height: 0;
  padding: 0;
  padding-bottom: 100%; */
}
.scaling-svg {
  /* position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0; */
}

.info-grafic-Beeteinteilung .info-grafic-Mischkultur .info-grafic-Fruchtfolge {
  width: 100%;
  border: solid red 1px;
}

.footer {
  background-color: var(--clr-primary);
  background: linear-gradient(to top, var(--clr-primary) 15%, transparent 100%);

  height: 7rem;

  display: flex;
  justify-content: center;
  align-items: end;

  padding-bottom: 2rem;
}

footer > a:visited,
a:link {
  color: white;
}

footer > a:hover {
  color: var(--clr-secondary);
}
</style>
