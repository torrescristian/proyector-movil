# proyector-movil

## Download project
```
git clone --recursive --branch dev https://github.com/torrescristian/proyector-movil.git
```
```
git submodule update --init --recursive
```
```
git submodule foreach --recursive git checkout dev
```

## Project setup
```
npm install
```

### Start the electron app and serve the teacher and student compiled pages on `submodules/teacher/dist` and `submodules/students/dist` folders
```
npm start
```

### Start the electron app and redirect to the teacher pages on `http://localhost:8080`
```
npm run serve
```