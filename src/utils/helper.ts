import glob from 'glob';
import path from 'path';

// 应用运行时自动初始化controller
function initControllers() {
  const pathList = glob.sync(path.join(__dirname, "../modules/**/*.controller.ts"))
  pathList.forEach(path => {
    let relativeFilePath: string = path.split('src/').pop()!
    relativeFilePath = `../${relativeFilePath}`
    import(relativeFilePath)
  })
}


export {
  initControllers,
}