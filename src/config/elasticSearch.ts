import { Client, HttpConnection } from "@elastic/elasticsearch";

const elasticClient = new Client({
  node: "http://elasticsearch:9200",
  Connection: HttpConnection,
});

export default elasticClient;
