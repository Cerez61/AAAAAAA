export class Scene {
  constructor(gameData) {
    this.sceneData = gameData;
    this.roomsJSON = [];

    this.changeRoom = true;
  }
  async init() {
    await this.fetchRoomsJSON(["rooms.json"]);
    console.log(this.roomsJSON);
  }
  async fetchRoomsJSON(jsonNames) {
    const response = await Promise.all(jsonNames.map((jsonName) => fetch("./src/GameSystem/Scene/Rooms/" + jsonName)));

    const data = await Promise.all(response.map((res) => res.json()));

    this.roomsJSON.push(...data);
  }
  loadRoom() {
    const metaData = this.roomsJSON[0].tutorialRoom.meta;

    this.changeGlobalData(metaData.width, metaData.height);

    this.loadEntities();

    this.changeRoom = false;
  }
  loadEntities() {}
  changeGlobalData(width, height) {
    this.sceneData.width = width;
    this.sceneData.height = height;
  }
  update() {
    if (this.changeRoom) this.loadRoom();

    this.changeRoom = false;
  }
}
