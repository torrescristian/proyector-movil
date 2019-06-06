# proyector-movil-students

# Download project
```
git clone --recursive --branch dev https://github.com/torrescristian/proyector-movil-core.git
```
```
git submodule foreach --recursive git checkout dev
```

## Project setup
```
npm install
```

### Start the electron app and serve the teacher compiled page on `{teacher-root}/dist` folder
```
npm start
```

### Start the electron app and redirect to the teacher pages on `http://localhost:8080`
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```