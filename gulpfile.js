// function task(done) {//es necesario poner un parametro aunque no se le pase, y al finalizar el codigo mandarlo a llamr, de esta forma gulp nos reconoce que termino la tarea
//     console.log("dede mi primera tarea de gulp");
//     done();
// }
//si no queremos usar el done, podemos indicar algun retur y seria lo mismo, ejemplo
// function task() {
//     return console.log("dede mi primera tarea de gulp");
// }

// exports.task = task;
const { src, dest, watch, series, parallel } = require("gulp");

//CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// Imagenes
// const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

function css(done) {
    // compilar sass
    //pasos: 1-Identificar archovos, 2-Compilarla, 3-Guardar el CSS
    src("src/scss/app.scss")
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest("build/css"));

    done();
}

function img() {
    return src("src/img**/*")
        // .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest("build/img"));
}

function webpVersion() {
    return src("src/img/**/*.{png, jpg}")
        .pipe(webp())
        .pipe(dest("build/img"))
}

function dev() {
    watch("src/scss/**/*.scss", css);
    watch("src/scss/**/*", img);
}

function defaultTask(done) {
    console.log("soy la tarea por default");
    done();
}



exports.css = css;
exports.dev = dev;
exports.img = img;
exports.webpVersion = webpVersion;
exports.default = series(img, webpVersion, css, dev);
// series--> se incia una tarea y no inicia la siguiente hasta que termine la anterior(siempre se deja el watch para el final)

//parallel--> inicia todas las tareas al mismo tiempo