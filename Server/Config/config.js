var env = process.env.NODE_ENV || 'development';
if (env === "development") {
    process.env.PORT = 3000;
    //mongodb://Ravi:root@ds237967.mlab.com:37967/ravindranodepractice
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === process.env.NODE_ENV) {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
    process.env.PORT = 3000;

}