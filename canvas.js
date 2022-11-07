const canvas = document.querySelector("canvas");
canvas.width = 0.8 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
const canva = canvas.getContext("2d");

export { canva, canvas };
