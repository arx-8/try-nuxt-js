<template>
  <span>
    <div class="undo" />
  </span>
</template>

<style scoped>
.undo {
  font-size: 50%;
  display: inline-block;
  position: relative;
  margin: 0.2em auto 0;
  width: 1.2em;
  height: 1.2em;
  border-top: 0.1em solid #39a9d6;
  border-left: 0.1em solid transparent;
  border-right: 0.1em solid #39a9d6;
  border-bottom: 0.1em solid #39a9d6;
  border-radius: 100%;
  transform: rotate(45deg);
}

.undo::before {
  content: '';
  position: absolute;
  top: 0.05em;
  left: -0.25em;
  width: 0;
  height: 0;
  border-top: 0.25em solid transparent;
  border-right: 0.5em solid #39a9d6;
  border-bottom: 0.25em solid transparent;
  transform: rotate(-45deg);
}
</style>
