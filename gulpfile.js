const gulp = require("gulp");
const { series, parallel } = require("gulp");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const browserify = require("browserify");
const terser = require("gulp-terser");
const pug = require("gulp-pug-3");
const pugify = require("pugify");
// const jsdoc = require("gulp-jsdoc3");
const jsdoc2md = require("jsdoc-to-markdown");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const fs = require("fs");
const path = require("path");

/**
 * The sets of source code that we want to treat individually. These 
 * will be watched for changes and built/served automatically when
 * using ```gulp serve```, or built into individual distributable
 * files when using ```gulp build```.
 */
var src = 
// The source code for the core ZAmp library.
{
    name: "z-amp",
    sourceFolder: "./src/",
    entryPoint: "./src/exports.js",
    destinationFilename: "z-amp-core.bundle",
    harnessFilepath: "./testHarness/index.html"
};

/**
 * The configuration settings that affect how code is built for
 * distribution/deployment.
 */
var distPaths = {
    destinationBrowserJsFolder: "./build/",
    destinationNodeJsFolder: "./build/dist/"
};

/**
 * Run the local browser to serve files for development.
 */
function runBrowser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

/**
 * Build the source code into ES5.
 * @param {Object} cb The function to call when processing has completed.
 */
function buildDistEs5(cb) {
    console.log(`Building distributable NodeJS component from '${src.sourceFolder}...'`)

    gulp.src(`${src.sourceFolder}**/*.js`)
        .pipe(babel())
        .pipe(gulp.dest(distPaths.destinationNodeJsFolder));

    cb();
}

/**
 * Build all source code sets into distributable files.
 */
function buildDistBrowserJs(cb) {

    console.log(`Building distributable browser component from '${src.sourceFolder}...'`);

    // Using browserify to compile code.
    const bundle = browserify({
        entries: [src.entryPoint],
        debug: false
    });

    // We're using pug as our templating engine, so we use
    // pugify here to ensure that pug files are correctly
    // transformed.
    var stream = bundle.transform(pugify.pug({
        compileDebug: false
    }))

    // We're allowing for CSS in our themes, so we need to
    // transform it into deployable code.
    .transform(require("browserify-css"), {
        // Minify (compress) CSS.
        minify: true,
        // If this were set to true, the code would inject
        // a style tag for each CSS file found.
        autoInject: false,
        // We want to include encoded images in our output,
        // so that we don't have to deal with external
        // URLs.
        inlineImages: true
    })
    .bundle();

    // When the stream has finished, we want to resolve the promise so that the
    // task completes successfully.
    stream.on("end", () => {
        console.log(`Finished building distributable component from '${src.sourceFolder}'.`);
        cb();
    });

    stream
    .pipe(source(`${src.destinationFilename}.min.js`))
    .pipe(buffer())
    // We want to compress the output, so we use the
    // terser plugin.
    .pipe(terser({
        // Compress the output (remove spaces etc).
        compress: true,
        // Obfuscate variable names where possible.
        mangle: true
    }))
    .pipe(gulp.dest(distPaths.destinationBrowserJsFolder));
};

/**
 * Build a specific source bundle into its local/development
 * spec.
 * @param {Function} cb the callback that signals that the task has completed.
 */
async function buildDevBrowserJs(cb) {
    console.log(`Building dev component from source '${src.sourceFolder}'...`);

    // We're using browserify to compile our output.
    const bundle = browserify({
        entries: [src.entryPoint],
        debug: true
    });

    // We need to use pugify to ensure that our template files
    // are compiled correctly.
    var stream = bundle.transform(pugify.pug({
        compileDebug: true
    }))
    // This plugin compiles CSS into the JS code.
    .transform(require("browserify-css"), {
        // Don't compress the output.
        minify: false,
        // Don't automatically inject style tags.
        autoInject: false,
        // Do encode images in the output.
        inlineImages: true
    })
    .bundle();

    // When the stream has finished, we want to resolve the promise so that the
    // task completes successfully.
    stream.on("end", () => {
        console.log(`Finished building dev component from '${src.sourceFolder}'.`);
        // cb();
    });

    stream
    .pipe(source(`${src.destinationFilename}.js`))
    .pipe(gulp.dest(distPaths.destinationBrowserJsFolder))
    // Stream the output to browsersync so that it can
    // refresh properly.
    .pipe(browserSync.stream());
};

function buildDoc(cb) {
    console.log("Building documentation...");
    // gulp.src(["./src/**/*.js"], {read:false})
    //     .pipe(jsdoc(cb));

    // jsdoc2md.render({ files: "./src/**/*.js" }).then((output) => fs.writeFileSync("docs/gen/api.md", output));
    const templateData = jsdoc2md.getTemplateDataSync({ files: "./src/**/*.js" });

    const classNames = templateData.reduce((classNames, identifier) => {
        if (identifier.kind === "class") {
            classNames.push(identifier.name);
        }
        return classNames;
    }, []);

    for(const className of classNames){
        const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
        console.log(`Rendering ${className}, template: ${template}`);
        const output = jsdoc2md.renderSync({data: templateData, template: template});
        fs.writeFileSync(path.resolve("docs/gen", `${className}.md`), output);
    }

    return cb();
}

function renderIndexPage(cb) {
    console.log("Rendering new index page...");
    gulp.src("index.pug")
    .pipe(pug({ locals: { src } }))
    .pipe(gulp.dest("."));
    console.log("Index page rendered.");

    return cb();
}

/**
 * Watch the code for changes so that we can react by rebuilding
 * the code and refreshing the developer's browser.
 */
function watchCode() {

    return gulp.watch([`${src.sourceFolder}**`, `!${src.sourceFolder}/*/bin/**`], parallel(buildDoc, () => {
        // The function already streams results to browsersync, so
        // we just need to call the function with the right code.
        return buildDevBrowserJs(src);
    }));
};

/**
 * Watch the local index for changes.
 */
async function watchHarness() {
    return gulp.watch("./index.pug", series(renderIndexPage, () => {
        // Nothing to do except reload the browser.
        return new Promise((resolve) => {
            browserSync.reload();
            resolve();
        });
    }));
}

/**
 * Serve the code in local (development) mode.
 */
exports.serve = series(parallel(buildDevBrowserJs, buildDoc, renderIndexPage), parallel(runBrowser, watchCode, watchHarness));

/**
 * Build the code for deployment.
 */
exports.build = parallel(buildDistBrowserJs, buildDistEs5, buildDoc);