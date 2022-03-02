export const TileConnections = Vue.component("tile-connections", {
  data: function () {
    return {
      peer: undefined,
      tileId: undefined,
      availableConnections: ["nw", "ne", "e", "se", "sw", "w"],
      connections: {},
      connectionMessages: {}
    }
  },
  computed: {
    west: () => { return this.connections["w"] ? this.peer.connections[this.connections["w"]] : undefined },
    east: () => { return this.connections["w"] ? this.peer.connections[this.connections["e"]] : undefined },
    northwest: () => { return this.connections["w"] ? this.peer.connections[this.connections["nw"]] : undefined },
    northeast: () => { return this.connections["w"] ? this.peer.connections[this.connections["ne"]] : undefined },
    southwest: () => { return this.connections["w"] ? this.peer.connections[this.connections["sw"]] : undefined },
    southeast: () => { return this.connections["w"] ? this.peer.connections[this.connections["se"]] : undefined },
  },
  created() {
    this.peer = new Peer({ key: 'lwjd5qra8257b9' });

    this.peer.on('open', (id) => {

      //connected to p2p server, given an ID to share
      console.log('My peer ID is: ' + id);
      this.$emit("ontileid", id);
      this.tileId = id;


      //set up peer connection callback
      this.peer.on('connection', (dataConnection) => {

        console.log("someone is trying to connect to me!", dataConnection.label, dataConnection);

        //do I already have a direction that way?
        if (!this.connections[dataConnection.label]) {

          const dir = dataConnection.label;
          console.log("setting connection to ", dir);
          this.connections[dir] = dataConnection.peer;
          this.$emit("connection", dir);

          dataConnection.on('data', (data) => {
            this.handleMessage(data);
          });

          dataConnection.on('close', () => {
            console.log("disconnected", this.peer.connections)
          });

          this.peer.connect(dataConnection.peer, { label: this.oppositeDirection(dir) });

        } else {
          console.log("Already have a connection in that direction")
        }
      });
    });
  },
  mounted() {

  },
  methods: {
    directionConnection(dir) {
      return this.connections[dir] ? this.peer.connections[this.connections[dir]] : undefined
    },
    oppositeDirection(dir) {
      return {
        "w": "e",
        "e": "w",
        "se": "nw",
        "nw": "se",
        "ne": "sw",
        "sw": "ne"
      }[dir];
    },
    connect(id, dir) {


      if (!this.connections.hasOwnProperty(dir)) {
        dir = this.oppositeDirection(dir);

        const curConn = this.peer.connect(id, { label: dir });
        this.connections[this.oppositeDirection(dir)] = id;
        this.$emit("connection", this.oppositeDirection(dir));

        curConn.on('data', (data) => {
          this.handleMessage(data);
        });

        curConn.on('close', () => {
          console.log("disconnected...", this.peer.connections)
        });

      } else {
        console.log("no open spots on the grid");
      }

    },
    send(to, data) {
      const conn = this.directionConnection(to)[0];
      console.log(conn);
      if (conn) {
        console.log("sending message to", to, data);
        conn.send({ from: this.oppositeDirection(to), message: data });
      }
    },
    handleMessage(data) {

      if (!this.connectionMessages[data.from]) {
        this.connectionMessages[data.from] = [];
      }

      //store the message
      this.connectionMessages[data.from].push(data.message);

      //do something with the message
      console.log("handling data", data);
      this.$emit("onmessage", data);


      //don't accumulate too many messages
      if (this.connectionMessages[data.from].length > 10) {
        this.connectionMessages[data.from].unshift();
      }
    }
  }
});
