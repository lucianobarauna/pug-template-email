<div align="left">
  <img src="https://cdn.rawgit.com/pugjs/pug-logo/eec436cee8fd9d1726d7839cbe99d1f694692c0c/SVG/pug-final-logo-_-colour-128.svg" height="200">
  <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
</div>


# pug-template-email
Template de email generate with pug

The idea is to have a json and consummate to facilitate the maintenance of the
code and development

## How to use
The image files are inside the `src/img` directory and your images must be
stay in that location.

The html lies with Pug includes for easy maintenance.

**Obs: This project is only a basis for explaining logic. You are free to change it any way you like to fit your scope**

## Json Properties.
**Esse json é o padrão da explicação e pode ser alterado de acordo com seu escopo.**

| Props | Types | Description |
| ------ | ------ | ------ |
| typeLayout | String | Configuration for layout type |
| columns.linkProd | String | Product Link |
| columns.linkProd.image.src | String | Image Link |
| columns.linkProd.image.alt | String | Alt text |
| spaceImg or space | Boolean | Configuration for layout type |



## Install
Using npm
```
npm i
```

Using yarn
```
yarn
```

## Start development
Using npm
```
npm start
```

Using yarn
```
yarn start
```

## Build
Using npm
```
npm run build
```

Using yarn
```
yarn build
```
