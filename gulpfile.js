const gulp = require("gulp"),
//将.scss文件转换为.css文件
sass = require("gulp-sass"),
//搭建本地服务器
connect = require("gulp-connect"),
//合并文件
concat = require("gulp-concat"),
//压缩文件
uglify = require("gulp-uglify"),
//保留压缩前的文件
rename = require("gulp-rename"),
//压缩css文件
cleanCss = require("gulp-clean-css"),
//压缩图片
imagemin = require("gulp-imagemin"),
//将es6的js转换为es5的文件
babel = require("gulp-babel");
/*----------------------------分割线-------------------------------------------*/
//拷贝主页
gulp.task("copy-index",function(){

	return gulp.src("index.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload())

})
////拷贝分页
gulp.task("copy-html",function(){
	
	return gulp.src("html/*.html")
	.pipe(gulp.dest("dist/html"))
	.pipe(connect.reload())
	
})
//拷贝压缩后的图片
gulp.task("copy-img",function(){
	
	return gulp.src("img/*.{jpg,png,gif}")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/imgmin"))
    .pipe(connect.reload())
	
})
//合并js文件压缩，并保留压缩前后的的js文件
gulp.task("copy-js-ys",function(){
	return gulp.src(["js/*.js","js/!jquery-1.11.0.js"])
	.pipe(babel({"presets":["es2015"]}))
	.pipe(concat("index.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("index.min.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload())
})
////将scss转换为css,并压缩
gulp.task("copy-css-ys",function(){
	return gulp.src("sass/*.scss")
	.pipe(sass())
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
})

////侦测所有文件变化

gulp.task("watch",function(){
	gulp.watch("index.html",["copy-index"]),
	gulp.watch(["js/dandu.js","js/dandu1.js"],["copy-js-ys"]),
	gulp.watch("img/*.{jpg,png,gif}",["copy-img"]),
	gulp.watch("html/*.html",["copy-html"]),
	gulp.watch("sass/*.scss",["copy-css-ys"])
	
})
////实时更新
gulp.task("sever",function(){
	
	connect.server({
		root:"dist",
		livereload:true
		
	});
})
//监听
gulp.task("default",["sever","watch"])
