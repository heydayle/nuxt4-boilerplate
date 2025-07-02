<script setup lang="ts">

const isChecked = ref(false)
onMounted(() => {
  setTimeout(() => {
    isChecked.value = true
  }, 3600)
})
</script>

<template>
  <div class="flex items-center justify-center">
    <label class="button" for="btn-light">
      <input
        id="btn-light"
        v-model="isChecked"
        name="btn-light" 
        type="checkbox" 
      >
      <div class="socket"></div>
      <div class="light-bulb">
        <svg fill="none" viewBox="0 0 131 151" width="22">
          <path
            stroke-width="8"
            stroke="currentColor"
            d="M1.00043 50.4999C80.0004 57.4999 102 50.4999 102 50.4999C102 50.4999 125 45.9999 127 31.4999C129 16.9998 115 1.49988 107.5 3.49988C100 5.49988 83.5004 16.9999 83.5004 75.4999C83.5004 83.9786 83.8466 91.4701 84.4622 98.0884M1 100.5C43.5028 96.7338 69.5067 97.0201 84.4622 98.0884M84.4622 98.0884C97.3045 99.0058 102 100.5 102 100.5C102 100.5 125 105 127 119.5C129 134 115 149.5 107.5 147.5C101.087 145.79 88.0938 137.134 84.4622 98.0884Z"
          />
        </svg>
        <p class="text-light-bulb">Get Started</p>
      </div>
    </label>
  </div>
</template>


<style scoped>
.button {
  cursor: pointer;
  display: flex;
  gap: 1px;
  transition: all 0.3s ease;
}

.button:active {
  transform: scale(0.95);
}

.button input {
  display: none;
}

.button input:checked ~ .socket {
  transition: all 0.1s;
}

.button input:checked ~ .socket::before {
  opacity: 1;
  transition: all 0.1s;
}

.button .socket {
  position: relative;
  background-color: #3c3c3c;
  width: 70px;
  height: 60px;
  border-radius: 50px 5px 5px 50px;
  z-index: 999;
  box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
}

.button .socket:before {
  content: "";
  position: absolute;
  top: 4px;
  right: 0;
  width: 60px;
  height: 35px;
  border-radius: 50px 0 0 50px;
  background-color: rgba(255, 255, 255, 0.6);
  border: 4px solid #353535;
  border-right: 0;
  box-shadow: inset 4px 0 8px 4px rgba(0, 0, 0, 0.8);
  filter: blur(4px);
  opacity: 0.3;
  transition: all 0.3s ease;
}

.button .socket:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  mask-image: linear-gradient(
    0deg,
    transparent,
    white 25%,
    white 90%,
    transparent
  );
}

.button input:checked ~ .light-bulb {
  color: #ffffff;
  border-color: #ffffff;
  transition: all 0.1s;
  box-shadow: inset 0 -4px 4px -1px rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0 0 2px #ffbe4e);
}

.button input:checked ~ .light-bulb .text-light-bulb {
  text-shadow: 0 0 2px #ffbd44;
}

.button input:checked ~ .light-bulb .text-light-bulb::after,
.button input:checked ~ .light-bulb .text-light-bulb::before {
  opacity: 1;
  visibility: visible;
  transition: all 0.1s;
  animation-play-state: running;
}

.button .light-bulb {
  position: relative;
  display: flex;
  align-items: center;
  width: 160px;
  height: 60px;
  color: #353535;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px 50px 50px 5px;
  gap: 0.5rem;
  box-shadow: inset 0 -4px 4px -1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.button .light-bulb::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 1px;
  width: 130px;
  height: 30px;
  border-radius: 10px 50px 50px 0;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

.button .light-bulb::after {
  content: "";
  position: absolute;
  right: 10px;
  width: 155px;
  height: 40px;
  border-radius: 0 50px 50px 0;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
  filter: blur(2px);
  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    white 20%,
    white 80%,
    transparent
  );
  mask: linear-gradient(90deg, transparent, white 80%, white 100%);
}

.text-light-bulb {
  user-select: none;
  pointer-events: none;
}

.text-light-bulb::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  height: 80px;
  width: 160px;
  background-image: linear-gradient(
    to top,
    #ff9346,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    #ff9346
  );
  border-radius: 0 50% 50% 0;
  z-index: -10;
  filter: blur(25px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  animation: light 20s linear infinite;
}

.text-light-bulb::before {
  content: "";
  position: absolute;
  top: 1.5px;
  left: -8px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 8px solid #fb6902;
  border-radius: 0 100% 100% 0;
  z-index: -10;
  filter: blur(10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  animation: light 20s linear infinite;
}

@keyframes light {
  5% {
    transform: scale(1.1);
  }
  10% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
    opacity: 0.5;
  }
  95% {
    transform: scale(1.1);
  }
}
</style>