// Run nodejs as cluster

const cluster = require("cluster")

const startWorker = () => {
  const worker = cluster.fork();
  console.log(`CLUSTER: Worker $${worker.id} started`);

  if (cluster.isMaster) {
    require('os').cpus.forEach(startWorker);

    cluster.on('disconnect', worker => console.log(`CLUSTER: Worker $${worker.id} disconnect from cluster`));

    cluster.on('exit', (worker, code, signal) => {
      console.log(`CLUSTER: Worker ${worker.id} died with exit with code ${code} (${signal})`);
    });
    startWorker();
  } else {
    const port = process.env.PORT || 3000;
    require('./app.js')(port);
  }
}
