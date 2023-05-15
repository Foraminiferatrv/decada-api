import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.listen({ port: 3000 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
